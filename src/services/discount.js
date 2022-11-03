import httpServices from "./httpServices";

export const getAllDiscountsService = () => {
  return httpServices("/admin/discounts", "get");
};

export const addNewDiscountService = (data) => {
  return httpServices("/admin/discounts", "post", data);
};
