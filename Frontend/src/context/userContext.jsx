import { createContext, useEffect, useState } from "react"
import { checkAuth } from "../utils/auth.js";

export const UserContext = createContext({});

export default function UserProvider({ children }) {

  useEffect(() => {
    const fetchAuth = async () => {
      const res = await checkAuth();
      if (res) {
        setUser({
          token: res.token,
          name: res.name,
          email: res.email,
          _id: res._id,
        });
      }
    };

    fetchAuth();
  }, []);


  const [user, setUser] = useState({
    token: null,
    name: null,
    email: null,
    _id: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser, checkAuth }}>
      {children}
    </UserContext.Provider>
  );
}