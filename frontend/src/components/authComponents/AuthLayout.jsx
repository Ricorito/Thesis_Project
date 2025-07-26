import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function AuthLayout({ isRegisterPage, onToggle, logo, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-200 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[800px] sm:min-h-[680px] shadow-2xl rounded-xl overflow-hidden flex flex-col sm:flex-row scale-95 hover:scale-100 transition-transform duration-300 ease-out"
      >
        {/* Left Panel */}
        <div
          className={`w-full sm:w-1/2 p-6 flex flex-col items-center justify-center border transition-transform duration-500 ease-in-out ${
            isRegisterPage
              ? "bg-gray-100 border-gray-300 sm:translate-x-full"
              : "bg-darkblue border-gray-800 sm:translate-x-0"
          }`}
        >
          <Link to="/">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white flex items-center justify-center rounded-full mb-6 shadow-md border border-gray-300">
              <img
                src={logo || "/placeholder.svg"}
                alt="logo"
                className="hover:scale-105 transition-all rounded-full w-full h-full object-contain"
              />
            </div>
          </Link>
          <h2
            className={`text-lg font-semibold mb-2 text-center ${
              isRegisterPage ? "text-gray-800" : "text-white"
            }`}
          >
            {isRegisterPage ? "Back to Login" : "Join the Community!"}
          </h2>
          <p
            className={`text-sm mb-4 text-center max-w-xs ${
              isRegisterPage ? "text-gray-700" : "text-white/80"
            }`}
          >
            {isRegisterPage
              ? "Already have an account? Log in!"
              : "Create an account and explore the community!"}
          </p>
          <button
            onClick={onToggle}
            className={`px-4 py-2 text-sm rounded-md font-bold transition duration-300 shadow-sm hover:shadow-lg ${
              isRegisterPage
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-white hover:bg-gray-100 text-darkblue border border-white"
            }`}
          >
            {isRegisterPage ? "Login" : "Sign Up"}
          </button>
          <Link
            to="/"
            className={`mt-6 text-sm font-medium hover:underline ${
              isRegisterPage ? "text-gray-700" : "text-white"
            }`}
          >
            Back home
          </Link>
        </div>

        {/* Right Panel */}
        <div
          className={`w-full sm:w-1/2 p-6 flex flex-col items-center justify-center border transition-transform duration-500 ease-in-out ${
            isRegisterPage
              ? "bg-darkblue border-gray-800 sm:-translate-x-full"
              : "bg-white border-gray-300 sm:translate-x-0"
          }`}
        >
          <div className="w-full max-h-full overflow-y-auto">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;
