import React, { useEffect, useState } from "react";
import SpinnerLoad from "./spinnerLoad";

const PaginatedDataTable = ({
  children, //modal va btn baz kardanesh
  tableData,  //etelatai ke gharare dar jadval namayesh dade beshe
  dataInfo, // sakhtare jadval che fild ha va valio hayi ro namayesh bede
  loading,
  pageCount,  //tedad safe k namayesh bede
  currentPage,  //safe jari kodom safe bashe 
  setCurrentPage, //taghire safe jari
  searchParams, //karaktri ke rosh mikhaym serch bezanim
  handleSearch, //mikham moghe taghir karakter haye serch requst be be server zade beshe va on mahsolato biyare
}) => {
  const [pages, setPages] = useState([]); //yek araye az tamam safahati ke darim mide baraye sakht dokme haye pagination azash estefade mikonim

  const pageRange = 3;  //yani paginate ma ta chan safe ghablo ta chan safe bado namayesh bede

  let timeout;

  const handleSetSearchChar = (char) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleSearch(char);
    }, 1000);
  };

  useEffect(() => {
    let pArr = [];
    for (let i = 1; i <= pageCount; i++) pArr.push(i);
    setPages(pArr);
  }, [pageCount]);

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder={searchParams.placeholder}
              onChange={(e) => handleSetSearchChar(e.target.value)}
            />
            <span className="input-group-text">{searchParams.title}</span>
          </div>
        </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>
      {loading ? (
        <SpinnerLoad colorClass={"text-primary"} />
      ) : tableData.length ? (
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
        <h5 className="text-center my-5 text-danger">?????? ???????????? ???????? ??????</h5>
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

export default PaginatedDataTable;
