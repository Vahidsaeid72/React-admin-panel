import React from "react";
import CategoryContextContainer from "../../context/CategoryContext";
import useTitle from "../../hook/useTitle";
import CategoryTable from "./CategoryTable";

const Category = () => {
  useTitle("دسته بندی ها");
  return (
    <CategoryContextContainer>
      <div>
        <div
          id="manage_product_category"
          className="manage_product_category main_section"
        >
          <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>
          <CategoryTable />
        </div>
      </div>
    </CategoryContextContainer>
  );
};

export default Category;
