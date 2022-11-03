import React from "react";
import { useNavigate } from "react-router-dom";

const Actions = ({ rowData, handleDeleteDiscount }) => {
    const navigtion = useNavigate();
    return (
        <>
            <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش تخفیف"
                data-bs-placement="top"
                data-bs-toggle="tooltip"
                onClick={() => navigtion(`/discounts/add-discount-code/${rowData.id}`, { state: { discountToEdit: rowData } })}

            ></i>
            <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف تخفیف"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                onClick={() => handleDeleteDiscount(rowData)}

            ></i>
        </>
    );
};

export default Actions;