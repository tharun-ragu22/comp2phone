import React from "react";
import Navbar from "../Navbar/Navbar";
const Layout: React.FC = ({ children }) => (
  <div>
    <Navbar />
    {children}
    {/* <GoToFilesButton /> */}
  </div>
);

export default Layout;