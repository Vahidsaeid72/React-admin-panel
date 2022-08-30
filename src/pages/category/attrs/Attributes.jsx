import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginatedTable from "../../../components/paginatedtable";
import PrevPageButton from "../../../components/prevPageButton";
import {
  deleteAttrCategoryService,
  getCategoryAttrsService,
} from "../../../services/categoryAttrs";
import AttrAction from "./attrAction";
import ShowInFilter from "./showInFilter";
import { Alert, Confirm } from "../../../utils/alert";
import AddAttributes from "./addAttributes";

const Attributes = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attrToEdit, setAttrToEdit] = useState(null);
  const [reInitialValues, setReInitialValues] = useState(null);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "unit", title: "واحد" },
  ];
  const searchPrams = {
    title: "جستوجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };
  const additionField = [
    {
      title: "نمایش در فیلتر",
      elements: (rowData) => <ShowInFilter rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <AttrAction
          rowData={rowData}
          attrToEdit={attrToEdit}
          setAttrToEdit={setAttrToEdit}
          handleDeleteCategoryAttr={handleDeleteCategoryAttr}
        />
      ),
    },
  ];
  const handleGetCategoryAttrs = async () => {
    setLoading(true);
    try {
      const res = await getCategoryAttrsService(location.state.categoryData.id);
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetCategoryAttrs();
  }, []);

  const handleDeleteCategoryAttr = async (attr) => {
    if (
      await Confirm(
        "حذف دسته بندی",
        `آیا از حذف ویژگی ${attr.title} اطمینان دارید ؟`
      )
    ) {
      try {
        const res = await deleteAttrCategoryService(attr.id);
        if (res.status === 200) {
          Alert("انجام شد ", res.data.message, "success");
          setData(data.filter((d) => d.id !== attr.id));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (attrToEdit) {
      setReInitialValues({
        title: attrToEdit.title,
        unit: attrToEdit.unit,
        in_filter: attrToEdit.in_filter ? true : false,
      });
    } else {
      setReInitialValues(null);
    }
  }, [attrToEdit]);

  return (
    <>
      <h4 className="text-center my-3">مدیریت ویژگی های دسته بندی</h4>
      <h6 className="text-center my-3 ">
        ویژگی ها :
        <span className="text-primary">
          {location.state.categoryData.title}
        </span>
      </h6>
      <div className="container">
        <div className="row justify-content-center ">
          <AddAttributes
            reInitialValues={reInitialValues}
            location={location}
            setData={setData}
            attrToEdit={attrToEdit}
            setAttrToEdit={setAttrToEdit}
          />
          <hr />

          <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            additionField={additionField}
            searchPrams={searchPrams}
            numOfPage={5}
            loading={loading}
          >
            <PrevPageButton />
          </PaginatedTable>
        </div>
      </div>
    </>
  );
};

export default Attributes;
