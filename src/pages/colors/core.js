import * as Yup from "yup";
import { addNewColorService, editColorService } from "../../services/color";
import { Alert } from "../../utils/alert";

export const initialValues = {
  title: "",
  code: "#f70006",
};

export const onSubmit = async (values, actions, setData, colorToEdit,setColorToEdit ) => {

  if(colorToEdit){
    const res = await editColorService(colorToEdit.id,values);
    if(res.status === 200 ){
      Alert('انجام شد', res.data.message, 'success');
      setData(lastData => {
        let newData = [...lastData];
        let Index = newData.findIndex(d=> d.id === colorToEdit.id);
        newData[Index]=res.data.data;
        return newData;
      })
    };
  }else{
const res = await addNewColorService(values);
if (res.status === 201) {
    Alert('انجام شد', res.data.message, 'success');
    setData(lastData=>[...lastData, res.data.data])
    actions.resetForm();
  }
}
setColorToEdit(null)
}

export const validationSchema = Yup.object({
  title: Yup.string().required("لطفا این قسمت را پر کنید")
  .matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از اعداد و حروف استفاده شود"
  ),
  code : Yup.string().required("لطفا این قسمت را پر کنید")

});