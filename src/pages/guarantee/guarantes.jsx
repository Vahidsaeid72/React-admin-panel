import React from "react";
import useTitle from "../../hook/useTitle";
import GuarantesTable from "./guarantesTable";

const Guarantes = () => {
  useTitle(" گارانتی ها");
  return (
    <>
      <div
        id="manage_guarantee_section"
        className="manage_guarantee_section main_section"
      >
        <h4 className="text-center my-3">مدیریت گارانتی ها</h4>
        <GuarantesTable />
      </div>
    </>
  );
};

export default Guarantes;
