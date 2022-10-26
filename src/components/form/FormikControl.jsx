import React from "react";
import Ckeditor from "./CkEditor";
import Date from "./Date";
import File from "./File";
import Input from "./Input";
import MultiSelect from "./multiSelect";
import SearchableSelect from "./searchableSelect";
import Select from "./Select";
import Switch from "./Switch";
import Textarea from "./Textarea";

const FormikControl = (props) => {
  switch (props.control) {
    case "select":
      return <Select {...props} />;
    case "multiSelect":
      return <MultiSelect {...props} />;
    case "searchAbleSelect":
      return <SearchableSelect {...props} />;
    case "input":
      return <Input {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "ckeditor":
      return <Ckeditor {...props} />;
    case "file":
      return <File {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "date":
      return <Date {...props} />;
    default:
      return null;
  }
};

export default FormikControl;
