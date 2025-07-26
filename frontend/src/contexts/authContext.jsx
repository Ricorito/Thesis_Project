import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./userContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { updateUser, clearUser } = useUser();

  const API_URL =
  import.meta.env.VITE_ENV === 'production'
    ? import.meta.env.VITE_API_PROD
    : import.meta.env.VITE_API_LOCAL;


 const fetchProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/users/profile`, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
    updateUser(res.data);
  } catch (error) {
    setCurrentUser(null);
    clearUser();
  }
};

const login = async (inputs) => {
  try {
    await axios.post(`${API_URL}/api/auth/login`, inputs, {
      withCredentials: true,
    });
    await fetchProfile();
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`, {}, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    setCurrentUser(null);
    clearUser();
  }
};


  const setUserFromGoogle = (user) => {
    setCurrentUser(user);
    updateUser(user);
  };

  useEffect(() => {
    const init = async () => {
      await fetchProfile();
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        setUserFromGoogle,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};