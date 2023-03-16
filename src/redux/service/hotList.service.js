import API from "./base.service";

export const getAllHotList = async () => {
  return API.get(`/hotlist/`);
};

export const userHotListApi = async (payload) =>
  API.post(`/hotlist/add`, payload);

export const getUserHotListById = async ({ id }) => {
  return API.get(`/hotlist/user/${id}`);
};
export const removeHotListById = async ({ id }) => {
  return API.delete(`/hotlist/remove/${id}`);
};
// export const getUserByIdAPI = async (id) => API.get(`/user/${id}`);
