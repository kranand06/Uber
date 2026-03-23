import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../context/userContext";


export default function SignupPage() {

    const { signup } = useContext(UserContext);

  const [role, setRole] = useState("user");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    color: "",
    model: "",
    plate: "",
    capacity: "",
    type: "car",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;
    if (role === "user") {
      signup(formData.name, formData.email, formData.password)
      .then((res) => {
        console.log("Signup response:", res);
        if (res.success) {
          toast.success("Signup successful!");
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error("Signup error:", err);
        toast.error("An error occurred. Please try again.");
      });
    }
    if (role === "driver") {
      const { color, model, plate, capacity, type } = formData;

      if (!color || !model || !plate || !capacity || !type) {
        toast.error("Fill all vehicle details");
        return;
      }
      toast.error("Driver login not implemented yet.");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      color: "",
      model: "",
      plate: "",
      capacity: "",
      type: "car",
    });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

      {/* LEFT */}
      <div className="flex-1 flex flex-col justify-start lg:justify-center items-center px-6 pt-20 pb-10 relative">

        {/* Logo */}
        <img
          src="/logo.svg"
          alt="logo"
          className="absolute top-6 left-6 w-28 md:w-32 object-contain"
        />

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md space-y-8 mt-8"
        >

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 text-base lg:text-sm">
            <button
              onClick={() => {
                setRole("user");
                setStep(1);
              }}
              className={`flex-1 py-3 rounded-lg font-medium ${
                role === "user" ? "bg-white text-black" : "text-gray-500"
              }`}
            >
              User
            </button>

            <button
              onClick={() => {
                setRole("driver");
                setStep(1);
              }}
              className={`flex-1 py-3 rounded-lg font-medium ${
                role === "driver" ? "bg-white text-black" : "text-gray-500"
              }`}
            >
              Driver
            </button>
          </div>

          {/* Title */}
          {/* <div className="text-center">
            <h2 className="text-3xl lg:text-2xl font-bold">
              {role === "user" ? "Create Account" : "Driver Signup"}
            </h2>
          </div> */}
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-2xl font-bold text-gray-900 text-center">
              {role === "user" ? "Create Account" : "Signup as Driver"}
            </h2>
            <p className="text-gray-600 text-base lg:text-sm text-center">
              {role === "user"
                ? "Sign up to book rides"
                : "Sign up to be a driver and earn"}
            </p>
          </div>

          {/* Step Indicator */}
          {role === "driver" && (
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                  step === 1 ? "bg-black text-white" : "bg-gray-300"
                }`}>
                  1
                </div>
                <span className="text-sm text-gray-600">Basic</span>
              </div>

              <div className="w-10 h-0.5 bg-gray-300"></div>

              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                  step === 2 ? "bg-black text-white" : "bg-gray-300"
                }`}>
                  2
                </div>
                <span className="text-sm text-gray-600">Vehicle</span>
              </div>
            </div>
          )}

          {/* FORM */}
          <form className="space-y-6">

            <AnimatePresence mode="wait">

              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <div className="space-y-2">
                    <label className="text-gray-700">What's your name?</label>
                    <input
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700">What's your email?</label>
                    <input
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700">Create password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input pr-12"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="icon"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700">Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                </motion.div>
              )}

              {/* STEP 2 (Driver) */}
              {role === "driver" && step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <div className="space-y-2">
                    <label className="text-gray-700">Vehicle color</label>
                    <input name="color" className="input" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700">Vehicle model</label>
                    <input name="model" className="input" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700">Number plate</label>
                    <input name="plate" className="input" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700">Capacity</label>
                    <input name="capacity" type="number" className="input" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700">Vehicle type</label>
                    <select name="type" className="input" onChange={handleChange}>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

            {/* Back Button */}
            {role === "driver" && step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full border py-3 rounded-xl hover:bg-gray-100"
              >
                ← Back
              </button>
            )}

            {/* Main Button */}
            {role === "driver" && step === 1 ? (
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext} className="btn">
                Next →
              </motion.button>
            ) : (
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit} className="btn">
                Sign Up
              </motion.button>
            )}
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <NavLink to="/login" className="text-black font-medium">
              Login
            </NavLink>
          </p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex w-1/2 bg-[url('/Heroimage.jpg')] bg-cover bg-center items-center justify-center">
      <div className="bg-black/20 w-full h-full flex items-center justify-center px-8">
        <h1 className="text-white text-3xl font-bold text-center px-8">
          Start your journey today
        </h1>
      </div>
      </div>
    </div>
  );
}