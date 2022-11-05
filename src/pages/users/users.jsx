import React from "react";
import useTitle from "../../hook/useTitle";
import AddUsers from "./AddUsers";
import UsersTable from "./usersTable";

const Users = () => {
  useTitle("کاربران");
  return (
    <>
      <div
        id="manage_user_section"
        className="manage_user_section main_section "
      >
        <h4 className="text-center my-3">مدیریت کاربران</h4>
        <UsersTable />
      </div>
    </>
  );
};

export default Users;
