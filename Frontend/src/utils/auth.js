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
    const user= res.data.user; // contains user data
    return ({
      email:user.email,
      name:user.name,
      _id:user._id,
       token
      }); // contains user and token
  } catch (error) {
    return false;
  }
};