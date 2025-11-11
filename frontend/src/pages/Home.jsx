import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const Home = ({ setShowModal, setIsRegister }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      // If logged in, go straight to dashboard
      navigate("/dashboard");
    } else {
      // Reset any old modal states before opening
      setIsRegister(false);
      setShowModal(false);
      setTimeout(() => setShowModal(true), 100); // slight delay to prevent React race condition
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#EEF2FF] text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[30rem] h-[30rem] bg-indigo-200 rounded-full blur-[150px] opacity-40"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
          Smarter Stock Predictions with AI
        </h1>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
          Analyze market data, identify trends, and make informed decisions with
          real-time insights powered by advanced machine learning.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 text-lg font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started"}
          </button>
          <button className="px-8 py-3 text-lg font-semibold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
