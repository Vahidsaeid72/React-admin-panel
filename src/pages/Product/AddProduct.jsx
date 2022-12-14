import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../components/form/FormikControl";
import { getCategoriesService } from "../../services/category";
import SpinnerLoad from "../../components/spinnerLoad";
import PrevPageButton from "../../components/prevPageButton";
import SubmitButton from "../../components/form/SubmitButton";
import { getAllBrandsService } from "../../services/barans";
import { getAllColorsService } from "../../services/color";
import { getAllGuarantesService } from "../../services/guarantes";
import { useLocation } from "react-router-dom";

const AddProduct = () => {
  const location = useLocation();
  const productToEdit = location.state?.productToEdit;
  const [reInitialValues, setReInitialValues] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  //-------------------------------------------------------------------------------------------------------------------
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
  //-------------------------------------------------------------------------------------------------------------------
  const [selectedCategories, setSelectedCategories] = useState([]); // zamni meghdar migire ke mikhay edit anjam bedim
  const [selectedColors, setSelectedColors] = useState([]); // zamni meghdar migire ke mikhay edit anjam bedim
  const [selectedGuarantees, setSelectedGuarantees] = useState([]); // zamni meghdar migire ke mikhay edit anjam bedim
  const setInitialSelectedValues = () => {
    if (productToEdit) {
      //migam zamani ke productToEdit dashtim boro rosh map bezan va az dakheleshon ye object be shekle {id,value} marbot be on bakhshi ke migam estekhraj kon va bede be state morde nazaresh va bad maghadir in state haro be onvan initioal item mifrestem be component haye select khodemon ta dar state hashon zakhire konan m chips haro besazan va be ma namayesh bedan
      setSelectedCategories(
        productToEdit.categories.map((c) => {
          return { id: c.id, value: c.title };
        })
      );
      setSelectedColors(
        productToEdit.colors.map((c) => {
          return { id: c.id, value: c.title };
        })
      );
      setSelectedGuarantees(
        productToEdit.guarantees.map((c) => {
          return { id: c.id, value: c.title };
        })
      );
    }
  };
  //-------------------------------------------------------------------------------------------------------------------

  const getAllParentCategories = async () => {
    const res = await getCategoriesService();
    if (res.status === 200) {
      setParentCategories(
        res.data.data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };
  const getAllBrands = async () => {
    const res = await getAllBrandsService();
    if (res.status === 200) {
      setBrands(
        res.data.data.map((d) => {
          return { id: d.id, value: d.original_name };
        })
      );
    }
  };
  const getAllColors = async () => {
    const res = await getAllColorsService();
    if (res.status === 200) {
      setColors(
        res.data.data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };
  const getAllGuarantees = async () => {
    const res = await getAllGuarantesService();
    if (res.status === 200) {
      setGuarantees(
        res.data.data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };
  const handleSetMainCategories = async (value) => {
    setMainCategories("waiting");
    if (value > 0) {
      const res = await getCategoriesService(value);
      if (res.status === 200) {
        setMainCategories(
          res.data.data.map((d) => {
            return { id: d.id, value: d.title };
          })
        );
      }
    } else {
      setMainCategories([]);
    }
  };


  useEffect(() => {
    getAllParentCategories();
    getAllBrands();
    getAllColors();
    getAllGuarantees();
    setInitialSelectedValues();
    for (const key in productToEdit) {
      //vaghti etelaat ro az samte server daryaft mikone maghadir null ro tabdil kon be yek string khali to betone toye input haye ma namayesh dade beshe vaghti null bashe error mide chon ma to validtionschima goftim typesh  string bashe 
      if (productToEdit[key] === null) productToEdit[key] = "";
    }
    if (productToEdit) {
      setReInitialValues({
        ...productToEdit,
        //chon etelaate prodoctToEdit ghesmat category/color/guarantees be shekle yek araye miyan nimitonim toye input khodemon be in shekl namayesh bedim baya on haro id hashono begirim va string be shekli ke mikhaym dar biyarim
        category_ids: productToEdit.categories.map((c) => c.id).join("-"),
        color_ids: productToEdit.colors.map((c) => c.id).join("-"),
        guarantee_ids: productToEdit.guarantees.map((g) => g.id).join("-"),
      });
    } else {
      setReInitialValues(null);
    }
  }, []);


  return (
    <Formik
      initialValues={reInitialValues || initialValues}
      onSubmit={(values, actions) => onSubmit(values, actions, productToEdit)}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <span className="text-right btn-back">
              <PrevPageButton />
            </span>
            <div className="container">
              <h4 className="text-center text-secondary py-3">
                {productToEdit ? (
                  <>
                    ???????????? ?????????? :{" "}
                    <span className="text-primary fs-20">
                      {productToEdit.title}
                    </span>
                  </>
                ) : (
                  "???????????? ?????????????? ????????"
                )}
              </h4>
              <div className="row justify-content-center">

                <FormikControl
                  label="???????? ???????? "
                  className={"col-md-6 col-lg-8"}
                  control="select"
                  name="parentCats"
                  options={parentCategories}
                  firstItem="???????? ???????? ?????? ???? ???????????? ???????? ..."
                  handleOnchange={handleSetMainCategories}
                />

                {mainCategories === "waiting" ? (
                  <SpinnerLoad isSmall={true} colorClass="text-primary" />
                ) : null}
                <FormikControl
                  label="???????? ???????? "
                  className="col-md-6 col-lg-8"
                  control="searchAbleSelect"
                  name="category_ids"
                  options={
                    typeof mainCategories == "object" ? mainCategories : []
                  }
                  firstItem="???????? ???????? ?????? ???? ???????????? ???????? ..."
                  resultType="string"
                  initialItems={selectedCategories}
                />
                <FormikControl
                  label="?????????? "
                  className={"col-md-6 col-lg-8 mt-2"}
                  control="input"
                  type="text"
                  name="title"
                  placeholder="?????? ???? ???????? ?? ?????????? ?????????????? ????????"
                />
                <FormikControl
                  label="???????? "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="price"
                  placeholder="?????? ???? ?????????? ?????????????? ???????? (???? ??????????)"
                />
                <FormikControl
                  label="?????? "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="weight"
                  placeholder="?????? ???? ?????????? ?????????????? ???????? (???? ??????)"
                />
                <FormikControl
                  label="???????? "
                  className={"col-md-6 col-lg-8"}
                  control="select"
                  name="brand_id"
                  options={brands}
                  firstItem="???????? ???????? ?????? ???? ???????????? ???????? ..."
                />
                <FormikControl
                  label="?????? "
                  className={"col-md-6 col-lg-8"}
                  control="searchAbleSelect"
                  name="color_ids"
                  options={colors}
                  firstItem="???????? ???????? ?????? ???? ???????????? ???????? ..."
                  resultType="string"
                  initialItems={selectedColors}
                />
                <FormikControl
                  label="?????????????? "
                  className={"col-md-6 col-lg-8 mt-2"}
                  control="searchAbleSelect"
                  name="guarantee_ids"
                  options={guarantees}
                  firstItem="???????????? ???????? ?????? ???? ???????????? ???????? ..."
                  resultType="string"
                  initialItems={selectedGuarantees}
                />
                <FormikControl
                  label="?????????????? ??????????"
                  className={"col-md-6 col-lg-8 mt-2"}
                  control="textarea"
                  name="short_descriptions"
                  placeholder="?????? ???? ???????? ?? ?????????? ?????????????? ????????"
                />
                <FormikControl
                  label="?????????????? "
                  className={"col-md-6 col-lg-8 mt-2 mb-3"}
                  control="textarea"
                  name="descriptions"
                  placeholder="?????? ???? ???????? ?? ?????????? ?????????????? ????????"
                />
                <FormikControl
                  label="?????????????? ?????? "
                  className={"col-md-6 col-lg-8"}
                  control="textarea"
                  name="cart_descriptions"
                  placeholder="?????? ???? ???????? ?? ?????????? ?????????????? ????????"
                />
                {!productToEdit ? (
                  <FormikControl
                    label="?????????? "
                    className={"col-md-6 col-lg-8"}
                    control="file"
                    name="image"
                    placeholder="??????????"
                  />
                ) : null}
                <FormikControl
                  label="?????????? ?????????? "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="text"
                  name="alt_image"
                  placeholder="?????? ???? ???????? ?? ?????????? ?????????????? ????????"
                />
                <FormikControl
                  label="?????????? ?????????? "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="text"
                  name="keywords"
                  placeholder="???????? ??????1_??????2_??????3"
                />
                <FormikControl
                  label="???????????? "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="stock"
                  placeholder="?????? ???? ?????????? ?????????????? ???????? "
                />
                <FormikControl
                  label="???????? ?????????? "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="discount"
                  placeholder="(????????)?????? ???? ?????????? ?????????????? ???????? "
                />
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmitButton />
                  <PrevPageButton className="m-2" />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProduct;
