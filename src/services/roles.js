import httpServices from "./httpServices";

export const getAllRolesService = () => {
  return httpServices("/admin/roles", "get");
};

export const addRoleService = (data) => {
  return httpServices("/admin/roles", "post", data);
};

export const deleteRoleService = (roleId) => {
  return httpServices(`/admin/roles/${roleId}`, "delete");
};

export const getSingleRoleService = (roleId) => {
  return httpServices(`/admin/roles/${roleId}`, "get");
};

export const editRoleService = (roleId, data) => {
  return httpServices(`/admin/roles/${roleId}`, "put", data);
};

export const editRolePermissionsService = (roleId, data) => {
  return httpServices(`/admin/roles/${roleId}/permissions`, "put", data);
};
