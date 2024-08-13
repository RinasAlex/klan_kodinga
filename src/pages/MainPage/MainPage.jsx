import React from "react";
import "./MainPage.scss";
import Categories from "@/components/Categories/Categories";
import CategoryCard from "@/components/Categories/CategoryCard";

const MainPage = () => {
  return (
    <>
      <Categories />
      <CategoryCard />
    </>
  );
};

export default MainPage;
