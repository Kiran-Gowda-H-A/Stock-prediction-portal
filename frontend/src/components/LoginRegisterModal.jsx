import React, { useState } from "react";
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

  const validateForm = () => {
    const newErrors = {};
    if (isRegister && !username.trim())
      newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const endpoint = isRegister ? "register/" : "login/"; // adjust login endpoint if different
      const payload = isRegister
        ? { username, email, password }
        : { email, password };

      const response = await api.post(endpoint, payload);

      if (response.status === 201 || response.status === 200) {
        setMessage(
          isRegister
            ? "Registration successful! You can now log in."
            : "Login successful!"
        );

        // optional: store JWT token if backend sends it
        if (response.data.access) {
          localStorage.setItem("token", response.data.access);
        }

        // clear form + close after short delay
        setTimeout(() => setShowModal(false), 1500);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        // Django sent back an error
        setMessage(
          error.response.data.detail ||
            "Error: " + JSON.stringify(error.response.data)
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
        {/* Close Button */}
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

        {/* Success / Error Message */}
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
          {isRegister && (
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
          )}

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
