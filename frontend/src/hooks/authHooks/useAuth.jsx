import { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom"

import axios from "axios";
import { AuthContext } from "../../contexts/authContext";

const isDev = import.meta.env.VITE_ENV === "development";
const API_BASE_URL = isDev
  ? import.meta.env.VITE_API_LOCAL
  : import.meta.env.VITE_API_PROD;

function useAuth() {
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { login, setUserFromGoogle } = useContext(AuthContext);

  useEffect(() => {
  const token = searchParams.get("token");
  if (!token) return;

  const verifyEmail = async () => {
    try {
        await axios.get(`${API_BASE_URL}/api/auth/verify?token=${token}`);
      setSuccessMessage("Email verification successful!");
    } catch (err) {
      console.error("Verification failed:", err);
      setErrors({
        general: (
          <span className="text-red-600 text-sm font-bold">
            Verification failed. Please try again.
          </span>
        ),
      });
    } finally {
      navigate("/authpage");
    }
  };

  verifyEmail();
}, [searchParams, navigate]);

  
  const resetForm = () => {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setRepassword("");
    setBirthday("");
    setErrors({});
    setSuccessMessage("");
  };

  const togglePage = () => {
    resetForm();
    setIsRegisterPage(!isRegisterPage);
  };

  const handleGoogleLogin = async (code) => {
    try {
       const res = await axios.post(
        `${API_BASE_URL}/api/auth/google`,
        { code },
        { withCredentials: true }
      );

      const user = res.data.user;

      setUserFromGoogle(user);

      setSuccessMessage("Google login successful, redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Google login error:", err);
      setErrors({
        general: (
          <span className="text-red-600 text-sm font-bold">
            Google login failed. Please try again.
          </span>
        ),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

  const endpoint = isRegisterPage
      ? `${API_BASE_URL}/api/auth/register`
      : `${API_BASE_URL}/api/auth/login`;

  const dataToSend = isRegisterPage
  ? { name, email, username, password, birthday }
  : { username, password };

    if (isRegisterPage && password !== repassword) {
      setErrors({ repassword: "Passwords do not match!" });
      return;
    }

    try {
      const res = await axios.post(endpoint, dataToSend, {
        withCredentials: true,
      });
      console.log("Successful response:", res);
      await login(dataToSend);

      if (isRegisterPage) {
        resetForm();
        setIsRegisterPage(false);
        setSuccessMessage(
          "Registration successful! Please check your email to verify your account before logging in."
        );
      } else {
        await login(dataToSend);
        setUsername("");
        setPassword("");
        setSuccessMessage(
          "Login successful, redirecting to homepage shortly..."
        );
        setTimeout(() => {
          navigate("/");
        }, 1800);
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          backendErrors[error.path] = error.msg;
        });
        setErrors(backendErrors);
      } else if (err.response?.data) {
        setErrors({
          general: (
            <span className="text-red-600 text-sm font-bold">
              {err.response.data}
            </span>
          ),
        });
      } else if (err.message) {
        setErrors({
          general: (
            <span className="text-red-600 text-sm font-bold">
              {err.message}
            </span>
          ),
        });
      } else {
        setErrors({
          general: (
            <span className="text-red-600 text-sm font-bold">
              An unexpected error occurred.
            </span>
          ),
        });
      }
    }
  };

  return {
    isRegisterPage,
    togglePage,
    handleGoogleLogin,
    handleSubmit,
    formData: { name, email, username, password, repassword, birthday  },
    setFormData: { setName, setEmail, setUsername, setPassword, setRepassword, setBirthday  },
    errors,
    successMessage,
  };
}

export default useAuth;
