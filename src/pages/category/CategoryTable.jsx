import React from "react";
import PaginatedTable from "../../components/paginatedtable";
import AddCategory from "./AddCategory";

const CategoryTable = () => {
  const data = [
    {
      id: "1",
      category: "bbb",
      title: "vahid",
      price: "111",
      stock: "5",
      like_count: "10",
      status: "1",
    },
    {
      id: "2",
      category: "bbb",
      title: "saeid",
      price: "111",
      stock: "5",
      like_count: "10",
      status: "1",
    },
    {
      id: "3",
      category: "abas",
      title: "abas",
      price: "111",
      stock: "5",
      like_count: "10",
      status: "1",
    },
    {
      id: "4",
      category: "javad",
      title: "javad",
      price: "111",
      stock: "5",
      like_count: "10",
      status: "1",
    },
    {
      id: "5",
      category: "reza",
      title: "reza",
      price: "111",
      stock: "5",
      like_count: "10",
      status: "1",
    },
  ];

  const datainfo = [
    {
      field: "id",
      title: "#",
    },
    {
      field: "title",
      title: "عنوان محصول",
    },
    {
      field: "price",
      title: "قیمت",
    },
  ];

  const additionalElements = (itemId) => {
    return (
      <>
        <i
          className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
          title="زیرمجموعه"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        ></i>
        <i
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش دسته"
          data-bs-placement="top"
          data-bs-toggle="modal"
          data-bs-target="#add_product_category_modal"
        ></i>
        <i
          className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
          title="افزودن ویژگی"
          data-bs-placement="top"
          data-bs-toggle="modal"
          data-bs-target="#add_product_category_attr_modal"
        ></i>
        <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف دسته"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        ></i>
      </>
    );
  };

  const searchPrams = {
    title: "جستوجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const additionField = {
    title: "عملیات",
    elements: (itemId) => additionalElements(itemId),
  };
  return (
    <PaginatedTable
      data={data}
      datainfo={datainfo}
      additionField={additionField}
      searchPrams={searchPrams}
      numOfPage={8}
    >
      <AddCategory />
    </PaginatedTable>
  );
};

export default CategoryTable;
