import axios, { AxiosResponse } from "axios";
import { ApiResult, DEFAULT_HEADERS, RequestStatus } from "./constants";

async function postRequest(
  url: string,
  data: any = {},
  headers: {} = {}
): Promise<ApiResult> {
  try {
    const response = await axios.post(url, data, {
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    });
    return generateSuccessApiResult(response);
  } catch (error: any) {
    return generateErrorApiResult(error);
  }
}

async function getRequest(url: string, headers: {} = {}): Promise<ApiResult> {
  try {
    const response = await axios.get(url, {
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    });
    return generateSuccessApiResult(response);
  } catch (error: any) {
    return generateErrorApiResult(error);
  }
}

async function putRequest(
  url: string,
  data: any,
  headers: {} = {}
): Promise<ApiResult> {
  try {
    const response = await axios.put(url, data, {
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    });
    return generateSuccessApiResult(response);
  } catch (error: any) {
    return generateErrorApiResult(error);
  }
}

async function deleteRequest(
  url: string,
  headers: {} = {}
): Promise<ApiResult> {
  try {
    const response = await axios.delete(url, {
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    });

    return generateSuccessApiResult(response);
  } catch (error: any) {
    return generateErrorApiResult(error);
  }
}

function generateSuccessApiResult(response: AxiosResponse) {
  let result: ApiResult = {};

  result.statusCode = response.status;
  result.status = RequestStatus.SUCCESS;

  if (response.data.data) {
    result.data = response.data.data;
  } else {
    result.data = response.data;
  }

  return result;
}

function generateErrorApiResult(error: any) {
  let result: ApiResult = {};

  result.status = RequestStatus.ERROR;

  //error genearated at client like network error
  if (!error.response) {
    result.error = "Network Error";
    result.statusCode = 500;
    return result;
  }

  //error sent by server
  result.statusCode = error.response.status;
  result.error = error.response.data.error.message;
  return result;
}

export { postRequest, getRequest, putRequest, deleteRequest };
