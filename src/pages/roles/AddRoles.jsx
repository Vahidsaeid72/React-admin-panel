import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import FormikControl from "../../components/form/FormikControl";
import SubmitButton from "../../components/form/SubmitButton";
import ModalsContainer from "../../components/modalsContainer";
import SpinnerLoad from "../../components/spinnerLoad";
import { getAllpermissionsService } from "../../services/permissions";
import { getSingleRoleService } from "../../services/roles";
import { initialValues, onSubmit, validationSchema } from "./core";

const AddRoles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleIdToEdit = location.state?.roleIdToEdit;//id naghshi ke mikhahim edit konim
  const editType = location.state?.editType;//mikhaye naghsho edit koni ya dast resihasho
  const { setData } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [reInitialValues, setReInitialValues] = useState(null);


  const handleGetAllPermissions = async () => {
    setLoading(true);
    const res = await getAllpermissionsService();
    if (res.status == 200) {
      setPermissions(res.data.data.map(p => { return { id: p.id, title: p.description } }))
    }
    setLoading(false);
  }


  const handleGetRoleToEditData = async () => {
    setLoading(true);
    const res = await getSingleRoleService(roleIdToEdit);
    if (res.status == 200) {
      const role = res.data.data;
      setRoleToEdit(role);
      editType === "role" ? setReInitialValues({
        title: role.title,
        description: role.description
      }) : setReInitialValues({
        permissions_id: role.permissions.map(p => "" + p.id),
        editPermissions: true
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    editType !== "role" && handleGetAllPermissions(); //agar edit type man role bashe dige niyazi nist hame permition haro ham biyari az yek servis dige onja estefade mikonim
    roleIdToEdit && handleGetRoleToEditData();
  }, [])

  return (
    <>
      <ModalsContainer
        className="show d-block"
        id={"add_role_modal"}
        title={
          editType === "role" ? "ویرایش نقش :  " + roleToEdit?.title || "" :
            editType === "permissions" ? "ویرایش مجوز های دسترسی :  " + roleToEdit?.title || "" :
              "افزودن نقش جدید"
        }
        fullscreen={editType == 'role' ? false : true}
        closeFunction={() => navigate(-1)}
      >
        <div className="container">
          <Formik
            initialValues={reInitialValues || initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions, setData, roleIdToEdit, editType)}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form className="row justify-content-center">
              {editType != 'permissions' ? (
                <>
                  <FormikControl
                    className={editType === 'role' ? "" : "col-md-8"}
                    control="input"
                    type="text"
                    name="title"
                    label="عنوان نقش"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />
                  <FormikControl
                    className={editType === 'role' ? "" : "col-md-8"}
                    control="input"
                    type="Textarea"
                    name="description"
                    label="توضیحات"
                    placeholder="فقط از حروف لاتین و اعداد استفاده کنید"
                  />
                </>
              ) : null}
              {editType !== 'role' ? (
                loading ? (<SpinnerLoad colorClass={"text-info"} />) : (
                  <FormikControl
                    className="col-md-8"
                    control="checkbox"
                    name="permissions_id"
                    label="دسترسی ها"
                    options={permissions}
                  />
                )


              ) : null}

              <div className="btn_box text-center col-12 mt-4">
                <SubmitButton />
              </div>

            </Form>
          </Formik>
        </div>
      </ModalsContainer>
    </>
  );
};

export default AddRoles;
