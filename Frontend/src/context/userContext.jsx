import { createContext, useEffect, useState } from "react"
import { checkAuth, loginUser, signupUser } from "../utils/auth.js";
import toast from "react-hot-toast";

export const UserContext = createContext({});

export default function UserProvider({ children }) {


  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);


  const fetchAuth = async () => {
    const res = await checkAuth();
    if (res) {
      setUser(res.user);
      setToken(res.token);
    } else {
      setUser({});
      setToken(null);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);

    if (res.success) {
      const { token, user } = res.data;

      localStorage.setItem("token", token);

      setUser(user);
      setToken(token);
      return res;
    }
    else {
      setUser({});
      setToken(null);
      return res;
    }
  };

  const signup = async (name, email, password) => {
    const res = await signupUser(name, email, password);

    if (res.success) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      return res;
    }
    else {
      setUser({});
      setToken(null);
      return res;
    }
  };


  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, login, signup }}>
      {children}
    </UserContext.Provider>
  );
}