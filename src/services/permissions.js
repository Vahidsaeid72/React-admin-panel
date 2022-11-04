import httpServices from "./httpServices";

export const getAllpermissionsService = () => {
  return httpServices("/admin/permissions", "get");
};
