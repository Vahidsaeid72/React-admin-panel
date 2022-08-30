import React from "react";

const ShowInFilter = ({ rowData }) => {
  return (
    <>
      <span className={rowData.in_filter ? "text-success" : "text-danger"}>
        {rowData.showInMenu ? "نیست" : "هست"}
      </span>
    </>
  );
};

export default ShowInFilter;
