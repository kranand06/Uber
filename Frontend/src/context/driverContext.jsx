import { createContext, useEffect, useState } from "react";
import { checkAuth, login, logout, signup } from "../utils/driverAuth.js";
import toast from "react-hot-toast";

export const DriverContext = createContext({});

export default function DriverProvider({ children }) {
  const [driver, setDriver] = useState(null); // ✅ use null (NOT {})
  const [drivertoken, setDriverToken] = useState(null);

  // ✅ Check auth on app load
  useEffect(() => {
    const fetchAuth = async () => {
      const res = await checkAuth();

      if (res) {
        setDriver(res.driver);
        setDriverToken(res.token);
      } else {
        setDriver(null);
        setDriverToken(null);
      }
    };

    fetchAuth();
  }, []);

  // ✅ Login
  const driverLogin = async (email, password) => {
    const res = await login(email, password);

    if (res.success) {
      const { token, driver } = res.data;

      localStorage.setItem("driverToken", token); // ✅ separate key

      setDriver(driver);
      setDriverToken(token);

    } else {
      setDriver(null);
      setDriverToken(null);
    }

    return res;
  };




  const driverSignup = async (name, email, password, color, model, plate, capacity, type) => {
    const res = await signup(name, email, password, color, model, plate, capacity, type);

    if (res.success) {
      const { token, driver } = res.data;

      localStorage.setItem("driverToken", token);

      setDriver(driver);
      setDriverToken(token);
    } else {
      setDriver(null);
      setDriverToken(null);
    }

    return res;
  };





  // ✅ Logout
  const driverLogout = async () => {
    const res = await logout();

    if (res.success) {
      localStorage.removeItem("driverToken"); // ✅ separate key

      setDriver(null);
      setDriverToken(null);

      toast.success("Logged out successfully!");
    } else {
      toast.error(res.message || "Logout failed");
    }
  };

  return (
    <DriverContext.Provider
      value={{
        driver,
        setDriver,
        drivertoken,
        setDriverToken,
        driverLogin,
        driverLogout,
        driverSignup
      }}
    >
      {children}
    </DriverContext.Provider>
  );
}
