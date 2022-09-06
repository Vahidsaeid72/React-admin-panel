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

  const [selectedCategories, setSelectedCategories] = useState([]); // used in editting
  const [selectedColors, setSelectedColors] = useState([]); // used in editting
  const [selectedGuarantees, setSelectedGuarantees] = useState([]); // used in editting

  const [parentCategories, setParentCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);

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
  const setInitialSelectedValues = () => {
    if (productToEdit) {
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
  useEffect(() => {
    getAllParentCategories();
    getAllBrands();
    getAllColors();
    getAllGuarantees();
    setInitialSelectedValues();
    for (const key in productToEdit) {
      if (productToEdit[key] === null) productToEdit[key] = "";
    }
    if (productToEdit) {
      setReInitialValues({
        ...productToEdit,
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
                    ویرایش محصول :{" "}
                    <span className="text-primary fs-20">
                      {productToEdit.title}
                    </span>
                  </>
                ) : (
                  "افزودن محصولات جدید"
                )}
              </h4>
              <div className="row justify-content-center">
                <FormikControl
                  label="دسته والد "
                  className={"col-md-6 col-lg-8"}
                  control="select"
                  name="parentCats"
                  options={parentCategories}
                  firstItem="دسته مورد نظر را انتخاب کنید ..."
                  handleOnchange={handleSetMainCategories}
                />

                {mainCategories === "waiting" ? (
                  <SpinnerLoad isSmall={true} colorClass="text-primary" />
                ) : null}
                <FormikControl
                  label="دسته اصلی "
                  className="col-md-6 col-lg-8"
                  control="searchAbleSelect"
                  name="category_ids"
                  options={
                    typeof mainCategories == "object" ? mainCategories : []
                  }
                  firstItem="دسته مورد نظر را انتخاب کنید ..."
                  resultType="string"
                  initialItems={selectedCategories}
                />
                <FormikControl
                  label="عنوان "
                  className={"col-md-6 col-lg-8 mt-2"}
                  control="input"
                  type="text"
                  name="title"
                  placeholder="فقط از حروف و اعداد استفاده کنید"
                />
                <FormikControl
                  label="قیمت "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="price"
                  placeholder="فقط از اعداد استفاده کنید (به تومان)"
                />
                <FormikControl
                  label="وزن "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="weight"
                  placeholder="فقط از اعداد استفاده کنید (به گرم)"
                />
                <FormikControl
                  label="برند "
                  className={"col-md-6 col-lg-8"}
                  control="select"
                  name="brand_id"
                  options={brands}
                  firstItem="برند مورد نظر را انتخاب کنید ..."
                />
                <FormikControl
                  label="رنگ "
                  className={"col-md-6 col-lg-8"}
                  control="searchAbleSelect"
                  name="color_ids"
                  options={colors}
                  firstItem="برند مورد نظر را انتخاب کنید ..."
                  resultType="string"
                  initialItems={selectedColors}
                />
                <FormikControl
                  label="گارانتی "
                  className={"col-md-6 col-lg-8 mt-2"}
                  control="searchAbleSelect"
                  name="guarantee_ids"
                  options={guarantees}
                  firstItem="گرانتی مورد نظر را انتخاب کنید ..."
                  resultType="string"
                  initialItems={selectedGuarantees}
                />
                <FormikControl
                  label="توضیحات کوتاه"
                  className={"col-md-6 col-lg-8 mt-2"}
                  control="textarea"
                  name="short_descriptions"
                  placeholder="فقط از حروف و اعداد استفاده کنید"
                />
                <FormikControl
                  label="توضیحات "
                  className={"col-md-6 col-lg-8 mt-2 mb-3"}
                  control="textarea"
                  name="descriptions"
                  placeholder="فقط از حروف و اعداد استفاده کنید"
                />
                <FormikControl
                  label="توضیحات سبد "
                  className={"col-md-6 col-lg-8"}
                  control="textarea"
                  name="cart_descriptions"
                  placeholder="فقط از حروف و اعداد استفاده کنید"
                />
                {!productToEdit ? (
                  <FormikControl
                    label="تصویر "
                    className={"col-md-6 col-lg-8"}
                    control="file"
                    name="image"
                    placeholder="تصویر"
                  />
                ) : null}
                <FormikControl
                  label="توضیح تصویر "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="text"
                  name="alt_image"
                  placeholder="فقط از حروف و اعداد استفاده کنید"
                />
                <FormikControl
                  label="کلمات کلیدی "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="text"
                  name="keywords"
                  placeholder="مثلا تست1_تست2_تست3"
                />
                <FormikControl
                  label="موجودی "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="stock"
                  placeholder="فقط از اعداد استفاده کنید "
                />
                <FormikControl
                  label="درصد تخفیف "
                  className={"col-md-6 col-lg-8"}
                  control="input"
                  type="number"
                  name="discount"
                  placeholder="(درصد)فقط از اعداد استفاده کنید "
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
