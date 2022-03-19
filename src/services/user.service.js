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

const getUserTasks = (userId) => {
  const url = API_URL + `${userId}/tasks`;
  return api.get(url);
};

const createUserTask = (userId, newTask) => {
  const url = API_URL + `${userId}/tasks`;
  return api.post(url, newTask);
}

const updateUserTask = (userId, taskId, newSettings) => {
  const url = API_URL + `${userId}/tasks/${taskId}`;
  return api.patch(url, newSettings);
};

const getUserSettings = (userId) => {
  const url = API_URL + `${userId}/settings`;
  return api.get(url);
};

const setUserSettings = (userId, newSettings) => {
  const url = API_URL + `${userId}/settings`;
  return api.patch(url, newSettings);
};

const setUserMode = (userId, newMode) => {
  const url = API_URL + `${userId}/timermodes`;
  return api.patch(url, newMode);
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserTasks,
  createUserTask,
  updateUserTask,
  getUserSettings,
  setUserSettings,
  setUserMode,
};

export default userService;
