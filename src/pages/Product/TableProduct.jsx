import React, { useEffect, useState } from "react";
import AddButtonLink from "../../components/AddButtonLink";
import PaginatedDataTable from "../../components/paginatedDataTable";
import {
  deleteProductService,
  getProductsService,
} from "../../services/products";
import { Alert, Confirm } from "../../utils/alert";
import Actions from "./tableAdditions/Actions";

const TableProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);  //صفحه جاری
  const [countOnPage, setCountOnPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const dataInfo = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
      elements: (rowData) => rowData.categories[0]?.title,
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions rowData={rowData} handleDeleteProduct={handleDeleteProduct} />
      ),
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };
  const handleSearch = (char) => {
    setSearchChar(char);
    handleGetProducts(1, countOnPage, char);
  };
  const handleGetProducts = async (page, count, char) => {
    setLoading(true);
    const res = await getProductsService(page, count, char);
    res && setLoading(false);
    if (res.status === 200) {
      setData(res.data.data);
      setPageCount(res.data.last_page);
    }
  };
  const handleDeleteProduct = async (rowData) => {
    if (
      await Confirm(
        "حذف محصول",
        `آیا از حذف محصول ${rowData.title} اطمینان دارید ؟`
      )
    ) {
      try {
        const res = await deleteProductService(rowData.id);
        if (res.status === 200) {
          Alert("انجام شد ", res.data.message, "success");
          handleGetProducts(currentPage, countOnPage, searchChar);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    handleGetProducts(currentPage, countOnPage, searchChar);
  }, [currentPage]);

  return (
    <>
      <PaginatedDataTable
        tableData={data}
        dataInfo={dataInfo}
        loading={loading}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchParams={searchParams}
        handleSearch={handleSearch}
      >
        <AddButtonLink href="/products/add-product" />
      </PaginatedDataTable>
    </>
  );
};

export default TableProduct;
