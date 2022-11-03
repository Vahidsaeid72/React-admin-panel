import { Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormikControl from "../../components/form/FormikControl";
import SubmitButton from "../../components/form/SubmitButton";
import ModalsContainer from "../../components/modalsContainer";
import { getAllProductTitlesService } from "../../services/products";
import { canvertDatetojalali } from "../../utils/convertDate";
import { initialValues, onSubmit, validationSchema } from "./core";

const AddDiscounts = () => {
  const navigate = useNavigate()
  const [allProducts, setAllProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [reInitialValues, setReInitialValues] = useState(null);

  const location = useLocation();
  const discountToEdit = location.state?.discountToEdit;

  const { setData } = useOutletContext(); // ba in hook mishe prop hayi ke ba object context ersal kardim be outled ro daryaft konim
  const handleGetAllProductTitles = async () => {
    const res = await getAllProductTitlesService();
    if (res.status === 200) {
      setAllProducts(res.data.data.map(p => { return { id: p.id, value: p.title } }));
    }
  }

  const handleSetProdocutSelectedBox = (formik) => {
    const idsArray = formik.values.product_ids.split('-').filter(id => id);//inja mikham agar az ghable mahsoli entekhab shode id hasho begiram va tabdil konam be araye chone beshekle string vared shode dar component 'filter(id => id)' in mord ham bekhatere inke hata agar mahsoli nabod bazam araye bargardone string bar nagardone
    const selectedProductArray = idsArray.map((id) => (allProducts.filter(product => product.id == id)[0])).filter(product => product)
    return (
      <FormikControl
        className="animate__animated animate__shakeX"
        label="برای"
        control="searchAbleSelect"
        options={allProducts}
        name="product_ids"
        firstItem="محصول مورد نظر را انتخاب کنبد..."
        resultType="string"
        initialItems={selectedProductArray.length > 0 ? selectedProductArray : selectedProducts}
      />
    )
  }

  useEffect(() => {
    handleGetAllProductTitles()

    if (discountToEdit) {
      setSelectedProducts(discountToEdit.products.map(p => { return { id: p.id, value: p.title } }));

      const pruductIds = discountToEdit.products.map(p => p.id).join('-');
      setReInitialValues({
        ...discountToEdit,
        expire_at: canvertDatetojalali(discountToEdit.expire_at, 'jD / jM / jYYYY'),
        for_all: discountToEdit.for_all ? true : false,
        product_ids: pruductIds,
      })
    }
  }, [])


  return (
    <ModalsContainer
      className="show d-block"
      id={"add_discount_modal"}
      title={discountToEdit ? "ویرایش کد تخفیف" : "افزودن کد تخفیف"}
      fullScreen={false}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <div className="row justify-content-center">

          <Formik
            initialValues={reInitialValues || initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions, setData, discountToEdit)}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {formik => {

              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    name="title"
                    label="عنوان تخفیف"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="code"
                    label="کد تخفیف"
                    placeholder="فقط از حروف لاتین و اعداد استفاده کنید"
                  />
                  <FormikControl
                    control="input"
                    type="number"
                    name="percent"
                    label="درصد تخفیف"
                    placeholder="فقط از اعداد استفاده کنید"
                  />
                  <FormikControl
                    control="date"
                    formik={formik}
                    name="expire_at"
                    label="تاریخ انقضاء"
                    initialDate={discountToEdit?.expire_at || undefined}
                    yearsLimit={{ from: 10, to: 10 }}
                  />
                  <div className="row mb-2">
                    <div className="col-12 col-md-4">
                      <FormikControl
                        control="switch"
                        name="for_all"
                        label="برای همه"
                      />
                    </div>
                  </div>
                  {
                    !formik.values.for_all ? (handleSetProdocutSelectedBox(formik)) : null
                  }
                  <div className="btn_box text-center col-12 mt-4">
                    <SubmitButton />
                  </div>
                </Form>
              )
            }}
          </Formik>

        </div>
      </div>

    </ModalsContainer>
  );
};

export default AddDiscounts;
