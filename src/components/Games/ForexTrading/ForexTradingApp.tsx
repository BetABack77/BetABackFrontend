import { useState, useEffect, useCallback, useRef } from "react";
import { FaCoins, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { RiLiveFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { WebSocket_URL } from "../../../Services/axiosInstance";
import { io, Socket } from "socket.io-client";
import Navbar from "../../Navbar";
import { userService } from "../../../Services/userService";
import { TfiReload } from "react-icons/tfi";
// import { FaChevronUp, FaChevronDown, FaCoins } from 'react-icons/fa';

import { Howl } from "howler";
import countdownSound from "../../../assets/music/count.mp3";

// Define types for your socket events
type SocketEvents = {
  gameState: (data: {
    currentRound: {
      roundId: string;
      startedAt: string;
      timeLeft: number;
    };
    history: RoundHistory[];
  }) => void;
  newRound: (data: {
    roundId: string;
    startedAt: string;
    history: RoundHistory[];
  }) => void;
  roundOutcome: (data: {
    result: "win" | "lose";
    amount: number;
    message: string;
    choice: string;
  }) => void;
  betPlaced: (data: { amount: number; choice: "up" | "down" }) => void;
  balanceUpdate: (data: { balance: number }) => void;
  error: (message: string) => void;
  userBets: (data: UserBet[]) => void;
};

type RoundHistory = {
  roundId: string;
  result: "up" | "down";
  totals: { up: number; down: number };
  endedAt: string;
};

type UserBet = {
  roundId: string;
  choice: "up" | "down";
  amount: number;
  result: "win" | "lose" | "pending";
  payout: number;
  createdAt: string;
};

const ForexTradingApp = () => {
  const [sound] = useState(
    () =>
      new Howl({
        src: [countdownSound],
        volume: 0.5,
      })
  );

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState(user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [betAmount, setBetAmount] = useState(10);
  const [roundId, setRoundId] = useState("");
  const [history, setHistory] = useState<RoundHistory[]>([]);
  const [hasBet, setHasBet] = useState(false);
  const [status, setStatus] = useState("Connecting...");
  // const [userBets, setUserBets] = useState<UserBet[]>([]);
  const [activeTab, setActiveTab] = useState("game"); // 'game' or 'history'

  const [userHistory, setUserHistory] = useState<
    Array<{
      _id: string;
      choice: string;
      amount: number;
      result: string;
      payout: number;
      createdAt: string;
    }>
  >([]);
  const placedBetRef = useRef<any>(null);

  const [placedBet, setPlacedBet] = useState<{
    roundId: string;
    choice: "up" | "down";
    amount: number;
  } | null>(null);
  //  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimeRef = useRef<number>(0);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = useCallback((startedAt: string) => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Calculate end time (server time + 30 seconds)
    const serverStartTime = new Date(startedAt).getTime();
    endTimeRef.current = serverStartTime + 30000;
    const now = Date.now();

    // Calculate initial time left (rounded to nearest second)
    const initialLeft = Math.max(
      0,
      Math.round((endTimeRef.current - now) / 1000)
    );
    setTimeLeft(initialLeft);

    // Only start timer if there's time left
    if (initialLeft <= 0) {
      setTimeLeft(0);
      return;
    }

    // Start precise timer
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const left = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

      setTimeLeft(left);

      // Clear interval when time is up
      if (left <= 0 && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 100);
  }, []);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(WebSocket_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchUserHistory = async () => {
    try {
      const token = userData.token;
      if (!token) {
        toast.error("Token not found");
      }
      // const response = await userService.getUserBetHistoryHeadTail(token);
      const response = await userService.getUserBetHistoryByGameTyp(
        token,
        "ForexTree"
      );
      setUserHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch user history:", error);
      toast.error("Failed to load history");
    }
  };

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      sound.stop();
      sound.play();
    }

    if (timeLeft === 0) {
      sound.stop();
    }

    return () => {
      sound.stop();
    };
  }, [timeLeft, sound]);

  useEffect(() => {
    if (userData?._id) {
      fetchUserHistory();
    }
  }, [userData?._id]);

  // Set up socket events
  useEffect(() => {
    if (!socket || !user?._id) return;

    const onGameState: SocketEvents["gameState"] = (data) => {
      setRoundId(data.currentRound.roundId);
      startTimer(data.currentRound.startedAt);
      setHistory(data.history || []);
      setConnected(true);
      setStatus("Place your bet!");
    };

    const onNewRound: SocketEvents["newRound"] = (data) => {
      console.log("new round started ", data);
      setRoundId(data.roundId);
      startTimer(data.startedAt);
      setHasBet(false);
      setStatus("New round started! Place your bet!");
      setHistory(data.history || []);
    };

    // const startTimer = (startedAt: string) => {
    //   const end = new Date(startedAt).getTime() + 30000;
    //   const interval = setInterval(() => {
    //     const now = Date.now();
    //     const left = Math.max(0, Math.floor((end - now) / 1000));
    //     setTimeLeft(left);
    //     if (left === 0) clearInterval(interval);
    //   }, 1000);
    // };

    const onRoundOutcome: SocketEvents["roundOutcome"] = ({
      result,
      amount,
      message,
      choice,
    }) => {
      setStatus(message);
      toast[result === "win" ? "success" : "error"](message);

      if (result === "win") {
        setUserData((prev: { balance: number }) => ({
          ...prev,
          balance: prev.balance + amount,
        }));
        dispatch(
          setUser({
            ...userData,
            balance: userData.balance + amount,
          })
        );

        console.log("user amount is ", amount);

        setUserHistory((prev) => [
          {
            _id: `${Date.now()}`, // or use a better unique id if available
            choice,
            amount,
            result,
            payout: result === "win" ? amount : 0,
            createdAt: new Date().toISOString(),
          },

          ...prev,
        ]);
      } else {
        setUserHistory((prev) => [
          {
            _id: `${Date.now()}`,
            choice,
            amount,
            result,
            payout: 0,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }

      console.log("round outcome", result, amount, message, choice);

      if (!placedBetRef.current) {
        console.log("No bet placed for this round");
        return;
      }

      // const currentBet = placedBetRef.current;

      // if (result === "win") {
      //   const newBet = {
      //     roundId: roundId,
      //     choice: choice as "up" | "down", // explicit cast
      //     amount: currentBet.amount, // example: 100
      //     result: "win" as "win",
      //     payout: amount, // example: amount * 2 or custom logic
      //     createdAt: new Date().toISOString(),
      //   };
      //   console.log("new bet in win ", newBet);

      //   setUserBets((prev) => [...prev, newBet]);
      // } else {
      //   const newBet = {
      //     roundId: roundId,
      //     choice: choice as "up" | "down", // explicit cast
      //     amount: currentBet.amount, // example: 100
      //     result: "lose" as "lose",
      //     payout: 0,
      //     createdAt: new Date().toISOString(),
      //   };
      //   console.log("new bet in loose ", newBet);

      //   setUserBets((prev) => [...prev, newBet]);
      // }

      // setBetAmount(0);

      setPlacedBet(null);
    };

    const onBetPlaced: SocketEvents["betPlaced"] = ({ amount, choice }) => {
      setHasBet(true);
      setStatus(`Bet placed: ₹${amount} on ${choice}`);
    };

    const onBalanceUpdate: SocketEvents["balanceUpdate"] = ({ balance }) => {
      setUserData((prev: any) => ({ ...prev, balance }));
      dispatch(setUser({ ...userData, balance }));
    };

    const onError: SocketEvents["error"] = (message) => {
      console.log("error msg is ", message);
    };

    // const onUserBets: SocketEvents["userBets"] = (bets) => {
    //   setUserBets(bets);
    // };

    socket.on("gameState", onGameState);
    socket.on("newRound", onNewRound);
    socket.on("roundOutcome", onRoundOutcome);
    socket.on("betPlaced", onBetPlaced);
    socket.on("balanceUpdate", onBalanceUpdate);
    socket.on("error", onError);
    // socket.on("userBets", onUserBets);

    // Register user and fetch initial data
    socket.emit("registerUser", user._id);
    // socket.emit("getUserBets", user._id);

    return () => {
      if (socket) {
        socket.off("gameState", onGameState);
        socket.off("newRound", onNewRound);
        socket.off("roundOutcome", onRoundOutcome);
        socket.off("betPlaced", onBetPlaced);
        socket.off("balanceUpdate", onBalanceUpdate);
        socket.off("error", onError);
        // socket.off("userBets", onUserBets);
      }
    };
  }, [socket, user?._id]);

  // const placeBet = useCallback(
  //   (choice: "up" | "down") => {
  //     if (!choice) return;
  //     if (!socket || !userData?._id) return;
  //     if (hasBet) return toast.error("You already bet this round");
  //     // if (timeLeft < 5) return toast.error("Round is ending soon");
  //     if (betAmount < 1) return toast.error("Invalid bet amount");
  //     if (userData.balance < betAmount)
  //       return toast.error("Insufficient balance");

  //     setPlacedBet({
  //       roundId,
  //       choice: choice as "up" | "down",
  //       amount: betAmount,
  //     });

  //     console.log("placed bet is ", placedBet);

  //     socket.emit("placeBet", {
  //       userId: userData._id,
  //       choice,
  //       amount: betAmount,
  //     });
  //   },
  //   [socket, userData, betAmount, hasBet]
  // );

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setBetAmount(value === "" ? 0 : Number(value));
    }
  };

  const placeBet = useCallback(
    (choice: "up" | "down") => {
      if (!choice) return;
      if (!socket || !userData?._id) return;
      if (hasBet) return toast.error("You already bet this round");
      if (betAmount < 1) return toast.error("Invalid bet amount");
      if (userData.balance < betAmount)
        return toast.error("Insufficient balance");

      // Mark the bet as placed
      setHasBet(true);

      setPlacedBet({
        roundId,
        choice,
        amount: betAmount,
      });
      placedBetRef.current = {
        roundId,
        choice,
        amount: betAmount,
      };

      // Emit to the server
      socket.emit("placeBet", {
        userId: userData._id,
        roundId, // important to send roundId if server needs it
        choice,
        amount: betAmount,
      });

      setStatus(`Bet placed on "${choice.toUpperCase()}"`);
      setBetAmount(10);
    },
    [socket, userData, betAmount, hasBet, roundId]
  );

  const quickBets = [10, 50, 100, 500];

  useEffect(() => {
    console.log("placedBet changed:", placedBet);
  }, [placedBet]);

  const getUserBalance = async () => {
    try {
      if (!user?.token) return toast.error("Token not found");

      const res = await userService.getUserBalance(user.token);
      if (res?.success) {
        setUserData((prev: any) => ({ ...prev, balance: res.data.balance }));
        dispatch(
          setUser({
            ...user,
            balance: res.data.balance,
            token: user.token || "",
          })
        );
      } else toast.error(res?.message || "Failed to fetch balance");
    } catch (error) {
      console.error("Balance error:", error);
      toast.error("Error fetching balance");
    }
  };

  const Candlestick = ({ item }: { item: RoundHistory }) => {
    const total = item.totals.up + item.totals.down;
    const upPercent = total > 0 ? (item.totals.up / total) * 100 : 50;

    return (
      <div className="flex flex-col items-center mx-1">
        <div className="relative h-24 w-6">
          <div
            className={`absolute left-1/2 w-0.5 h-full ${
              item.result === "up" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <div
            className="absolute bottom-0 w-full"
            style={{ height: `${100 - upPercent}%` }}
          >
            <div
              className={`w-full h-full ${
                item.result === "up" ? "bg-green-300" : "bg-red-300"
              }`}
            ></div>
          </div>
          <div
            className="absolute top-0 w-full"
            style={{ height: `${upPercent}%` }}
          >
            <div
              className={`w-full h-full ${
                item.result === "up" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
        </div>
        <div
          className={`text-xs mt-1 font-bold ${
            item.result === "up" ? "text-green-400" : "text-red-400"
          }`}
        >
          {item.result.toUpperCase()}
        </div>
      </div>
    );
  };

  // const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
  //   const date = new Date(bet.createdAt).toLocaleTimeString();

  //   return (
  //     <div
  //       className={`p-3 mb-2 rounded-lg ${
  //         bet.result === "win" ? "bg-green-900/50" : "bg-red-900/50"
  //       }`}
  //     >
  //       <div className="flex justify-between items-center">
  //         <div>
  //           <span className="font-semibold">Round #{bet.roundId}</span>
  //           <span className="text-xs ml-2 text-gray-400">{date}</span>
  //         </div>
  //         <div
  //           className={`font-bold ${
  //             bet.result === "win" ? "text-green-400" : "text-red-400"
  //           }`}
  //         >
  //           {bet.result === "win" ? "+" : "-"}₹{bet.amount}
  //         </div>
  //       </div>
  //       <div className="flex justify-between mt-1 text-sm">
  //         <div
  //           className={`flex items-center ${
  //             bet.choice === "up" ? "text-green-400" : "text-red-400"
  //           }`}
  //         >
  //           {bet.choice === "up" ? (
  //             <FaChevronUp className="mr-1" />
  //           ) : (
  //             <FaChevronDown className="mr-1" />
  //           )}
  //           {/* {bet.choice.toUpperCase()} */}
  //           {/* {bet?.choice?.toUpperCase() || "N/A"} */}
  //           {bet?.choice || "N/A"}
  //         </div>
  //         <div className="flex items-center text-yellow-400">
  //           <FaCoins className="mr-1" />
  //           {bet.result === "win" ? `+₹${bet.payout}` : `-₹${bet.amount}`}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
  //   const date = new Date(bet.createdAt).toLocaleTimeString();
  //   const isWin = bet.result === "win";
  //   const isPending = bet.result === "pending";

  //   return (
  //     <div
  //       className={`p-3 mb-2 rounded-lg ${
  //         isPending
  //           ? "bg-gray-800/50"
  //           : isWin
  //           ? "bg-green-900/50"
  //           : "bg-red-900/50"
  //       }`}
  //     >
  //       <div className="flex justify-between items-center">
  //         <div>
  //           <span className="font-semibold">Round #{bet.roundId}</span>
  //           <span className="text-xs ml-2 text-gray-400">{date}</span>
  //         </div>
  //         <div
  //           className={`font-bold ${
  //             isPending
  //               ? "text-gray-400"
  //               : isWin
  //               ? "text-green-400"
  //               : "text-red-400"
  //           }`}
  //         >
  //           {isPending
  //             ? "Pending"
  //             : isWin
  //             ? `+₹${bet.payout.toFixed(2)}`
  //             : `-₹${bet.amount.toFixed(2)}`}
  //         </div>
  //       </div>
  //       <div className="flex justify-between mt-1 text-sm">
  //         <div
  //           className={`flex items-center ${
  //             bet.choice === "up" ? "text-green-400" : "text-red-400"
  //           }`}
  //         >
  //           {bet.choice === "up" ? (
  //             <FaChevronUp className="mr-1" />
  //           ) : (
  //             <FaChevronDown className="mr-1" />
  //           )}
  //           {bet.choice.toUpperCase()}
  //         </div>
  //         <div className="flex items-center text-yellow-400">
  //           <FaCoins className="mr-1" />₹{bet.amount.toFixed(2)}
  //         </div>
  //       </div>
  //       {isPending && (
  //         <div className="text-xs text-center mt-2 text-gray-300">
  //           Waiting for result...
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  const BetHistoryItem = ({ bet }: { bet: UserBet }) => {
    // Format date to be more compact on mobile
    const date = new Date(bet.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Shorten round ID to 6 characters (like "55aabb")
    const shortRoundId =
      bet.roundId.length > 6
        ? `${bet.roundId.slice(0, 2)}${bet.roundId.slice(-4)}`
        : bet.roundId;

    const isWin = bet.result === "win";
    const isPending = bet.result === "pending";

    return (
      <div
        className={`p-3 mb-2 rounded-lg ${
          isPending
            ? "bg-gray-800/50"
            : isWin
            ? "bg-green-900/50"
            : "bg-red-900/50"
        }`}
      >
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center">
            <span className="font-semibold text-sm sm:text-base">
              Round #{shortRoundId}
            </span>
            <span className="text-xs ml-2 text-gray-400 hidden xs:inline">
              {date}
            </span>
          </div>
          <div
            className={`font-bold text-sm sm:text-base ${
              isPending
                ? "text-gray-400"
                : isWin
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {isPending
              ? "Pending"
              : isWin
              ? `+₹${bet.payout.toFixed(2)}`
              : `-₹${bet.amount.toFixed(2)}`}
          </div>
        </div>

        {/* Mobile-only date */}
        <div className="xs:hidden text-xs text-gray-400 mt-1">{date}</div>

        <div className="flex justify-between mt-1 text-xs sm:text-sm">
          <div
            className={`flex items-center ${
              bet.choice === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {bet.choice === "up" ? (
              <FaChevronUp className="mr-1" size={12} />
            ) : (
              <FaChevronDown className="mr-1" size={12} />
            )}
            {bet.choice.toUpperCase()}
          </div>
          <div className="flex items-center text-yellow-400">
            <FaCoins className="mr-1" size={12} />₹{bet.amount.toFixed(2)}
          </div>
        </div>
        {isPending && (
          <div className="text-xs text-center mt-2 text-gray-300">
            Waiting for result...
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-md mx-auto bg-gray-900 text-white min-h-screen mt-16">
        {/* User Profile */}
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <img
              src={userData.profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500"
            />
            <div>
              <div className="font-bold">{userData.username}</div>
              <div className="flex items-center text-sm gap-2">
                <span>₹{userData.balance?.toFixed(2) || "0.00"}</span>
                <TfiReload
                  onClick={getUserBalance}
                  className="text-yellow-400 cursor-pointer"
                  size={15}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex items-center px-2 py-1 rounded ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {connected && <RiLiveFill className="mr-1" />}
            {connected ? "LIVE" : "OFFLINE"}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("game")}
            className={`flex-1 py-2 rounded-md ${
              activeTab === "game" ? "bg-gray-700" : ""
            }`}
          >
            Game
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 rounded-md ${
              activeTab === "history" ? "bg-gray-700" : ""
            }`}
          >
            My Bets
          </button>
        </div>

        {activeTab === "game" ? (
          <>
            {/* Current Round */}
            <div className="mb-4 p-4 rounded-lg bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">
                  Round #{roundId || "----"}
                </span>
                <p
                  className={`font-bold ${
                    timeLeft < 5 ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {timeLeft}s
                </p>
              </div>
              <div className="text-center text-sm text-gray-300">{status}</div>
            </div>

            {/* Betting Controls */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Bet Amount (₹)</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={betAmount}
                  onChange={handleBetAmountChange}
                  className="w-full p-3 rounded-l bg-gray-700 focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setBetAmount(Math.floor(userData.balance))}
                  className="bg-blue-600 px-4 rounded-r hover:bg-blue-500"
                >
                  MAX
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {quickBets.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className={`p-2 rounded ${
                      betAmount === amount ? "bg-blue-600" : "bg-gray-700"
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => placeBet("up")}
                  disabled={
                    !connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                  }
                  className={`p-4 rounded-lg flex flex-col items-center ${
                    !connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500"
                  }`}
                >
                  <FaChevronUp size={24} />
                  <span>BET UP</span>
                </button>
                <button
                  onClick={() => placeBet("down")}
                  disabled={
                    !connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                  }
                  className={`p-4 rounded-lg flex flex-col items-center ${
                    !connected ||
                    hasBet ||
                    userData.balance < betAmount ||
                    timeLeft < 5
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                >
                  <FaChevronDown size={24} />
                  <span>BET DOWN</span>
                </button>
              </div>
            </div>

            {/* History Section */}
            <div className="mb-4 bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-3 bg-gray-800">
                <h2 className="text-lg font-semibold">Recent Rounds</h2>
              </div>
              <div className="p-4">
                {history.length > 0 ? (
                  <div className="flex overflow-x-auto pb-2">
                    {history.map((item, i) => (
                      <Candlestick key={i} item={item} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-4">
                    No history yet
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="mb-4 bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-3 bg-gray-800">
              <h2 className="text-lg font-semibold">My Bet History</h2>
            </div>
            <div className="p-4">
              {userHistory.length > 0 ? (
                <div>
                  {userHistory.map((bet, i) => (
                    <BetHistoryItem
                      key={i}
                      bet={{
                        roundId: bet._id, // Map _id to roundId
                        choice: bet.choice as "up" | "down",
                        amount: bet.amount,
                        result: bet.result as "win" | "lose" | "pending",
                        payout: bet.payout,
                        createdAt: bet.createdAt,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4">
                  No bets placed yet
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForexTradingApp;
