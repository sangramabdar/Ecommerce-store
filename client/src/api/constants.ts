enum Status {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface Result {
  data?: any;
  status?: Status;
  error?: string;
  statusCode?: number;
}

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

// const BASE_URL = "https://ecommerce-store-9an7.vercel.app/api";

const BASE_URL = "http://localhost:8080/api";

const PRODUCT_BASE_URL = "https://fakestoreapi.com";

export { Status, BASE_URL, DEFAULT_HEADERS, PRODUCT_BASE_URL };
export type { Result };
