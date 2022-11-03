import httpServices from "./httpServices";

export const getAllDiscountsService = () => {
  return httpServices("/admin/discounts", "get");
};

export const addNewDiscountService = (data) => {
  return httpServices("/admin/discounts", "post", data);
};
export const updateDiscountService = (discountId, data) => {
  return httpServices(`/admin/discounts/${discountId}`, "put", data);
};
export const deleteDiscountService = (discountId) => {
  return httpServices(`/admin/discounts/${discountId}`, "delete");
};
