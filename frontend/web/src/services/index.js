import axios from "axios";

const AUTH_BASE_URL = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH_SERVICE_URL_PORT}`;
const TODO_BASE_URL = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_TODO_SERVICE_URL_PORT}`;

export const AUTH_SERVICE_URL = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 10000,
  },
});

export const TODO_SERVICE_API = axios.create({
  baseURL: TODO_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 10000,
  },
});

TODO_SERVICE_API.interceptors.request.use(
  (config) => {
    let localToken = localStorage.getItem("token");
    let parseToken = JSON.parse(localToken);
    const auth = localToken ? `Bearer ${parseToken.accessToken}` : "";
    config.headers["Authorization"] = auth;
    return config;
  },
  (error) => Promise.reject(error)
);
