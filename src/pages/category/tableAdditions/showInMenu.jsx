import React from "react";

const ShowInMenu = ({ rowData }) => {
  return (
    <>
      <span className={!rowData.showInMenu ? "text-success" : "text-danger"}>
        {!rowData.showInMenu ? "هست" : "نیست"}
      </span>
    </>
  );
};

export default ShowInMenu;
