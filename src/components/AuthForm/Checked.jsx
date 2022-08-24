import React from "react";
import { FastField, Form, Formik } from "formik";

const Checked = ({ name, label }) => {
  return (
    <>
      <div className="form-check">
        <FastField className="form-check-input" type="checkbox" name={name} />
        <label className="form-check-label">{label}</label>
      </div>
    </>
  );
};

export default Checked;
