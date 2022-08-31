
import * as Yup from "yup";
import { addNewGuaranteeService, editGuaranteeService } from "../../services/guarantes";
import { Alert } from "../../utils/alert";

export const initialValues = {
  title: "",
  descriptions: "",
  length: "",
  length_unit: "",
};

export const onSubmit = async (values, actions, setData, guarantesToEdit,setGuarantesToEdit ) => {

  if(guarantesToEdit){
    const res = await editGuaranteeService(guarantesToEdit.id,values);
    if(res.status === 200 ){
      Alert('انجام شد', res.data.message, 'success');
      setData(lastData => {
        let newData = [...lastData];
        let Index = newData.findIndex(d=> d.id === guarantesToEdit.id);
        newData[Index]=res.data.data;
        return newData;
      })
    };
  }else{
const res = await addNewGuaranteeService(values);
if (res.status === 201) {
    Alert('انجام شد', res.data.message, 'success');
    setData(lastData=>[...lastData, res.data.data])
    actions.resetForm();
  }
}
setGuarantesToEdit(null)
}

export const validationSchema = Yup.object({
  title: Yup.string().required("لطفا این قسمت را پر کنید")
  .matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از اعداد و حروف استفاده شود"
  ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از اعداد و حروف استفاده شود"
    ),
  length : Yup.number().required("لطفا این قسمت را پر کنید"),

});