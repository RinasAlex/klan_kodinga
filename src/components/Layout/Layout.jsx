import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Banner from "@/components/Header/Banner";

const Layout = () => {
  return (
    <>
          <Header />
          <Banner/>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
