import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./Components/HomeComponent";
import Footer from "./Components/Footer/Footer";
import AboutUsPage from "./Components/Pages/AboutUsPage";
import ContactUsPage from "./Components/Pages/ContactUsPage";
import UserLogin from "./Components/User/UserLogin";
import UserRegister from "./Components/User/UserRegister";
import SuperAdminLogin from "./Components/SuperAdmin/SuperAdminLogin";
import SuperAdminRegister from "./Components/SuperAdmin/SuperAdminRegister";
import AdminLogin from "./Components/HotelAdmin/AdminLogin";
import AdminRegister from "./Components/HotelAdmin/AdminRegister";
import AdminComponent from "./Components/HotelAdmin/AdminComponent";
import HotelPage from "./Components/Pages/HotelPage";
import SuperAdminLoginPage from "./Components/SuperAdmin/SuperAdminPage";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleLogin(value) {
    setIsLoggedIn(value);
  }
  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes className="routes-div">
          <Route path="/" element={<HomeComponent />} />
          <Route path="/aboutus" element={<AboutUsPage />}></Route>
          <Route path="/contactus" element={<ContactUsPage />}></Route>
          <Route
            path="/userlogin"
            element={<UserLogin setLogin={handleLogin} />}
          ></Route>
          <Route path="/userregister" element={<UserRegister />}></Route>
          <Route
            path="/adminlogin"
            element={<AdminLogin setLogin={handleLogin} />}
          ></Route>
          <Route path="/adminregister" element={<AdminRegister />}></Route>
          <Route path="/adminpage" element={<AdminComponent />}></Route>
          <Route path="/hotelpage" element={<HotelPage />}></Route>
        </Routes>
        <Footer className="footer" />
      </BrowserRouter>
    </>
  );
}
