import React, { useEffect, useState } from "react";
import ModalsContainer from "../../components/modalsContainer";
import { Formik, Form } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../components/form/FormikControl";
import SubmitButton from "../../components/form/SubmitButton";

const AddGuarantes = ({ setData, guarantesToEdit, setGuarantesToEdit }) => {
  const [reInitialValues, setReInitialValues] = useState(null);

  useEffect(() => {
    if (guarantesToEdit) {
      setReInitialValues({
        title: guarantesToEdit.title,
        descriptions: guarantesToEdit.descriptions || "",
        length: guarantesToEdit.length || "",
        length_unit: guarantesToEdit.length_unit || "",
      });
    } else {
      setReInitialValues(null);
    }
  }, [guarantesToEdit]);

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_guarantee_modal"
        onClick={() => setGuarantesToEdit(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>

      <ModalsContainer
        id="add_guarantee_modal"
        fullscreen={false}
        title={guarantesToEdit ? "ویرایش گارانتی" : "افزودن گارانتی"}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitialValues || initialValues}
              onSubmit={(values, actions) =>
                onSubmit(
                  values,
                  actions,
                  setData,
                  guarantesToEdit,
                  setGuarantesToEdit
                )
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
                  placeholder="عنوان گارانتی را وارد کنید"
                />
                <FormikControl
                  control="textarea"
                  type="text"
                  name="descriptions"
                  label="توضیحات "
                  placeholder="توضیحات گارانتی را وارد کنید"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="length"
                  label="مدت گارانتی"
                  placeholder="به ماه"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="length_unit"
                  label="واحد"
                />

                <div className="btn_box  col-12 col-md-6 col-lg-8 mt-4">
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

export default AddGuarantes;
