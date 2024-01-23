import axios, { AxiosResponse } from "axios";
import { ApiResult, RequestStatus } from "./constants";

async function postRequest(
  url: string,
  data: any = {},
  headers: {} = {}
): Promise<ApiResult> {
  let result: ApiResult = {};

  try {
    const response = await axios.post(url, data, {
      headers,
    });
    return generateSuccessApiResult(result, response);
  } catch (error: any) {
    return generateErrorApiResult(result, error);
  }
}

async function getRequest(url: string, headers: {} = {}): Promise<ApiResult> {
  let result: ApiResult = {};

  try {
    const response = await axios.get(url, {
      headers,
    });
    return generateSuccessApiResult(result, response);
  } catch (error: any) {
    return generateErrorApiResult(result, error);
  }
}

async function putRequest(
  url: string,
  data: any,
  headers: {} = {}
): Promise<ApiResult> {
  let result: ApiResult = {};

  try {
    const response = await axios.put(url, data, {
      headers,
    });
    return generateSuccessApiResult(result, response);
  } catch (error: any) {
    return generateErrorApiResult(result, error);
  }
}

async function deleteRequest(
  url: string,
  headers: {} = {}
): Promise<ApiResult> {
  let result: ApiResult = {};

  try {
    const response = await axios.delete(url, {
      headers,
    });
    return generateSuccessApiResult(result, response);
  } catch (error: any) {
    return generateErrorApiResult(result, error);
  }
}

function generateSuccessApiResult(result: ApiResult, response: AxiosResponse) {
  result.statusCode = response.status;
  result.status = RequestStatus.SUCCESS;

  if (response.data.data) {
    result.data = response.data.data;
  } else {
    result.data = response.data;
  }

  return result;
}

function generateErrorApiResult(result: ApiResult, error: any) {
  result.status = RequestStatus.ERROR;

  //error genearated at client like network error
  if (!error.response) {
    result.error = "Network Error";
    result.statusCode = 500;
    return result;
  }

  //error sent by server
  result.statusCode = error.response.status;
  result.error = error.response.data.error;
  return result;
}

export { postRequest, getRequest, putRequest, deleteRequest };
