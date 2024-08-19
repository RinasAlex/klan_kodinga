import React from "react";
import "./MainPage.scss";
import Categories from "@/components/Categories/Categories";
import Banner from "@/components/Header/Banner";
import RandomSale from "../../components/RandomSale/RandomSale";

const MainPage = () => {
  return (
    <>
      <Banner />
      <Categories />
      <RandomSale />
    </>
  );
};

export default MainPage;
