import React from "react";
import Logo from "@/components/Logo";

function LogoPage() {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Logo/>
    </div>
  );
}

export default LogoPage;