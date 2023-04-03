// import login from "@/pages/login";
import { ResetTvOutlined } from "@mui/icons-material";
import API from "./base.service";

export const getAllUsersAPI = async () => {
  return API.get(`/user/pag`);
};

export const createUserAPI = async (user) => API.post(`/user/signUp`, user);
export const forgetPasswordUserAPI = async (user) => API.post(`/user/forgetPassword`, user);

export const userLoginAPI = async (user) => API.post(`/user/login`, user);

export const userNotificationAPI = async (user) => {
  // console.log("user in Api server", user);
  return API.post(`/user/sendEmailToSelectedUsers`, user);
}

export const userSearchAPI = async (user) => {
  return API.post(`/user/search`, user);
};

export const getUserByIdAPI = async (id) => API.get(`/user/${id}`);

export const updateUserAPI = async (user) => API.put(`/user/${user.id}`, user);

export const updateUserPasswordAPI = async (user) => {
  return API.put(`/user/password/${user.id}`, user);
};
export const confirmUserPasswordAPI = async (user) => {
  // console.log(user, "service");
  return API.put(`/user/link`, user);
};
export const deleteUserByIdAPI = async ({ id }) => {
  console.log(id);
  return API.delete(`/user/${id}`);
}

