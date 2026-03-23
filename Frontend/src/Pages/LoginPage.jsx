import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // Handle form submission logic here (e.g., API call)
    e.preventDefault();
    if (!email || !password) {
      toast.error("All Field are required");
      return;
    }
    console.log(role, email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

      {/* LEFT SIDE (Form) */}
      <div className="flex-1 flex flex-col justify-start lg:justify-center items-center px-6 pt-20 pb-10 relative">

        {/* Logo */}
        <img
          src="/logo.svg"
          alt="logo"
          className="absolute top-6 left-6 w-28 md:w-32 object-contain"
        />

        {/* Form */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 mt-8"
        >
          {/* Toggle Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 text-base lg:text-sm">
            <button
              onClick={() => setRole("user")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                role === "user"
                  ? "bg-white text-black"
                  : "text-gray-500"
              }`}
            >
              User
            </button>

            <button
              onClick={() => setRole("driver")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                role === "driver"
                  ? "bg-white text-black"
                  : "text-gray-500"
              } transition-smooth`}
            >
              Driver
            </button>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-2xl font-bold text-gray-900 text-center">
              {role === "user" ? "Welcome Back" : "Driver Login"}
            </h2>
            <p className="text-gray-600 text-base lg:text-sm text-center">
              {role === "user"
                ? "Login to continue booking rides"
                : "Login to manage your rides"}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-base lg:text-sm text-gray-700 flex flex-col gap-2">
                What's your email?
              </label>
              <input

                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="space-y-2 flex flex-col gap-2">
              <label className="text-base lg:text-sm text-gray-700">
                What's your password?
              </label>

              {/* Password Field with Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold text-base lg:text-sm hover:bg-gray-800 transition"
              onClick={handleSubmit}
            >
              {role === "user" ? "Login as User" : "Login as Driver"}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-base lg:text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="text-black font-medium">
              Sign up
            </NavLink>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE (Image) */}
      <div className="hidden lg:flex w-1/2 bg-[url('/Heroimage.jpg')] bg-cover bg-center items-center justify-center">
        <div className="bg-black/20 w-full h-full flex items-center justify-center px-8">
          <h1 className="text-white text-3xl font-bold text-center leading-relaxed">
            Ride smarter, move faster 🚕
          </h1>
        </div>
      </div>
    </div>
  );
}
