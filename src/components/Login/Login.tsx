// Login.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import image from "../../assets/Image/login-image.png";
import logo from "../../assets/logo/gv-logo.png";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import Modal from "../../layouts/Modal";
import OtpModal from "./OTP";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleStayLoggedInChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStayLoggedIn(e.target.checked);

  const validateForm = (): boolean => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN_TEST, {
        email,
        password,
      });
      if (response && response.status === 200 && response.data) {
        // OTP verification
        setOpenOtpModal(true);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  const handleOtpVerified = (token: string) => {
    login(token, stayLoggedIn);
    navigate("/home");
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen">
      <div className="w-full lg:w-1/2 relative">
        <img
          src={image}
          className="h-64 lg:h-full w-full object-cover"
          alt="Background"
        />
        <div className="absolute top-20 lg:top-40 left-10 lg:left-56 w-[80%] lg:w-[50%]">
          <p
            className="text-white text-lg lg:text-2xl font-medium"
            style={{ lineHeight: "1.5" }}
          >
            Seamless Revenue Management & Payment Processing for YouTube & Music
          </p>
          <div className="flex gap-4 mt-2 lg:mt-5">
            <div className="bg-white rounded-full w-[30%] lg:w-[18%] h-2"></div>
            <div className="bg-white rounded-full w-[10%] lg:w-[5%] h-2"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 bg-white gap-10 lg:gap-10">
        <div className="flex justify-center lg:justify-end p-4 lg:p-8">
          <img src={logo} alt="Gallery Vision Logo" className="w-24 lg:w-32" />
        </div>

        <div className="flex flex-col justify-center px-8 lg:px-36">
          <p className="text-1xl lg:text-2xl font-bold mb-4 lg:mb-8">Login</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email-address"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="name@email.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="stay-logged-in"
                  name="stay-logged-in"
                  type="checkbox"
                  className="bg-white h-[1%] w-[1%]  border-white"
                  checked={stayLoggedIn}
                  onChange={handleStayLoggedInChange}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 font-semibold text-sm mt-2">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex text-[13px] mt-28 font-normal ml-28">
            <p className="pr-1" >Developed by Cygnoz</p>
            <img src="/public/cygnozLog.png" alt="" className="w-[15px] h-[20px]"  />
            <p>_Release Version 1.0 _25th July 2024 </p>
          </div>
        </div>
      </div>

      <Modal onClose={() => setOpenOtpModal(false)} open={openOtpModal}>
        <OtpModal
          onClose={() => setOpenOtpModal(false)}
          email={email}
          onOtpVerified={handleOtpVerified}
        />
      </Modal>
    </div>
  );
};

export default Login;
