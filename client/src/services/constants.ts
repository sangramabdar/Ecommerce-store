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

// const BASE_URL = "https://ecommerce-store-o9dl.vercel.app/api";

const axiosBaseQuery =
  () =>
  async ({ service }: { service: () => Promise<ApiResult> }) => {
    try {
      const result = (await service()) as ApiResult;
      return { data: result.data };
    } catch (error) {
      return {
        error,
      };
    }
  };

const BASE_URL = "http://localhost:8080/api";

export { RequestStatus, BASE_URL, DEFAULT_HEADERS, axiosBaseQuery };
export type { ApiResult };
