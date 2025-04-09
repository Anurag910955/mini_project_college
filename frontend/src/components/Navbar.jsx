import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-3xl font-extrabold text-blue-700 tracking-tight">
          <Link to="/" className="hover:underline underline-offset-4">Eventify</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop & Mobile Menu */}
        <ul
          className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-gray-800 font-medium text-lg absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <li>
            <Link to="/" className="hover:text-blue-600 transition duration-200" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 transition duration-200" onClick={() => setIsMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 transition duration-200" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/admin-login" className="hover:text-blue-600 transition duration-200" onClick={() => setIsMenuOpen(false)}>Admin</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/booking" className="hover:text-blue-600 transition duration-200" onClick={() => setIsMenuOpen(false)}>
                  Bookings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 hover:from-red-600 hover:to-red-700 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-blue-600 border border-blue-500 px-4 py-2 rounded-lg hover:bg-yellow-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-100 to-blue-100 text-white px-4 py-2 rounded-lg shadow hover:scale-105 hover:from-yellow-100 hover:to-yellow-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
