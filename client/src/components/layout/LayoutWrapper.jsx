import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./header";
import Footer from "./footer";

const LayoutWrapper = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    
    </>
  );
};

export default LayoutWrapper;
