import React from "react";
import DiscountsTable from "./discountsTable";

const Discounts = () => {
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
