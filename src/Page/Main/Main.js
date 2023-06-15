import React from "react";
import Navbar from "../../components/navbar-components/Navbar";
import Sidebar from "../../components/sidebar-components/Sidebar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Main;
