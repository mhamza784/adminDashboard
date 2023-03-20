import API from "./base.service";

export const AddChatApi = async (payload) => API.post(`/message/`, payload);

export const getUserChatById = async ({ id }) => {
  return API.get(`/message/${id}`);
};

export const removeChatById = async ({ id }) => {
  return API.delete(`/message/${id}`);
};

export const userAddConversationApi = async (payload) =>
  API.post(`/conversation/`, payload);

export const getUserConversationById = async ({ id }) => {
  return API.get(`/conversation/${id}`);
};

export const removeConversationById = async ({ id }) => {
  return API.delete(`/conversation/${id}`);
};
