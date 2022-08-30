const AttrAction = ({
  rowData,
  attrToEdit,
  setAttrToEdit,
  handleDeleteCategoryAttr,
}) => {
  return (
    <div
      className={`text-center ${
        attrToEdit && rowData.id === attrToEdit.id
          ? "alert-danger danger-shadow"
          : ""
      }`}
    >
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش ویژگی"
        data-bs-placement="top"
        onClick={() => setAttrToEdit(rowData)}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        onClick={() => handleDeleteCategoryAttr(rowData)}
      ></i>
    </div>
  );
};

export default AttrAction;
