import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import PaginatedTable from "../../components/paginatedtable";
import {
  deleteCategoryService,
  getCategoriesService,
} from "../../services/category";
import AddCategory from "./AddCategory";
import Actions from "./tableAdditions/Actions";
import ShowInMenu from "./tableAdditions/showInMenu";

import { canvertDatetojalali } from "../../utils/convertDate";
import { Alert, Confirm } from "../../utils/alert";

const CategoryTable = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const [forceRender, setForceRender] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDeleteCategory = async (rowData) => {
    if (
      await Confirm(
        "حذف دسته بندی",
        `آیا از حذف دسته ${rowData.title} اطمینان دارید ؟`
      )
    ) {
      try {
        const res = await deleteCategoryService(rowData.id);
        if (res.status === 200) {
          setData(data.filter((d) => d.id !== rowData.id));
          Alert("انجام شد ", res.data.message, "success");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlegetCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategoriesService(params.CategoryId);
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" },
    {
      field: null,
      title: "تاریخ",
      elements: (rowData) => canvertDatetojalali(rowData.created_at),
    },
    {
      field: null,
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData} />,
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          handleDeleteCategory={handleDeleteCategory}
        />
      ),
    },
  ];

  useEffect(() => {
    handlegetCategories();
  }, [params, forceRender]);

  const searchPrams = {
    title: "جستوجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };


  return (
    <>
      <Outlet />

      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        searchPrams={searchPrams}
        numOfPage={8}
        loading={loading}
      >
        <AddCategory setForceRender={setForceRender} />
      </PaginatedTable>
    </>
  );
};
export default CategoryTable;
