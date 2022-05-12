import { USER_TOKEN } from "./Constant";

export const getUserToken = () => {
  return localStorage.getItem(USER_TOKEN);
};

export const setUserToken = (token) => {
  localStorage.setItem(USER_TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(USER_TOKEN);
};
