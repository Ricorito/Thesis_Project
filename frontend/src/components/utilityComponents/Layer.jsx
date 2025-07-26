import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import Note from "./Note";

import { Toaster } from "@/components/ui/toaster";  

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* <Note /> */}
      <Outlet />
      <Chatbot />
      <Footer />
      <Toaster />
    </>
  );
};

export default Layout;
