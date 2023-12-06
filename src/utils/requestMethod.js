import axios from "axios";
import baseURL from "./baseUrl";

// create a private axios http instance
export const axiosPrivate = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
    Accept: "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Credentials": true,
    withCredentials: true,
  },
});

// interceptor for users (superAdmin, admin & teacher)
axiosPrivate.interceptors.request.use(
  async (config) => {
    let accessToken;

    if (localStorage.getItem("userInfo")) {
      // console.log("userInfo");
      accessToken = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).response.token.access
        : null;
    }

    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
