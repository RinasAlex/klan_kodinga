import React from "react";
import "./MainPage.scss";
import Categories from "@/components/Categories/Categories";
import Banner from '@/components/Header/Banner'

const MainPage = () => {
  return (
    <>
    <Banner/>
    <Categories />
    </>
  )
}

export default MainPage;
