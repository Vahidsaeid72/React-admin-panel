import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AdminContext } from "../context/adminLayoutContext";
import Logout from "./Auth/Logout";
import Brands from "./brands/Brands";
import Carts from "./carts/carts";
import Attributes from "./category/attrs/Attributes";
import Category from "./category/Category";
import CategoryChildren from "./category/CategoryChildren";
import Colors from "./colors/colors";
import Comments from "./comments/comments";
import Dashboard from "./dashboard/Dashboard";
import Deliverys from "./deliverys/deliverys";
import AddDiscounts from "./discounts/AddDiscounts";
import Discounts from "./discounts/discounts";
import Guarantes from "./guarantee/guarantes";
import Orders from "./orders/orders";
import Permissions from "./permissions/permissions";
import AddProduct from "./Product/AddProduct";
import ProductGallery from "./Product/gallery/ProductGallery";
import Product from "./Product/Product";
import SetAttributes from "./Product/setAttr/SetAttributes";
import Questions from "./questions/questions";
import Roles from "./roles/roles";
import Users from "./users/users";

const Content = () => {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Category" element={<Category />}>
          <Route path=":CategoryId" element={<CategoryChildren />} />
        </Route>
        <Route
          path="/Category/:CategoryId/attributes"
          element={<Attributes />}
        />
        <Route path="/Product" element={<Product />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/products/set-attr" element={<SetAttributes />} />
        <Route path="/products/gallery" element={<ProductGallery />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/Guarantes" element={<Guarantes />} />
        <Route path="/Brands" element={<Brands />} />
        <Route path="/Discounts" element={<Discounts />} >
          <Route path="/Discounts/add-discount-code" element={<AddDiscounts />} >
            <Route path=":discountId" />
          </Route>
        </Route>
        <Route path="/Carts" element={<Carts />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Deliverys" element={<Deliverys />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/Comments" element={<Comments />} />
        <Route path="/Permissions" element={<Permissions />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </section>
  );
};

export default Content;
