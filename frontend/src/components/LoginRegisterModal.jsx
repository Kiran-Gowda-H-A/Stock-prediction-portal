import React, { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "./AuthProvider";

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
  const [redirecting, setRedirecting] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  useEffect(() => {
      // Close modal automatically if logged out (safety cleanup)
      if (!isLoggedIn) {
        setShowModal(false);
      }
    }, [isLoggedIn, setShowModal]);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      if (isRegister) {
        await api.post("register/", { username, email, password });
        setMessage("Registration successful! Logging you in...");
      }

      const response = await api.post("token/", { username, password });

      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("username", username);

        setMessage("Login successful! Redirecting...");
        setRedirecting(true);

        // wait 1.5 seconds before redirecting
        setTimeout(() => {
          setShowModal(false);
          setIsLoggedIn(true);
          navigate("/dashboard");
        }, 1500);
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
      onClick={() => !loading && !redirecting && setShowModal(false)}
    >
      <div
        className={`bg-white text-gray-900 rounded-2xl shadow-xl p-8 w-[90%] max-w-md relative border border-gray-200 ${
          redirecting ? "opacity-70 pointer-events-none" : "animate-fadeIn"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {!redirecting && (
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        )}

        {/* Title */}
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

        {/* Show spinner while redirecting */}
        {redirecting ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Redirecting...</p>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, username: true }))}
                disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
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

            {/* Submit */}
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
        )}

        {/* Toggle */}
        {!redirecting && (
          <p className="text-gray-600 text-center mt-5 text-sm">
            {isRegister
              ? "Already have an account?"
              : "Don’t have an account?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              disabled={loading}
              className="text-blue-600 hover:underline font-medium"
            >
              {isRegister ? "Login here" : "Register here"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};


export default LoginRegisterModal;
