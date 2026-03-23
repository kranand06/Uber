import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-6 overflow-hidden relative">
      {/* Accent Background Shapes */}
      <div className="absolute w-72 h-72 bg-blue-200/40 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-200/40 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-7xl md:text-9xl font-extrabold text-gray-900"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-lg md:text-xl text-gray-600 text-center"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <NavLink
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg"
        >
          Go Back Home
        </NavLink>
      </motion.div>
    </div>
  );
}