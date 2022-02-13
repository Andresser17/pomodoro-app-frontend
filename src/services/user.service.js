import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3600/api/users/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUserSettings = (userId) => {
  const url = API_URL + `${userId}/settings`;
  return axios.get(url, { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserSettings,
};
