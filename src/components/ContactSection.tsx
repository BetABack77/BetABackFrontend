import React from "react";
import { Link } from "react-router-dom";

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Customer Support
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            We're here to help you 24/7. Contact us through any of these
            channels for quick assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* WhatsApp Card */}
          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-500 hover:bg-gray-700 transition-all transform hover:-translate-y-2">
            <div className="flex items-start mb-4">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-green-400">
                  WhatsApp Support
                </h3>
                <p className="text-gray-300 mb-4">
                  Get instant help through WhatsApp. Our team responds quickly
                  to all inquiries.
                </p>
                <a
                  href="https://wa.me/27799930170"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full font-medium transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Telegram Card */}
          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-400 hover:bg-gray-700 transition-all transform hover:-translate-y-2">
            <div className="flex items-start mb-4">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.09.06-.17.01-.24-.06-.06-.22-.04-.31-.02-.13.03-2.12 1.36-5.99 4-.59.41-1.12.61-1.6.6-.52-.01-1.52-.3-2.26-.54-.91-.3-1.64-.46-1.58-.97.03-.28.85-.58 1.68-.88 2.01-.75 3.36-1.23 5.06-1.88.76-.29 1.45-.43 1.78-.45.38-.02.73.06.98.19.7.36.46 1.21.36 1.21z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-blue-400">
                  Telegram Support
                </h3>
                <p className="text-gray-300 mb-4">
                  Join our Telegram channel for updates and direct messaging
                  with our support team.
                </p>
                <a
                  href="https://t.me/betabackofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-colors"
                >
                  Join Telegram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-300">
            Need more help?
          </h3>
          <p className="text-lg text-gray-400 mb-6">
            You can also email us at{" "}
            <span className="text-green-400">betabackuserhelp@gmail.com</span>
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/contact"
              className="px-6 py-2 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2 border-2 border-gray-500 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
