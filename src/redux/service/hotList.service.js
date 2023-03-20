import API from "./base.service";

export const getAllHotList = async (action) => {
  console.log("action", action);
  return API.get(`/hotlist/${action.id}`);
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
