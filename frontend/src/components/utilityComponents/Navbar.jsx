import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";
import logoWhite from "/assets/logoWhite.png";
import { AuthContext } from "../../contexts/authContext";
import "../../css/index.css";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ transparent = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const menuLinks = {
    Home: "/",
    Meditation: "/meditation",
    Learning: "/learn",
    Journal: "/journal",
    Articles: "/articles",
    Community: "/community",
  };

  const navWrapperClasses = transparent
    ? "w-full sticky top-0 z-30 bg-transparent shadow-none text-white"
    : "w-full sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-md text-gray-700";

  const linkBase =
    "relative text-sm font-semibold transition after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full";
  const linkColor = transparent
    ? "text-white hover:text-indigo-300 after:bg-indigo-300"
    : "text-gray-600 hover:text-indigo-700 after:bg-indigo-700";

  return (
    <>
      {/* Desktop Navbar */}
      <div className={navWrapperClasses}>
        <div className="hidden xl:flex items-center justify-between pb-6 px-10 py-3 relative">
          <div className="w-36" />
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 scale-100 hover:scale-125 transition duration-300 p-1"
          >
            <img
              src={transparent ? logoWhite : logo}
              alt="logo"
              className="w-36"
            />
          </Link>
          {currentUser ? (
            <span
              onClick={handleLogout} // This is the span that calls handleLogout
              className={`cursor-pointer text-sm font-medium transition ${
                transparent
                  ? "text-white hover:text-indigo-300"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Logout
            </span>
          ) : (
            <Link
              className={`link text-sm font-medium transition ${
                transparent
                  ? "text-white hover:text-indigo-300"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              to="/authpage"
            >
              Login
            </Link>
          )}
        </div>

        {/* Menu Items - Desktop */}
        <div
          className={`hidden xl:flex justify-center font-jakarta gap-10 py-2 border-t ${
            transparent ? "border-white/20" : "border-gray-200"
          } ${
            transparent
              ? "bg-transparent"
              : "bg-gradient-to-r from-blue-50 via-white to-purple-50"
          }`}
        >
          {currentUser === null ? (
            <Link to="/" className={`${linkBase} ${linkColor}`}>
              Home
            </Link>
          ) : (
            <AnimatePresence>
              {Object.entries(menuLinks).map(([label, path], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={path} className={`${linkBase} ${linkColor}`}>
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.3,
                  delay: Object.keys(menuLinks).length * 0.05,
                }}
              >
                <Link to="/profile" className={`${linkBase} ${linkColor}`}>
                  Profile
                </Link>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`xl:hidden w-full sticky top-0 z-40 transition-colors duration-300 ${
          isMenuOpen
            ? "bg-white shadow-md"
            : transparent
            ? "bg-transparent shadow-none"
            : "bg-white/80 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/">
            <img
              src={transparent && !isMenuOpen ? logoWhite : logo}
              alt="logo"
              className="w-32 hover:scale-105 transition-transform"
            />
          </Link>
          <button
            className={`text-3xl ${
              isMenuOpen
                ? "text-gray-800"
                : transparent
                ? "text-white"
                : "text-gray-800"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className="bx bx-menu"></i>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-white shadow-xl"
            >
              <div className="flex flex-col h-full px-6 pt-8 pb-12">
                <div className="mb-10 text-center">
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    <img src={logo} alt="logo" className="w-36 mx-auto" />
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-7 right-6 text-3xl text-gray-700 hover:text-gray-900"
                    aria-label="Close menu"
                  >
                    <i className="bx bx-x"></i>
                  </button>
                </div>

                <ul className="flex flex-col gap-6 text-center">
                  {currentUser === null ? (
                    <>
                      <li>
                        <Link
                          to="/"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-base text-gray-800 font-medium hover:text-indigo-700 transition"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/authpage"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-base text-gray-800 font-medium hover:text-indigo-700 transition"
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      {Object.entries(menuLinks).map(([label, path]) => (
                        <li key={label}>
                          <Link
                            to={path}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-base text-gray-800 font-medium hover:text-indigo-700 transition"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-base text-gray-800 font-medium hover:text-indigo-700 transition"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <span
                          onClick={() => {
                            handleLogout(); // Still calls handleLogout
                            setIsMenuOpen(false);
                          }}
                          className="cursor-pointer block text-base text-gray-800 font-medium hover:text-indigo-700 transition"
                        >
                          Logout
                        </span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="mt-auto text-center pt-12 text-xs text-gray-400">
                  © {new Date().getFullYear()} All rights reserved · Martin
                  Germán · Thesis Project
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;