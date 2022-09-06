import React, { useContext } from "react";
import { AdminContext } from "../../../context/adminLayoutContext";

const RightContent = () => {
  const { setShowSidebar } = useContext(AdminContext);

  return (
    <div className="right_content h-100 py-1 bg-dark ">
      <div className="navbar-brand h-100 w-100">
        <img src="/assets/images/logo.png" className="h-75 " alt="" />
      </div>
      <div className="form-check form-switch mx-4 d-none d-md-block">
        <input
          id="handle_toggle_sidemenu"
          className="form-check-input pointer"
          type="checkbox"
          onChange={(e) => setShowSidebar(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default RightContent;
