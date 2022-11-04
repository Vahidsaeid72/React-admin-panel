import React from "react";
import useTitle from "../../hook/useTitle";
import PermissionsTable from "./PermissionsTable";

const Permissions = () => {
  useTitle("مجوزها");
  return (
    <>
      <div
        id="manage_permission_section"
        className="manage_permission_section main_section"
      >
        <h4 className="text-center my-3">مدیریت مجوز ها</h4>
        <PermissionsTable />
      </div>
    </>
  );
};

export default Permissions;
