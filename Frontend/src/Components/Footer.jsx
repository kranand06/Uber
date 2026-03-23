import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <h2 className="text-xl font-bold text-white">RideNow</h2>

        {/* Minimal Links */}
        <div className="flex gap-6 text-sm">
          <NavLink to="/" className="hover:text-white">Home</NavLink>
          <NavLink to="/book" className="hover:text-white">Book Ride</NavLink>
          <NavLink to="/help" className="hover:text-white">Help</NavLink>
        </div>

        {/* Contact */}
        <div className="text-sm text-center md:text-right">
          <p>support@ridenow.com</p>
          <p>+91 98765 43210</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center text-sm py-3">
        © {new Date().getFullYear()} RideNow
      </div>
    </footer>
  );
}