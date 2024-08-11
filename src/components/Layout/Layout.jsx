import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
