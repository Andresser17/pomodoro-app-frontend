import axios from "axios";
import tokenService from "./token.service";

// Create an instance of axios
const instance = axios.create({
  baseURL: "http://localhost:3600/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken();

    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== "/auth/signin" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const response = await instance.post("/auth/refreshtoken", {
            refreshToken: tokenService.getLocalRefreshToken(),
          });
          const { accessToken } = response.data;
          // Set new access token to current user
          tokenService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
