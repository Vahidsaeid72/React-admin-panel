import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormikError from "./FormikError";
import { ErrorMessage, Field } from "formik";

const Ckeditor = ({ name, label, className, placeholder }) => {
  return (
    <Field>
      {({ form }) => {
        return (
          <div className={`d-flex col-12 ${className} mb-3`}>
            <div className="label-description col-xl-2 col-md-3 col-sm-4 d-flex justify-content-center align-items-center rounded-1">
              {label}
            </div>
            <div className="col-xl-10 col-md-9 col-sm-8">
              <CKEditor
                editor={ClassicEditor}
                //   || `<p>${label} : ${placeholder}</p>`
                data={form.values[name]}
                // config={
                //     {
                //         ckfinder:{
                //             uploadUrl: "http://127.0.0.1:8000/api/upload"
                //         }
                //     }
                // }
                onReady={(editor) => {
                  console.log("ready");
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  form.setFieldValue(name, data);
                }}
                onBlur={(event, editor) => {
                  form.setFieldTouched(name);
                }}
                //   onFocus={(event, editor) =>
                //     !editor.getData() == `<p>${label} : ${placeholder}</p>`
                //       ? editor.setData("")
                //       : null
                //   }
              />
            </div>
            <div className="mt-2">
              <ErrorMessage name={name} component={FormikError} />
            </div>
          </div>
        );
      }}
    </Field>
  );
};

export default Ckeditor;
