import React from "react";
import Checked from "./Checked";
import Input from "./Input";

const AuthFormikControl = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "Checked":
      return <Checked {...props} />;
    default:
      return null;
  }
};

export default AuthFormikControl;
