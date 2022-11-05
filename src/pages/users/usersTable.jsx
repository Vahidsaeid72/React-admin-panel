import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AddButtonLink from "../../components/AddButtonLink";
import PaginatedDataTable from "../../components/paginatedDataTable";
import { deleteUserService, getAllPaginatedUsersService } from "../../services/users";
import { Alert, Confirm } from "../../utils/alert";
import Actions from "./tableAdditions/Actions";
import Roles from "./tableAdditions/roles";
;

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);  //صفحه جاری
  const [countOnPage, setCountOnPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const handleDeleteUser = async (user) => {
    if (await Confirm("حذف کاربر", `آیا از حذف ${user.user_name} اطمینان دارید؟`)) {
      const res = await deleteUserService(user.id);
      if (res.status === 200) {
        Alert("انجام شد", res.data.message, "success");
        handleGetUsers(currentPage, countOnPage, searchChar)
      }
    }
  }

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "user_name", title: "نام کاربری" },
    {
      field: null,
      title: "نام",
      elements: (rowData) => `${rowData.first_name || ""} ${rowData.last_name || ""}`,
    },
    {
      field: null,
      title: "نقش",
      elements: (rowData) => <Roles rowData={rowData} />,
    },
    { field: "phone", title: "شماره تلفن" },
    { field: "email", title: "ایمیل" },
    {
      field: null,
      title: "جنسیت",
      elements: (rowData) => rowData.gender == 1 ? "آقا" : "خانم",
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteUser={handleDeleteUser} />,
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از ایمیل یا شماره تلفن را وارد کنید",
  };
  const handleSearch = (char) => {
    setSearchChar(char)
    handleGetUsers(1, countOnPage, char)
  }

  const handleGetUsers = async (page, count, char) => {
    setLoading(true)
    const res = await getAllPaginatedUsersService(page, count, char)
    res && setLoading(false)
    if (res.status === 200) {
      setData(res.data.data.data)
      setPageCount(res.data.last_page)
    }
  }


  useEffect(() => {
    handleGetUsers(currentPage, countOnPage, searchChar)
  }, [currentPage])

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
        <AddButtonLink href="/Users/add-user" />
        <Outlet context={{ setData }} />
      </PaginatedDataTable>
    </>
  );
};

export default UsersTable;
