import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8 text-center sm:px-4">
        <div>
          <h3 className="text-3xl font-extrabold text-blue-400">Eventify</h3>
          <p className="text-sm mt-2 text-gray-300">
            Making event booking simple, fast, and fun.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-blue-400 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-400 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-400 transition duration-200"
          >
            Contact
          </Link>
        </div>

        <p className="text-xs text-gray-500 px-4 sm:px-0">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Eventify</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
