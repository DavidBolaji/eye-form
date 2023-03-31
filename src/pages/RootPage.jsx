import { FooterComponent } from "flowbite-react";
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../Components/HeaderComponent";
import ScrollToTopOnNavigation from "../Components/ScrollToTopOnNavigation";
// import { useScrollRestoration } from "react-router-dom";

const RootPage = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main>
        <ScrollToTopOnNavigation />
        <Outlet />
      </main>
      {/* <FooterComponent /> */}
    </>
  );
};

export default RootPage;
