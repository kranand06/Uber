import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/Heroimage.jpg')]  bg-no-repeat bg-cover bg-position-[center_85%] md:bg-position-[center_75%]">
      {/* Top Section with Image */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Logo */}
        
        <img
          src="/logo.svg"
          alt="logo"
          className="absolute top-0 left-0 w-36 object-contain"
        />

      </div>

      {/* Bottom CTA Section */}
      <div className="bg-white rounded-t-3xl p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900">
          Get started with <span className="font-bold">RideNow</span>
        </h1>

        <NavLink
          to="/login"
          className="mt-6 block w-full text-center bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-800 transition"
        >
          Continue →
        </NavLink>
      </div>
    </div>
  );
}