import React from "react";

const Actions = ({ rowData, handleDeleteColor, setColorToEdit }) => {
    return (
        <>
            <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش تخفیف"
                data-bs-placement="top"
                data-bs-toggle="tooltip"


            ></i>
            <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف تخفیف"
                data-bs-toggle="tooltip"
                data-bs-placement="top"

            ></i>
        </>
    );
};

export default Actions;