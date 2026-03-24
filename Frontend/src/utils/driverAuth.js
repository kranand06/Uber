import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const checkAuth = async () => {
  const token = localStorage.getItem("driverToken"); // ✅ FIXED
  if (!token) return false;

  try {
    const res = await axios.get(`${API_URL}/drivers/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const driver = res.data.driver;
    return { driver, token };
  } catch (error) {
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/drivers/login`, {
      email,
      password,
    });

    if (res.status === 200) {
      const { token, driver } = res.data;

      if (!token) {
        return { success: false, message: "No token received." };
      }

      return {
        success: true,
        data: { token, driver },
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Login failed",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};


export const signup = async (name, email, password, color, model, plate, capacity, type) => {
  const data={
      name,
      email,
      password,
      vehicle:{
        color:color,
        model:model,
        licensePlate: plate,
        capacity: capacity,
        type:type
      }};
try {
    const res = await axios.post(`${API_URL}/drivers/signup`, data);

    const { token, driver } = res.data;

    if (!token) {
      return {
        success: false,
        message: "No token received from server.",
      };
    }

    return {
      success: true,
      data: { token, driver },
    };

  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Try again.",
    };
  }
};


export const logout = async () => {
  try {
    const token = localStorage.getItem("driverToken"); // ✅ FIXED

    const res = await axios.get(`${API_URL}/drivers/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return { success: true, message: "Logged out successfully!" };
    } else {
      return { success: false, message: "Logout failed." };
    }
  } catch (error) {
    return { success: false, message: "Logout failed." };
  }
};