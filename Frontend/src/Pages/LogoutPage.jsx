import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {

  const navigate = useNavigate();

  const { logout } = useContext(UserContext);

useEffect(() => {
  logout(); // clear state/token
  navigate("/login");
}, [logout, navigate]);

  return (
    <div>LogoutPage</div>
  )
}

export default LogoutPage