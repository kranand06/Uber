import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { DriverContext } from '../context/driverContext';

const LogoutPage = () => {
  const navigate = useNavigate();

  const { token, logout } = useContext(UserContext);
  const { drivertoken, driverLogout } = useContext(DriverContext);

  const handleLogout = async () => {
    if (token) await logout();
    if (drivertoken) await driverLogout();

    navigate("/login", { replace: true }); // ✅ prevents back-loop
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutPage;