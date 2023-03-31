import { FooterComponent } from "flowbite-react";
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../Components/HeaderComponent";

const RootPage = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      {/* <FooterComponent /> */}
    </>
  );
};

export default RootPage;
