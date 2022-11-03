import React, { useEffect, useState } from "react";
import SpinnerLoad from "./spinnerLoad";
import './style/PaginatedTable.css';
const PaginatedTable = ({
  children,
  data,
  dataInfo,
  searchPrams,
  numOfPage,
  loading,
}) => {
  const [initialData, setInitialData] = useState(data);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //صفحه جاری
  const [pages, setPages] = useState([]); // شماره های پایین
  const [pageCount, setPageCount] = useState(1); // تعداد صفحات
  const [searchChar, setSearchChar] = useState("");
  const pageRange = 3;

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
  }, [searchChar, data]);

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
      {loading ? (
        <SpinnerLoad colorClass={"text-primary"} />
      ) : data.length ? (
        <table className="table table-responsive text-center table-hover table-bordered">
          <thead className="table-secondary">
            <tr>
              {dataInfo.map((i, index) => (
                <th key={i.field || `notField__${index}`}>{i.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((d) => (
              <tr key={d.id}>
                {dataInfo.map((i, index) =>
                  i.field ? (
                    <td key={i.field + "_" + d.id}>{d[i.field]}</td>
                  ) : (
                    <td key={d.id + "__" + i.id + "__" + index}>
                      {i.elements(d)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="text-center text-danger my-5">هیچ رکوردی یافت نشد</h5>
      )}

      {pages.length > 1 ? (
        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-center"
        >
          <ul className="pagination dir_ltr">
            <li className="page-item">
              <span
                className={`page-link pointer ${currentPage == 1 ? "disabled" : ""
                  }`}
                aria-label="Previous"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </span>
            </li>
            {currentPage > pageRange ? (
              <li className="page-item me-3">
                <span
                  className="page-link pointer"
                  onClick={() => setCurrentPage(1)}
                >
                  ... 1
                </span>
              </li>
            ) : null}
            {pages.map((page) =>
              page < currentPage + pageRange &&
                page > currentPage - pageRange ? (
                <li className="page-item" key={page}>
                  <span
                    className={`page-link pointer ${currentPage == page ? "alert-success" : ""
                      }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                </li>
              ) : null
            )}

            {currentPage <= pageCount - pageRange ? (
              <li className="page-item me-3">
                <span
                  className="page-link pointer"
                  onClick={() => setCurrentPage(pageCount)}
                >
                  {pageCount} ...
                </span>
              </li>
            ) : null}

            <li className="page-item">
              <span
                className={`page-link pointer ${currentPage == pageCount ? "disabled" : ""
                  }`}
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
