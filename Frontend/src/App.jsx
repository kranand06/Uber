import React, { useContext } from 'react'
import { UserContext } from './context/userContext';
import Footer from './Components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import SignupPage from './Pages/SignupPage.jsx';
import LoginPage from './Pages/loginPage.jsx';
import HomePage from './Pages/User/HomePage.jsx';
import Error404 from './Pages/Error404';
import { Toaster } from "react-hot-toast";
import ProfilePage from './Pages/User/ProfilePage.jsx';
import LogoutPage from './Pages/LogoutPage.jsx';
import DriverHome from './Pages/Driver/DriverHome.jsx';
import { DriverContext } from './context/driverContext.jsx';


const App = () => {

  const { token } = useContext(UserContext);
  const { drivertoken } = useContext(DriverContext);

  const userAuthenticated = !!token;
  const driverAuthenticated = !!drivertoken;

  return (
    <>
      <Routes>
        <Route path="/signup" element={userAuthenticated ? (<Navigate to="/main" />) : driverAuthenticated ? (<Navigate to="/driver-main" />) : (<SignupPage />)} />
        <Route path="/login" element={userAuthenticated ? (<Navigate to="/main" />) : driverAuthenticated ? (<Navigate to="/driver-main" />) : (<LoginPage />)} />
        <Route path="/" element={userAuthenticated ? (<Navigate to="/main" />) : driverAuthenticated ? (<Navigate to="/driver-main" />) : (<HeroPage />)} />


        <Route path="/main" element={userAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={userAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route
          path="/logout"
          element={
            userAuthenticated || driverAuthenticated
              ? <LogoutPage />
              : <Navigate to="/login" />
          }
        />        <Route path="/driver-main" element={driverAuthenticated ? <DriverHome /> : <Navigate to="/login" />} />
        <Route path="*" element={<Error404 />} />
        {/* <Route path="/notes" element={authenticated ? <Notes /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authenticated ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/confession" element={authenticated ? <Confession /> : <Navigate to="/login" />} />
        <Route path="/poll" element={authenticated ? <Poll /> : <Navigate to="/login" />} />
        <Route path="/notification" element={authenticated ? <Notification /> : <Navigate to="/login" />} />
        <Route path="/assignment" element={authenticated ? <Assignment /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/setting" element={authenticated ? <Setting /> : <Navigate to="/login" />} /> */}

      </Routes>
      <Toaster position="top-right" />
      {/* <Toaster position="top-right" /> */}
      <div className="hidden lg:block">
        <Footer />
      </div>

    </>
  )
}

export default App;
