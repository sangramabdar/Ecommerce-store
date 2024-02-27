import axios, { AxiosHeaders } from "axios";

enum RequestStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  LOADING = "LOADING",
}

interface ApiResult {
  data?: any;
  status?: RequestStatus;
  error?: string;
  statusCode?: number;
}

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = "https://ecommerce-store-o9dl.vercel.app/api";

const defaultOptions = {
  headers: {
    ...DEFAULT_HEADERS,
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(function (config) {
  const localUser = localStorage.getItem("user") as any;
  const user: any = JSON.parse(localUser ? localUser : "{}");

  const headers: any = {
    Authorization: `Bearer ` + user.token,
  };

  config.headers = {
    ...config.headers,
    ...headers,
  };

  return config;
});

export { RequestStatus, BASE_URL, DEFAULT_HEADERS, axiosInstance };
export type { ApiResult };
