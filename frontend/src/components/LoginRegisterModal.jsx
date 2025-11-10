import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const LoginRegisterModal = ({
  showModal,
  setShowModal,
  isRegister,
  setIsRegister,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // 🧠 Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (isRegister) {
      if (!email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(email))
        newErrors.email = "Enter a valid email";
    }
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ⚡ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      if (isRegister) {
        // Register first
        await api.post("register/", { username, email, password });
        setMessage("Registration successful! Logging you in...");
      }

      // 🔑 Login using username & password only
      const response = await api.post("token/", { username, password });

      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("username", username);

        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          setShowModal(false);
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Auth error:", error);
      if (error.response) {
        setMessage(
          error.response.data.detail ||
            "Authentication failed. Check credentials."
        );
      } else {
        setMessage("Network error — check backend connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 w-[90%] max-w-md relative animate-fadeIn border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl font-light"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Message */}
        {message && (
          <p
            className={`text-center mb-3 ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, username: true }))}
              className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.username && errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {touched.username && errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email (only for register) */}
          {isRegister && (
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.email && errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300"
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.password && errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2.5 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-gray-600 text-center mt-5 text-sm">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
