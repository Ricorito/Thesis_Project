import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./css/index.css";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { UserProvider } from "./contexts/userContext.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider> 
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);