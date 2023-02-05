enum RequestStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  LOADING = "LOADING",
}

interface Result {
  data?: any;
  status?: RequestStatus;
  error?: string;
  statusCode?: number;
}

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const BASE_URL = "https://ecommerce-store-9an7.vercel.app/api";

// const BASE_URL = "http://localhost:8080/api";

const PRODUCT_BASE_URL = "https://fakestoreapi.com";

export { RequestStatus, BASE_URL, DEFAULT_HEADERS, PRODUCT_BASE_URL };
export type { Result };
