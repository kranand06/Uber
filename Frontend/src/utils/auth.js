import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = res.data.user; // contains user data
    return { user, token }; // return user data along with
  } catch (error) {
    return false;
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    if (res.status == 200) {
      const { token, user } = res.data;
      // store token (if using localStorage)
      if (!token) {
        return {
          success: false,
          message: "No token received from server.",
        };
      }
      return {
        success: true,
        data: { token, user },
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Login failed",
      };
    }
    // assuming backend sends token
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed. Try again.",
    };
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/users/signup`, {
      name,
      email,
      password,
    });

    // success case
    if (res.status === 201) {
      const { token, user } = res.data;
      if (!token) {
        return {
          success: false,
          message: "No token received from server.",
        };
      }
      return {
        success: true,
        data: { token, user },
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Signup failed. Try again.",
      };
    }

    // fallback if not 201
    return {
      success: false,
      message: res.data?.message || "Signup failed. Try again.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed. Try again.",
    };
  }
};
