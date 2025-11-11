import React, { useContext } from "react";
import { LineChart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Header = ({ setShowModal, setIsRegister }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) navigate("/dashboard");
    else navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    // ensure modal state is reset if open
    setTimeout(() => {
      window.location.href = "/";
    }, 200);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo and Title */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg shadow-sm">
            <LineChart className="w-5 h-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Stock Prediction Portal
          </h1>
        </a>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setIsRegister(false);
                  setShowModal(true);
                }}
                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsRegister(true);
                  setShowModal(true);
                }}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-all duration-200"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-700 text-sm font-medium mr-2">
                Hi, {localStorage.getItem("username")}
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm transition-all duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
