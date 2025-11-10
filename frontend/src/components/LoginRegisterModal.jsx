import React, { useState } from "react";

const LoginRegisterModal = ({ showModal, setShowModal }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert(isRegister ? "Registration Successful!" : "Login Successful!");
      setEmail("");
      setPassword("");
      setShowModal(false);
      setTouched({});
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
    >
      {/* Modal Card */}
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

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
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

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
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
            className="mt-2 py-2.5 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle Mode */}
        <p className="text-gray-600 text-center mt-5 text-sm">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setErrors({});
              setTouched({});
            }}
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
