import { addCategoryAttrsService, editCategoryAttrsService } from "../../../services/categoryAttrs";
import { Alert } from "../../../utils/alert";
import * as Yup from "yup";

export const initialValues = {
    title: "",
    unit: "",
    in_filter: true,
  };
  export const onSubmit = async (
    values,
    actions,
    catId,
    setData,
    attrToEdit,
    setAttrToEdit
  ) => {
    try {
      values = {
        ...values,
        in_filter: values.in_filter ? 1 : 0,
      };
      if (attrToEdit) {
        const res = await editCategoryAttrsService(attrToEdit.id, values);
        if (res.status === 200) {
          setData((oldData) => {
            const newData = [...oldData];
            const index = newData.findIndex((d) => d.id === attrToEdit.id);
            newData[index] = res.data.data;
            return newData;
          });
  
          Alert("انجام شد", res.data.message, "success");
          setAttrToEdit(null);
        }
      } else {
        const res = await addCategoryAttrsService(catId, values);
        if (res.status === 201) {
          Alert("انجام شد", res.data.message, "success");
          setData((oldData) => [...oldData, res.data.data]);
          actions.resetForm();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const validationSchema = Yup.object({
    title: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود"
      ),
    unit: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود"
      ),
    in_filter: Yup.boolean(),
  });