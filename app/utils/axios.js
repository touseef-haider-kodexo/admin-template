// original version: https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f
import axiosBase from "axios";

import storage from "./storage";

import NotificationStatus from "@/components/Notification";
import { getTokens, setTokens } from "@/utils/auth";
// eslint-disable-next-line
import { getUserProfile } from "@/redux/global/actions";
// eslint-disable-next-line
import store from "@/redux/store";

export const baseURL = process.env.END_POINT_URL;

export const baseImageURL = process.env.BUCKET_URL;

export const vehicleImageURL =
  "https://vehiclecanvas.s3.us-west-1.amazonaws.com/";

const axios = axiosBase.create({
  baseURL,
  timeout: 10000,
});

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.request.use(
  (config = {}) => {
    const token = getTokens().access_token;
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common.Authorization = auth;
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { message, status } = error?.response?.data;
    const originalRequest = error.config;

    if (
      (error.response &&
        status === 401 &&
        message === "Refresh Token Expired") ||
      message === "Your Account Is Inactive" ||
      message === "Your TPA Is Inactive"
    ) {
      storage.clear();
      window.location.reload();
      NotificationStatus("error", message);
    }

    if (
      error?.response?.status === 401 &&
      error.response?.data.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.common.Authorization = token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      //

      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      isRefreshing = true;

      const { refresh_token } = getTokens();
      return new Promise((resolve, reject) => {
        axios
          .post("/refreshToken", { refresh_token })
          .then(({ data }) => {
            setTokens(data);
            store.dispatch(getUserProfile.request());
            processQueue(null, data.access_token);
            originalRequest.headers.common.Authorization = data.access_token;

            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default axios;
