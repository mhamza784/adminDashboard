import { store } from "../store";
import Router from "next/router";
import { createAlert } from "../slices/alert";

export const interceptRequest = (requestConfig) => {
  const state = store?.getState();
  const token = state?.users?.token;
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
};

export const interceptRequestError = (error) => {
  return Promise.reject(error);
};

export const interceptResponse = (response) => {
  return response;
};

export const interceptResponseError = (error) => {
  if (error.response.status === 506) {
    createAlert({
      type: "error",
      message: "Your token is expired",
      status: true,
    });
    // toast({ title: "Your token is expired", status: "error" });
    // store.dispatch(userLogout());
    window.localStorage.clear();
    Router.push(`/`);
  }
  return Promise.reject(error);
};
