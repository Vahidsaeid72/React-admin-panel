import React, { useEffect, useState } from "react";
import ModalsContainer from "../../components/modalsContainer";
import { Formik, Form, FastField } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import SubmitButton from "../../components/form/SubmitButton";
import FormikControl from "../../components/form/FormikControl";

const AddColor = ({ setData, colorToEdit, setColorToEdit }) => {
  const [reInitialValues, setReInitialValues] = useState(null);
  const [colorPickerValue, setColorPickerValue] = useState("#000");

  useEffect(() => {
    if (colorToEdit) {
      setColorPickerValue(colorToEdit.code);
      setReInitialValues({ title: colorToEdit.title, code: colorToEdit.code });
    } else {
      setReInitialValues(null);
    }
  }, [colorToEdit]);

  const handleChangeColorCodeField = (e, form) => {
    setColorPickerValue(e.target.value);
    form.setFieldValue("code", e.target.value);
  };
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_color_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        id="add_color_modal"
        fullscreen={false}
        title={colorToEdit ? "ویرایش رنگ" : "افزودن رنگ جدید"}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitialValues || initialValues}
              onSubmit={(values, actions) =>
                onSubmit(values, actions, setData, colorToEdit, setColorToEdit)
              }
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان "
                  placeholder="عنوان رنگ را وارد کنید"
                />
                <FastField>
                  {({ form }) => {
                    return (
                      <div className="col-12 d-flex align-items-center justify-content-start">
                        <label
                          htmlFor="exampleColorInput"
                          className="form-label m-0"
                        >
                          انتخاب رنگ
                        </label>
                        <input
                          type="color"
                          className="form-control form-control-color mx-3"
                          id="code"
                          name="code"
                          title="انتخاب رنگ"
                          value={colorPickerValue}
                          onChange={(e) => handleChangeColorCodeField(e, form)}
                        />
                      </div>
                    );
                  }}
                </FastField>
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmitButton />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </ModalsContainer>
    </>
  );
};

export default AddColor;
