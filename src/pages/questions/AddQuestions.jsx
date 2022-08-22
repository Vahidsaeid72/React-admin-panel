import React from "react";
import ModalsContainer from "../../components/modalsContainer";

const AddQuestions = () => {
  return (
    <>
      <button
        class="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_question_modal"
      >
        <i class="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        id={"add_question_modal"}
        title={"افزودن سوال"}
        fullscreen={false}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
              <label
                class="form-check-label pointer"
                for="flexSwitchCheckDefault"
              >
                سوال
              </label>
              <input
                class="form-check-input pointer mx-3"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                class="form-check-label pointer"
                for="flexSwitchCheckDefault"
              >
                پاسخ
              </label>
            </div>
            <div class="col-12">
              <div class="input-group my-3 dir_ltr">
                <textarea rows="5" class="form-control"></textarea>
                <span class="input-group-text w_8rem justify-content-center">
                  متن سوال
                </span>
              </div>
            </div>
            <div class="input-group mb-3 dir_ltr">
              <span class="input-group-text justify-content-center">
                <i class="fas fa-plus text-success hoverable_text pointer"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="قسمتی از نام گروه را وارد کنید"
                list="questionGroupList"
              />
              <span class="input-group-text w_8rem justify-content-center">
                گروه
              </span>
              <datalist id="questionGroupList">
                <option value="گروه 1" />
                <option value="گروه 2" />
                <option value="گروه 3" />
              </datalist>
            </div>
            <div class="col-12">
              <div class="input-group my-2 dir_ltr">
                <input
                  type="text"
                  class="form-control"
                  placeholder="آی دی سوال مورد نظر را وارد کنید"
                  list="questionsList"
                />
                <span class="input-group-text w_8rem justify-content-center">
                  انتخاب سوال
                </span>
                <datalist id="questionsList">
                  <option value="سوال شماره 1" />
                  <option value="سوال شماره 2" />
                  <option value="سوال شماره 3" />
                </datalist>
              </div>
            </div>
            <div class="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
              <button class="btn btn-primary ">ذخیره</button>
            </div>
          </div>
        </div>
      </ModalsContainer>
    </>
  );
};

export default AddQuestions;
