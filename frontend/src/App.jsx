import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginRegisterModal from "./components/LoginRegisterModal";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[#F9FAFB]">
        <Header setShowModal={setShowModal} setIsRegister={setIsRegister} />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<Home setShowModal={setShowModal} setIsRegister={setIsRegister} />}
            />
            <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <Footer />

        <LoginRegisterModal
          showModal={showModal}
          setShowModal={setShowModal}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
        />
      </div>
    </AuthProvider>
    </>
  );
};

export default App;
