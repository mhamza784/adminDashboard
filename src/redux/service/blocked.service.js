import API from "./base.service";

export const getAllHotList = async () => {
  return API.get(`/blocklist/`);
};

export const userAddBlockedApi = async (payload) =>
  API.post(`/blocklist/add`, payload);

export const getUserBlockedListById = async ({ id }) => {
  return API.get(`/blocklist/blockeduser/${id}`);
};
export const removeBlockedById = async ({ id }) => {
  return API.delete(`/blocklist/remove/${id}`);
};
// export const getUserByIdAPI = async (id) => API.get(`/user/${id}`);
