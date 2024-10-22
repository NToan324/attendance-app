import React from "react";
import "../index.css";
export const Layout = ({ children }) => {
  return (
    <div className="w-screen overflow-hidden bg-gray flex justify-center content-center">
      {children}
    </div>
  );
};