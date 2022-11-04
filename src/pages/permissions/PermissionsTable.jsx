import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/paginatedtable";
import { getAllpermissionsService } from "../../services/permissions";

const PermissionsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان مجوز" },
    { field: "description", title: "توضیحات" },
    { field: "category", title: "دسته بندی ها" },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetAllPermissions = async () => {
    setLoading(true);
    const res = await getAllpermissionsService();
    if (res.status === 200) {
      setData(res.data.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleGetAllPermissions();
  }, [])
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      searchPrams={searchParams}
      numOfPage={9}
      loading={loading}
    >
    </PaginatedTable>
  )
}
export default PermissionsTable;
