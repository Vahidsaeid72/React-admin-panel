import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AddButtonLink from "../../components/AddButtonLink";
import PaginatedTable from "../../components/paginatedtable";
import { getAllDiscountsService } from "../../services/discount";
import Actions from "./tableAdditional/Actions";
import { canvertDatetojalali } from "./../../utils/convertData"

const DiscountsTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState(null)

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "code", title: "کد تخفیف" },
    { field: "percent", title: "درصد تخفیف" },
    {
      field: null,
      title: "تاریخ انقضا",
      elements: (rowData) => canvertDatetojalali(rowData.expire_at),
    },
    {
      field: null,
      title: "وضعیت",
      elements: (rowData) => rowData.is_active ? "فعال" : "غیرفعال",
    },
    {
      field: null,
      title: "مربوط به",
      elements: (rowData) => rowData.for_all ? "همه" : "تعدادی از محصولات",
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetAllDiscounts = async () => {
    setLoading(true)
    const res = await getAllDiscountsService();
    setLoading(false)
    if (res.status === 200) {
      setData(res.data.data);
    }
  }

  useEffect(() => {
    handleGetAllDiscounts()
  }, [])


  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      searchPrams={searchParams}
      numOfPage={8}
      loading={loading}>
      <AddButtonLink href={"/discounts/add-discount-code"} />
      <Outlet />
    </PaginatedTable>
  );
};

export default DiscountsTable;
