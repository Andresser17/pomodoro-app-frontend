import api from "./api";
import tokenService from "./token.service";
const API_URL = "/auth/";

const register = (email, password) => {
  return api.post(API_URL + "signup", {
    email,
    password,
  });
};

const login = (email, password) => {
  return api
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        tokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  tokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
