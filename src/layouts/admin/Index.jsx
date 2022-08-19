import React, { useContext, useEffect } from "react";
import AdminContextContainer, {
  AdminContext,
} from "../../context/adminLayoutContext";
import Category from "../../pages/category/Category";
import Content from "../../pages/Content";
import Navbar from "./Navbar/Index";
import Sidebar from "./sidebar/Index";

const Index = () => {
  return (
    <AdminContextContainer>
      <div>
        <Content />
        <Navbar />
        <Sidebar />
      </div>
    </AdminContextContainer>
  );
};

export default Index;
