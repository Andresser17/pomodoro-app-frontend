import api from "./api";
const API_URL = "/users/";

const getPublicContent = () => {
  return api.get(API_URL + "all");
};
const getUserBoard = () => {
  return api.get(API_URL + "user");
};
const getModeratorBoard = () => {
  return api.get(API_URL + "mod");
};
const getAdminBoard = () => {
  return api.get(API_URL + "admin");
};

const getUserSettings = (userId) => {
  const url = API_URL + `${userId}/settings`;
  return api.get(url);
};

const setUserSettings = (userId, newSettings) => {
  const url = API_URL + `${userId}/settings`;
  return api.patch(url, newSettings);
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserSettings,
  setUserSettings,
};

export default userService;
