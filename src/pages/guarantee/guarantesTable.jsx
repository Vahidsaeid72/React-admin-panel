import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/paginatedtable";
import {
  deleteGuaranteeService,
  getAllGuarantesService,
} from "../../services/guarantes";
import { Alert, Confirm } from "../../utils/alert";
import AddGuarantes from "./AddGuarantes";
import Actions from "./guarantesadditional/Actions";

const GuarantesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guarantesToEdit, setGuarantesToEdit] = useState(null);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان " },
    { field: "descriptions", title: "توضیحات" },
    { field: "length", title: "مدت گارانتی" },
    { field: "length_unit", title: "واحد" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          setGuarantesToEdit={setGuarantesToEdit}
          handleDeleteGuarantee={handleDeleteGuarantee}
        />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };
  const handleGetAllGuarantes = async () => {
    try {
      setLoading(true);
      const res = await getAllGuarantesService();
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteGuarantee = async (rowData) => {
    if (
      await Confirm(
        "حذف برند",
        `آیا از حذف گرانتی ${rowData.title} اطمینان دارید ؟`
      )
    ) {
      try {
        const res = await deleteGuaranteeService(rowData.id);
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
    handleGetAllGuarantes();
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
        <AddGuarantes
          setData={setData}
          guarantesToEdit={guarantesToEdit}
          setGuarantesToEdit={setGuarantesToEdit}
        />
      </PaginatedTable>
    </>
  );
};

export default GuarantesTable;
