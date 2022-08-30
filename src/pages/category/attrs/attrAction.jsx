const AttrAction = ({ rowData }) => {
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش ویژگی"
        data-bs-placement="top"
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
      ></i>
    </>
  );
};

export default AttrAction;
