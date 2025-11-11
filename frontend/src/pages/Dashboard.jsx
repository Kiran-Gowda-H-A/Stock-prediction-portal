import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../components/AuthProvider";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProtectedData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("protected-view/");
      if (response.status === 200) {
        setMessage(response.data.message || "Welcome to your Dashboard 🎉");
      }
    } catch (err) {
      console.error("Protected route error:", err);
      if (err.response && err.response.status === 401) {
        // Unauthorized – log out and redirect home
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        navigate("/");
      } else if (err.request) {
        setError("Backend not reachable. Please make sure it's running.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 text-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p className="mb-6">{error}</p>
        <button
          onClick={fetchProtectedData}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          🔁 Reconnect
        </button>
      </div>
    );
  }

  // Success message
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">{message}</h1>
      <p className="text-lg text-gray-600">You’re successfully authenticated.</p>
    </div>
  );
};

export default Dashboard;
