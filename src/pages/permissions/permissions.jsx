import React from "react";
import PermissionsTable from "./PermissionsTable";

const Permissions = () => {
  return (
    <>
      <div
        id="manage_permission_section"
        class="manage_permission_section main_section"
      >
        <h4 class="text-center my-3">مدیریت مجوز ها</h4>
        <div class="row justify-content-between">
          <div class="col-10 col-md-6 col-lg-4">
            <div class="input-group mb-3 dir_ltr">
              <input
                type="text"
                class="form-control"
                placeholder="قسمتی از نام مجوز را وارد کنید"
              />
              <span class="input-group-text">جستجو</span>
            </div>
          </div>
        </div>
        <PermissionsTable />
      </div>
    </>
  );
};

export default Permissions;
