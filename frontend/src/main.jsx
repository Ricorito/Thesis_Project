import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./css/index.css";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

//Delete or comment this for localhost development.
//if (process.env.VITE_ENV === 'production') disableReactDevTools();

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