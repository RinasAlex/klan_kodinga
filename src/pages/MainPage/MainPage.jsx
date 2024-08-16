import React from "react";
import "./MainPage.scss";
import Categories from "@/components/Categories/Categories";
import Banner from "@/components/Header/Banner";
import HomeDiscount from "../../components/HomeDiscount/HomeDiscount";

const MainPage = () => {
  return (
    <>
      <Banner />
      <Categories />
      <HomeDiscount />
    </>
  );
};

export default MainPage;
