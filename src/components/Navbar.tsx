

// import React, { useState } from "react";
// import { useTheme } from "../utils/ThemeContext";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.jpg";
// import { useSelector, useDispatch } from "react-redux";
// import { clearUser } from "../features/userSlice";
// import { FiMenu, FiX } from "react-icons/fi";

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();
//   const dispatch = useDispatch();
//   const user = useSelector((state: any) => state.user);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const isGreen = theme === "green";

//   const bgColor = isGreen ? "bg-green-900" : "bg-zinc-900";
//   const textColor = isGreen ? "text-green-100" : "text-white";
//   const hoverColor = isGreen ? "hover:text-green-300" : "hover:text-gray-300";

//   const handleLoginLogout = () => {
//     dispatch(clearUser());
//     navigate("/login");
//   };

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

//   return (
//     <nav className={`${bgColor} ${textColor} shadow-md`}>
//       <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
//         {/* Logo + Title */}
//         <div
//           className="flex items-center gap-3 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
//           <span className="text-2xl font-bold">BetABack</span>
//         </div>

//         {/* Hamburger menu (mobile only) */}
//         <div className="md:hidden">
//           <button onClick={toggleMobileMenu} className="text-2xl">
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Desktop Nav */}
//         <ul className="hidden md:flex gap-6 text-lg font-medium items-center">
//           <li>
//             <Link to="/" className={`transition ${hoverColor}`}>
//               Home
//             </Link>
//           </li>
//           {
//             user && (
//  <li>
//             <Link to="/games" className={`transition ${hoverColor}`}>
//               Games
//             </Link>
//           </li>
//             )
//           }
         
//           {/* <li>
//             <Link to="/about" className={`transition ${hoverColor}`}>
//               About
//             </Link>
//           </li> */}
//           <li>
//             <Link to="/contact" className={`transition ${hoverColor}`}>
//               Contact
//             </Link>
//           </li>

//           {user && user?.Role === "ADMIN" && (
//             <Link to="/admin" className={`transition ${hoverColor}`}>
//               Admin
//             </Link>
//           )}

//           {/* Theme Toggle */}
//           <li>
//             <div className="flex items-center gap-2">
//               <span className="text-sm">Theme</span>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={isGreen}
//                   onChange={toggleTheme}
//                 />
//                 <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition" />
//                 <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full" />
//               </label>
//             </div>
//           </li>

//           {/* Profile or Login/Signup */}
//           {user?.token ? (
//             <>
//               <li>
//                 <Link
//                   to="/profile"
//                   className={`flex items-center gap-2 ${hoverColor}`}
//                 >
//                   <img
//                     src={user.profilePic || "https://via.placeholder.com/150"}
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   <span>Profile</span>
//                 </Link>
//               </li>
//               <li>
//                 <button
//                   onClick={handleLoginLogout}
//                   className={`px-4 py-2 rounded-full font-semibold text-sm ${
//                     isGreen
//                       ? "bg-green-700 hover:bg-green-600"
//                       : "bg-zinc-800 hover:bg-zinc-700"
//                   }`}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <li className="flex gap-2">
//               <Link to="/login">
//                 <button
//                   className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                     isGreen
//                       ? "bg-green-700 hover:bg-green-600"
//                       : "bg-zinc-800 hover:bg-zinc-700"
//                   }`}
//                 >
//                   Login
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button
//                   className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                     isGreen
//                       ? "bg-green-700 hover:bg-green-600"
//                       : "bg-zinc-800 hover:bg-zinc-700"
//                   }`}
//                 >
//                   Signup
//                 </button>
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Mobile menu (below nav) */}
//       {isMobileMenuOpen && (
//         <div className={`${bgColor} md:hidden px-4 pb-4`}>
//           <ul className="flex flex-col gap-4 text-lg font-medium">
//             <li>
//               <Link
//                 to="/"
//                 onClick={toggleMobileMenu}
//                 className={`${hoverColor}`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/games"
//                 onClick={toggleMobileMenu}
//                 className={`${hoverColor}`}
//               >
//                 Games
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 onClick={toggleMobileMenu}
//                 className={`${hoverColor}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 onClick={toggleMobileMenu}
//                 className={`${hoverColor}`}
//               >
//                 Contact
//               </Link>
//             </li>
//             {user && user?.Role === "ADMIN" && (
//               <li>
//                 <Link
//                   to="/admin"
//                   onClick={toggleMobileMenu}
//                   className={`${hoverColor} bg-[#f0f0f0] text-black rounded-md px-2 py-1`}
//                 >
//                   Admin
//                 </Link>
//               </li>
//             )}

//             {/* Theme Toggle */}
//             <li className="flex items-center gap-2">
//               <span className="text-sm">Theme</span>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={isGreen}
//                   onChange={toggleTheme}
//                 />
//                 <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition" />
//                 <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full" />
//               </label>
//             </li>

//             {/* Auth Options */}
//             {user?.token ? (
//               <>
//                 <li>
//                   <Link
//                     to="/profile"
//                     onClick={toggleMobileMenu}
//                     className={`flex items-center gap-2 ${hoverColor}`}
//                   >
//                     <img
//                       src={user.profilePic || "https://via.placeholder.com/150"}
//                       alt="Profile"
//                       className="w-8 h-8 rounded-full object-cover"
//                     />
//                     <span>Profile</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       handleLoginLogout();
//                       toggleMobileMenu();
//                     }}
//                     className={`w-full px-4 py-2 rounded-full text-sm font-semibold ${
//                       isGreen
//                         ? "bg-green-700 hover:bg-green-600"
//                         : "bg-zinc-800 hover:bg-zinc-700"
//                     }`}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/login" onClick={toggleMobileMenu}>
//                     <button
//                       className={`w-full px-4 py-2 rounded-full text-sm font-semibold ${
//                         isGreen
//                           ? "bg-green-700 hover:bg-green-600"
//                           : "bg-zinc-800 hover:bg-zinc-700"
//                       }`}
//                     >
//                       Login
//                     </button>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/signup" onClick={toggleMobileMenu}>
//                     <button
//                       className={`w-full px-4 py-2 rounded-full text-sm font-semibold ${
//                         isGreen
//                           ? "bg-green-700 hover:bg-green-600"
//                           : "bg-zinc-800 hover:bg-zinc-700"
//                       }`}
//                     >
//                       Signup
//                     </button>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState, useEffect } from "react";
import { useTheme } from "../utils/ThemeContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isGreen = theme === "green";

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLoginLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Theme colors
  const themeColors = {
    green: {
      bg: "bg-gradient-to-r from-green-800 to-green-900",
      hover: "hover:text-green-300",
      active: "text-green-400",
      button: "bg-green-700 hover:bg-green-600",
      scrolledBg: "bg-green-900/95 backdrop-blur-sm",
    },
    dark: {
      bg: "bg-gradient-to-r from-gray-900 to-zinc-900",
      hover: "hover:text-gray-300",
      active: "text-blue-400",
      button: "bg-zinc-800 hover:bg-zinc-700",
      scrolledBg: "bg-zinc-900/95 backdrop-blur-sm",
    },
  };

  const currentTheme = isGreen ? themeColors.green : themeColors.dark;

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50  top-0 mb-16 ${
        scrolled ? currentTheme.scrolledBg : currentTheme.bg
      } ${scrolled ? "shadow-xl" : "shadow-md"} transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo + Title */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-white/20"
          />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            BetABack
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {[
            { path: "/", label: "Home" },
            ...(user ? [{ path: "/games", label: "Games" }] : []),
            { path: "/contact", label: "Contact" },
            ...(user?.Role === "ADMIN"
              ? [{ path: "/admin", label: "Admin" }]
              : []),
          ].map((item, index) => (
            <motion.li
              key={item.path}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`px-3 py-2 rounded-md transition ${
                  currentTheme.hover
                } ${
                  location.pathname === item.path ? currentTheme.active : ""
                } font-medium`}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}

          {/* Theme Toggle */}
          <motion.li
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex items-center ml-4"
          >
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isGreen ? "bg-green-700/30" : "bg-zinc-700/30"
              }`}
              aria-label="Toggle theme"
            >
              {isGreen ? (
                <FiSun className="text-yellow-300" size={18} />
              ) : (
                <FiMoon className="text-blue-300" size={18} />
              )}
            </button>
          </motion.li>

          {/* Profile or Login/Signup */}
          {user?.token ? (
            <motion.li
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 ml-4"
            >
              <Link
                to="/profile"
                className={`flex items-center gap-2 ${currentTheme.hover}`}
              >
                <img
                  src={user.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
                />
              </Link>
              <button
                onClick={handleLoginLogout}
                className={`px-4 py-2 rounded-full font-medium text-sm ${currentTheme.button} transition-all hover:shadow-md`}
              >
                Logout
              </button>
            </motion.li>
          ) : (
            <motion.li
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="flex gap-3 ml-4"
            >
              <Link to="/login">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${currentTheme.button} transition-all hover:shadow-md`}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isGreen
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-blue-600 hover:bg-blue-500"
                  } transition-all hover:shadow-md`}
                >
                  Signup
                </button>
              </Link>
            </motion.li>
          )}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FiX size={24} className={currentTheme.hover} />
          ) : (
            <FiMenu size={24} className={currentTheme.hover} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden md:hidden ${currentTheme.bg}`}
          >
            <div className="px-4 pb-4 pt-2">
              <ul className="flex flex-col gap-3">
                {[
                  { path: "/", label: "Home" },
                  ...(user ? [{ path: "/games", label: "Games" }] : []),
                  { path: "/contact", label: "Contact" },
                  ...(user?.Role === "ADMIN"
                    ? [{ path: "/admin", label: "Admin" }]
                    : []),
                ].map((item) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg transition ${
                        currentTheme.hover
                      } ${
                        location.pathname === item.path
                          ? `${currentTheme.active} bg-white/10`
                          : ""
                      } font-medium`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}

                {/* Theme Toggle */}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center justify-between px-4 py-3 rounded-lg"
                >
                  <span className="font-medium">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full ${
                      isGreen ? "bg-green-700/30" : "bg-zinc-700/30"
                    }`}
                  >
                    {isGreen ? (
                      <FiSun className="text-yellow-300" size={18} />
                    ) : (
                      <FiMoon className="text-blue-300" size={18} />
                    )}
                  </button>
                </motion.li>

                {/* Auth Options */}
                {user?.token ? (
                  <>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Link
                        to="/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${currentTheme.hover}`}
                      >
                        <img
                          src={user.profilePic || "https://via.placeholder.com/150"}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                        />
                        <span>Profile</span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <button
                        onClick={handleLoginLogout}
                        className={`w-full px-4 py-3 rounded-lg text-sm font-medium ${currentTheme.button}`}
                      >
                        Logout
                      </button>
                    </motion.li>
                  </>
                ) : (
                  <>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Link to="/login">
                        <button
                          className={`w-full px-4 py-3 rounded-lg text-sm font-medium ${currentTheme.button}`}
                        >
                          Login
                        </button>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Link to="/signup">
                        <button
                          className={`w-full px-4 py-3 rounded-lg text-sm font-medium ${
                            isGreen
                              ? "bg-green-600 hover:bg-green-500"
                              : "bg-blue-600 hover:bg-blue-500"
                          }`}
                        >
                          Signup
                        </button>
                      </Link>
                    </motion.li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;