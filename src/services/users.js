import httpServices from "./httpServices";

export const getAllUsersService = () => {
  return httpServices("/admin/users", "get");
};

export const getAllPaginatedUsersService = (page, countOnPage, searchChar) => {
  return httpServices(
    `/admin/users?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get"
  );
};

export const addNewUserService = (data) => {
  return httpServices("/admin/users", "post", data);
};

export const getSinglrUserService = (userId) => {
  return httpServices(`/admin/users/${userId}`, "get");
};

export const editUserService = (userId, data) => {
  return httpServices(`/admin/users/${userId}`, "put", data);
};

export const deleteUserService = (userId) => {
  return httpServices(`/admin/users/${userId}`, "delete");
};
