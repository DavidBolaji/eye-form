import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../Components/HeaderComponent";
import FooterComponent from "../Components/FooterComponent";

const RootPage = ({ children }) => {
  return (
    <div className="h-screen">
      <header>
        <HeaderComponent />
      </header>
      <main className="mb-0">
        {/* <ScrollToTopOnNavigation /> */}
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default RootPage;
