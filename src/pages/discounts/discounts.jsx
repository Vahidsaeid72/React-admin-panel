import React from "react";
import useTitle from "../../hook/useTitle";
import DiscountsTable from "./discountsTable";

const Discounts = () => {
  useTitle("تخفیف ها");
  return (
    <>
      <div
        className="manage_discount_section main_section"
      >
        <h4 className="text-center my-3">مدیریت کد های تخفیف</h4>

        <DiscountsTable />
      </div>
    </>
  );
};

export default Discounts;
