import React from "react";

const PermissionsTable = () => {
  return (
    <>
      <table class="table table-responsive text-center table-hover table-bordered">
        <thead class="table-secondary">
          <tr>
            <th>#</th>
            <th>عنوان</th>
            <th>توضیحات</th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td> مجوز شماره 1</td>
            <td>توضیحات در مورد این مجوز که چیست و کلیات آن کدام است</td>
            <td>
              <div class="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
                <label
                  class="form-check-label pointer"
                  for="flexSwitchCheckDefault"
                >
                  فعال
                </label>
                <input
                  class="form-check-input pointer mx-3"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        aria-label="Page navigation example"
        class="d-flex justify-content-center"
      >
        <ul class="pagination dir_ltr">
          <li class="page-item">
            <a class="page-link" href="#/" aria-label="Previous">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#/">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#/">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#/">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#/" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PermissionsTable;
