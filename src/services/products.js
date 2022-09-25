import { convertDataToFormdata } from "../utils/convertDataToFormdata";
import httpServices from "./httpServices";

export const getProductsService = (page, countOnPage, searchChar) => {
  return httpServices(
    `/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get"
  );
};

export const deleteProductService = (productId) => {
  return httpServices(`/admin/products/${productId}`, "delete");
};

export const createNewProductService = (data) => {
  return httpServices(
    "/admin/products",
    "post",
    data.image ? convertDataToFormdata(data) : data
  );
};
export const editProductService = (productId, data) => {
  return httpServices(`/admin/products/${productId}`, "put", data);
};

export const addProductAttrService = (productId, data) => {
  return httpServices(`/admin/products/${productId}/add_attr`, "post", data);
};
export const addProductImageService = (productId, data) => {
  return httpServices(`/admin/products/${productId}/add_image`, "post", data);
};

export const setMainProductImageService = (imageId) => {
  return httpServices(`/admin/products/gallery/set_main/${imageId}`, "get");
};
export const deleteProductImageService = (imageId) => {
  return httpServices(`/admin/products/gallery/${imageId}`, "delete");
};
