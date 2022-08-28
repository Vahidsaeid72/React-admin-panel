import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import PaginatedTable from "../../components/paginatedtable";
import { getCategoriesService } from "../../services/category";
import AddCategory from "./AddCategory";
import Actions from "./tableAdditions/Actions";
import ShowInMenu from "./tableAdditions/showInMenu";

import { canvertDatetojalali } from "../../utils/convertData";

const CategoryTable = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const [forceRender, setForceRender] = useState(0);
  const [loading, setLoading] = useState(false);

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
  ];
  useEffect(() => {
    handlegetCategories();
  }, [params, forceRender]);

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
        loading={loading}
      >
        <AddCategory setForceRender={setForceRender} />
      </PaginatedTable>
    </>
  );
};
export default CategoryTable;
