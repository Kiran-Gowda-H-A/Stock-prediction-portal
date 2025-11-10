import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginRegisterModal from "./components/LoginRegisterModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F9FAFB]">
      <Header setShowModal={setShowModal} setIsRegister={setIsRegister} />

      <main className="flex-grow">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={<Home setShowModal={setShowModal} setIsRegister={setIsRegister} />}
          />

          {/* Placeholder Dashboard (for future use) */}
          <Route
            path="/dashboard"
            element={
              <div className="flex items-center justify-center h-[80vh] text-gray-700 text-2xl font-semibold">
                Dashboard Page (coming soon)
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />

      {/* Global Modal */}
      <LoginRegisterModal
        showModal={showModal}
        setShowModal={setShowModal}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
      />
    </div>
  );
};

export default App;
