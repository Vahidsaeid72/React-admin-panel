import * as Yup from "yup";
import { getCategoryAttrsService } from "../../../services/categoryAttrs";
import { addProductAttrService } from "../../../services/products";
import { Alert } from "../../../utils/alert";

export const onSubmit = async (values, actions, productId) => {
  let data = {}; //roye values ke baraye ma ersal mishe yek halghe mizanim ta be formate morde nizae baraye ersal be server tabdi beshe
  for (const key in values) {
    if (values[key]) data = { ...data, [key]: { value: values[key] } }; //chon values ma maghadir khali ham miyare be dalil inke vijegihaye ma requrd nist ma dar in halghe shart migzarim ke on key hayi ke value daran ro baraye ma be in format tabdil kone
  }

  const res = await addProductAttrService(productId, data);
  if (res.status === 200) {
    Alert("انجام شد", res.data.message, "success");
  }
};

export const initializingData = async (selectedProduct) => {
  let attrsVar = []; //vijegihamon
  //chon initioalvalues va validtionschima tedad fild sabti nadran ma bayad to halghei ke mizanim baraye gereftan vijegihamon initioalvalues va validtionschima ro ham besazim
  let initials = {}; //initioalvalues
  let rules = {}; //validtionschima
  const promise = Promise.all(
    selectedProduct.categories.map(async (cat) => {
      const res = await getCategoryAttrsService(cat.id);
      if (res.status === 200) {
        attrsVar = [
          ...attrsVar,
          { groupTitle: cat.title, data: res.data.data },
        ];
        if (res.data.data.length > 0) {
          for (const d of res.data.data) {
            const value =
              selectedProduct.attributes.filter((a) => a.id == d.id)[0]?.pivot
                .value || "";
            //agar baraye in vijegi meghdari peyda kardi(?)(etelaat az samte server ba name pivot dare miyas) meghdaresho bezar agar nadash yek "" bezar

            initials = { ...initials, [d.id]: value };
            rules = {
              ...rules,
              [d.id]: Yup.string().matches(
                /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
                "فقط از حروف و اعداد استفاده شود"
              ),
            };
          }
        }
      }
    })
  );
  const promisRes = await promise; //inja migam sabr kon promis.all man karesh tamom beshe
  return {
    //vaghti karet tamom shod in 3ta ro return kon
    attrsVar,
    initials,
    rules,
  };
};
