import React from "react";
import useTitle from "../../hook/useTitle";
import AddCarts from "./AddCarts";
import CartsTabe from "./cartsTabe";

const Carts = () => {
  useTitle("مدیریت سبدها");
  return (
    <>
      <div
        id="manage_cart_section"
        className="manage_cart_section main_section "
      >
        <h4 className="text-center my-3">مدیریت سبد خرید</h4>
        <div className="row justify-content-between">
          <div className="col-10 col-md-6 col-lg-4">
            <div className="input-group mb-3 dir_ltr">
              <input
                type="text"
                className="form-control"
                placeholder="قسمتی از نام یا شماره سبد را وارد کنید"
              />
              <span className="input-group-text">جستجو</span>
            </div>
          </div>
          <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
            <AddCarts />
          </div>
        </div>
        <CartsTabe />
      </div>
    </>
  );
};

export default Carts;
