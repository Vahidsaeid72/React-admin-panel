import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/paginatedtable";
import { deleteColorService, getAllColorsService } from "../../services/color";
import { Alert, Confirm } from "../../utils/alert";
import AddColor from "./AddColor";
import Actions from "./tableAdditional/Actions";

const ColorsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(null);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "نام" },
    { field: "code", title: "کد رنگ" },
  ];

  const additionField = [
    {
      title: "رنگ",
      elements: (rowData) => (
        <div
          className="w-100 h-100 d-block"
          style={{ background: rowData.code, color: rowData.code }}
        >
          ...
        </div>
      ),
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          handleDeleteColor={handleDeleteColor}
          setColorToEdit={setColorToEdit}
        />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از نام رنگ را وارد کنید",
    searchField: "title",
  };

  const handleGetAllColor = async () => {
    setLoading(true);
    const res = await getAllColorsService();
    res && setLoading(false);
    if (res.status === 200) {
      setData(res.data.data);
    }
  };

  const handleDeleteColor = async (rowData) => {
    if (
      await Confirm(
        "حذف رنگ",
        `آیا از حذف رنگ ${rowData.title} اطمینان دارید ؟`
      )
    ) {
      try {
        const res = await deleteColorService(rowData.id);
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
    handleGetAllColor();
  }, []);

  return (
    <>
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        searchPrams={searchParams}
        numOfPage={8}
        loading={loading}
      >
        <AddColor
          setData={setData}
          colorToEdit={colorToEdit}
          setColorToEdit={setColorToEdit}
        />
      </PaginatedTable>
    </>
  );
};

export default ColorsTable;
