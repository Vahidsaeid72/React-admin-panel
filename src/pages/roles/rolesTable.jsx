import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AddButtonLink from "../../components/AddButtonLink";
import PaginatedTable from "../../components/paginatedtable";
import Action from "./tableAdditions/Action";
import { deleteRoleService, getAllRolesService } from "../../services/roles"
import { Alert, Confirm } from "../../utils/alert";
const RolesTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDeleteRole = async (rowData) => {
    if (
      await Confirm(
        "حذف نقش",
        `آیا از حذف نقش ${rowData.title} اطمینان دارید ؟`
      )
    ) {
      const res = await deleteRoleService(rowData.id);
      if (res.status === 200) {
        setData(data.filter((d) => d.id !== rowData.id));
        Alert("انجام شد ", res.data.message, "success");
      }
    }
  }
  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان نقش" },
    { field: "description", title: "توضیحات" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Action rowData={rowData} handleDeleteRole={handleDeleteRole} />
    }
    // { field: "permissions", title: "مجوز ها" },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetAllPermissions = async () => {
    setLoading(true);
    const res = await getAllRolesService();
    if (res.status === 200) {
      setData(res.data.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleGetAllPermissions();
  }, [])


  return (
    <>
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        searchPrams={searchParams}
        numOfPage={9}
        loading={loading}
      >
        <AddButtonLink href={"/Roles/add-role"} />
        <Outlet context={{ setData }} />
      </PaginatedTable>
    </>
  );
};

export default RolesTable;
