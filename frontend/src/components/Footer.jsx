import React from "react";
import { LineChart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-900 text-lg">
            Stock Prediction Portal
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/auth" className="hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link to="/auth" className="hover:text-blue-600 transition-colors">
            Register
          </Link>
          <a
            href="#about"
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            About
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Stock Prediction Portal. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
