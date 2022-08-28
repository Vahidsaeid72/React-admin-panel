import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import PaginatedTable from "../../components/paginatedtable";
import { getCategoriesService } from "../../services/category";
import { Alert } from "../../utils/alert";
import AddCategory from "./AddCategory";
import Actions from "./tableAdditions/Actions";
import ShowInMenu from "./tableAdditions/showInMenu";
import jMoment from "jalali-moment";
import { canvertDatetojalali } from "../../utils/convertData";

const CategoryTable = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const location = useLocation();
  const handlegetCategories = async () => {
    try {
      const res = await getCategoriesService(params.categoryId);
      if (res.status === 200) {
        setData(res.data.data);
        // setData([
        //   { id: 1, title: "شوینده", parent_id: null, created_at: "26121402" },
        //   { id: 2, title: "کفش", parent_id: null, created_at: "26121402" },
        //   { id: 3, title: "لباس", parent_id: null, created_at: "26121402" },
        //   { id: 4, title: "ماشین", parent_id: null, created_at: "26121402" },
        // ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" },
  ];
  useEffect(() => {
    handlegetCategories();
  }, [params]);

  const searchPrams = {
    title: "جستوجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const additionField = [
    {
      title: "تاریخ",
      elements: (rowData) => canvertDatetojalali(rowData.created_at),
    },
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];

  return (
    <>
      <Outlet />

      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        searchPrams={searchPrams}
        numOfPage={8}
      >
        <AddCategory />
      </PaginatedTable>
      {data.length === 0 ? (
        <h5 className="text-center text-danger my-5">هیچ دسته ای یافت نشد</h5>
      ) : null}
    </>
  );
};
export default CategoryTable;
