import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const updateUser = (userData) => {
        setUser(userData);
        setIsLoggedIn(!!userData); 
    };

    const clearUser = () => {
        setUser(null);
        setIsLoggedIn(false);
    };
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);