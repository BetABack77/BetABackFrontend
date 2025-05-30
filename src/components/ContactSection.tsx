// import React from "react";
// import { Link } from "react-router-dom";

// const ContactSection: React.FC = () => {
//   return (
//     <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto text-center mb-12">
//           <h2 className="text-4xl font-bold mb-6">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
//               Customer Support
//             </span>
//           </h2>
//           <p className="text-xl text-gray-300">
//             We're here to help you 24/7. Contact us through any of these
//             channels for quick assistance.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {/* WhatsApp Card */}
//           <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-500 hover:bg-gray-700 transition-all transform hover:-translate-y-2">
//             <div className="flex items-start mb-4">
//               <div className="bg-green-500 p-3 rounded-lg mr-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl font-bold mb-2 text-green-400">
//                   WhatsApp Support
//                 </h3>
//                 <p className="text-gray-300 mb-4">
//                   Get instant help through WhatsApp. Our team responds quickly
//                   to all inquiries.
//                 </p>
//                 <a
//                   href="https://wa.me/27799930170"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full font-medium transition-colors"
//                 >
//                   Chat on WhatsApp
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Telegram Card */}
//           <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-400 hover:bg-gray-700 transition-all transform hover:-translate-y-2">
//             <div className="flex items-start mb-4">
//               <div className="bg-blue-500 p-3 rounded-lg mr-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.09.06-.17.01-.24-.06-.06-.22-.04-.31-.02-.13.03-2.12 1.36-5.99 4-.59.41-1.12.61-1.6.6-.52-.01-1.52-.3-2.26-.54-.91-.3-1.64-.46-1.58-.97.03-.28.85-.58 1.68-.88 2.01-.75 3.36-1.23 5.06-1.88.76-.29 1.45-.43 1.78-.45.38-.02.73.06.98.19.7.36.46 1.21.36 1.21z" />
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl font-bold mb-2 text-blue-400">
//                   Telegram Support
//                 </h3>
//                 <p className="text-gray-300 mb-4">
//                   Join our Telegram channel for updates and direct messaging
//                   with our support team.
//                 </p>
//                 <a
//                   href="https://t.me/betabackofficial"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-colors"
//                 >
//                   Join Telegram
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-16 text-center">
//           <h3 className="text-2xl font-bold mb-4 text-gray-300">
//             Need more help?
//           </h3>
//           <p className="text-lg text-gray-400 mb-6">
//             You can also email us at{" "}
//             <span className="text-green-400">betabackuserhelp@gmail.com</span>
//           </p>
//           <div className="flex justify-center space-x-4">
//             <Link
//               to="/contact"
//               className="px-6 py-2 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-colors"
//             >
//               FAQ
//             </Link>
//             <Link
//               to="/contact"
//               className="px-6 py-2 border-2 border-gray-500 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
//             >
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;



import React from "react";
import { Link } from "react-router-dom";

const ContactSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 animate-gradient-x">
              Customer Support
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            We're here to help you 24/7. Contact us through any of these
            channels for quick assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* WhatsApp Card */}
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-green-400 rounded-full animate-pulse delay-300"></div>
            
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl mr-6 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-green-400">
                  WhatsApp Support
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Get instant help through WhatsApp. Our team responds quickly
                  to all inquiries.
                </p>
                <a
                  href="https://wa.me/27799930170"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-green-600/30"
                >
                  <span>Chat on WhatsApp</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Telegram Card */}
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl mr-6 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.09.06-.17.01-.24-.06-.06-.22-.04-.31-.02-.13.03-2.12 1.36-5.99 4-.59.41-1.12.61-1.6.6-.52-.01-1.52-.3-2.26-.54-.91-.3-1.64-.46-1.58-.97.03-.28.85-.58 1.68-.88 2.01-.75 3.36-1.23 5.06-1.88.76-.29 1.45-.43 1.78-.45.38-.02.73.06.98.19.7.36.46 1.21.36 1.21z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-blue-400">
                  Telegram Support
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Join our Telegram channel for updates and direct messaging
                  with our support team.
                </p>
                <a
                  href="https://t.me/betabackofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-600/30"
                >
                  <span>Join Telegram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-gray-800/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-gray-700">
            <h3 className="text-3xl font-bold mb-4 text-gray-300">
              Need more help?
            </h3>
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              You can also email us at{" "}
              <span className="text-green-400 font-medium">betabackuserhelp@gmail.com</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                FAQ
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-gray-500 text-gray-300 rounded-xl hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 010-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                Terms of Service
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-gray-500 text-gray-300 rounded-xl hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;