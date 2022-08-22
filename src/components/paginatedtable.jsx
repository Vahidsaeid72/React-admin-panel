import React, { useEffect, useState } from "react";
import AddCategory from "../pages/category/AddCategory";

const PaginatedTable = ({
  children,
  data,
  datainfo,
  additionField,
  searchPrams,
  numOfPage,
}) => {
  const [initialData, setInitialData] = useState(data);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchChar, setSearchChar] = useState("");

  useEffect(() => {
    let pCount = Math.ceil(initialData.length / numOfPage);
    setPageCount(pCount);
    let pArr = [];
    for (let i = 1; i <= pCount; i++) pArr = [...pArr, i];
    setPages(pArr);
  }, [initialData]);

  useEffect(() => {
    let start = numOfPage * currentPage - numOfPage;
    let end = numOfPage * currentPage;

    setTableData(initialData.slice(start, end));
  }, [currentPage, initialData]);

  useEffect(() => {
    setInitialData(
      data.filter((d) => d[searchPrams.searchField].includes(searchChar))
    );
    setCurrentPage(1);
  }, [searchChar]);
  return (
    <>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder={searchPrams.placeholder}
              onChange={(e) => setSearchChar(e.target.value)}
            />
            <span className="input-group-text">{searchPrams.title}</span>
          </div>
        </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>
      <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            {datainfo.map((h) => (
              <th key={h.field}>{h.title}</th>
            ))}
            {additionField ? <th>{additionField.title}</th> : null}
          </tr>
        </thead>
        <tbody>
          {tableData.map((d) => (
            <tr key={d.id}>
              {datainfo.map((info) => (
                <td key={info.field + "_" + d.id}>{d[info.field]}</td>
              ))}
              {additionField ? <th>{additionField.elements(d.id)}</th> : null}
            </tr>
          ))}
        </tbody>
      </table>
      {pageCount > 1 ? (
        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-center"
        >
          <ul className={`pagination dir_ltr`}>
            <li
              className={`page-item ${
                currentPage === 1 ? "disabled" : "pointer"
              }`}
            >
              <span
                className="page-link"
                href="/"
                aria-label="Previous"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </span>
            </li>

            {pages.map((page) => (
              <li className="page-item pointer" key={page}>
                <span
                  className={`page-link ${
                    currentPage === page ? "alert-success" : null
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </span>
              </li>
            ))}

            <li
              className={`page-item  ${
                currentPage === pageCount ? "disabled" : "pointer"
              }`}
            >
              <span
                className="page-link"
                aria-label="Next"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </span>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
};

export default PaginatedTable;
