import React, { useState } from "react";
import { useEffect } from "react";
import PaginatedTable from "../../components/paginatedtable";
import { deleteBrandService, getAllBrandsService } from "../../services/barans";
import { apiPath } from "../../services/httpServices";
import { Alert, Confirm } from "../../utils/alert";
import AddBrands from "./AddBrands";
import Actions from "./tableAdditional/Actions";

const BrandsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "original_name", title: "عنوان لاتین" },
    { field: "persian_name", title: "عنوان فارسی" },
    { field: "descriptions", title: "توضیحات" },
    {
      field: null,
      title: "لوگو",
      elements: (rowData) =>
        rowData.logo ? (
          <img src={apiPath + "/" + rowData.logo} width="40" />
        ) : null,
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          handleDeletebrand={handleDeletebrand}
          setBrandToEdit={setBrandToEdit}
        />
      ),
    },
  ];



  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "original_name",
  };

  const handleGetAllBrands = async () => {
    try {
      setLoading(true);
      const res = await getAllBrandsService();
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletebrand = async (rowData) => {
    if (
      await Confirm(
        "حذف برند",
        `آیا از حذف برند ${rowData.original_name} اطمینان دارید ؟`
      )
    ) {
      try {
        const res = await deleteBrandService(rowData.id);
        if (res.status === 200) {
          setData(data.filter((d) => d.id !== rowData.id));
          Alert("انجام شد ", res.data.message, "success");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    handleGetAllBrands();
  }, []);

  return (
    <>
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        searchPrams={searchParams}
        numOfPage={8}
        loading={loading}
      >
        <AddBrands
          setData={setData}
          brandToEdit={brandToEdit}
          setBrandToEdit={setBrandToEdit}
        />
      </PaginatedTable>
    </>
  );
};

export default BrandsTable;
