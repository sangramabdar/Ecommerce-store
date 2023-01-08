import axios, { AxiosResponse } from "axios";
import { Result, RequestStatus } from "./constants";

async function postRequest(
  url: string,
  data: any = {},
  headers: {} = {}
): Promise<Result> {
  let result: Result = {};

  try {
    const response = await axios.post(url, data, {
      headers,
    });
    return handleSuccess(result, response);
  } catch (error: any) {
    return handleError(result, error);
  }
}

async function getRequest(url: string, headers: {} = {}): Promise<Result> {
  let result: Result = {};

  try {
    const response = await axios.get(url, {
      headers,
    });
    return handleSuccess(result, response);
  } catch (error: any) {
    return handleError(result, error);
  }
}

async function putRequest(
  url: string,
  data: any,
  headers: {} = {}
): Promise<Result> {
  let result: Result = {};

  try {
    const response = await axios.put(url, data, {
      headers,
    });
    return handleSuccess(result, response);
  } catch (error: any) {
    return handleError(result, error);
  }
}

async function deleteRequest(url: string, headers: {} = {}): Promise<Result> {
  let result: Result = {};

  try {
    const response = await axios.delete(url, {
      headers,
    });
    return handleSuccess(result, response);
  } catch (error: any) {
    return handleError(result, error);
  }
}

function handleSuccess(result: Result, response: AxiosResponse) {
  result.statusCode = response.status;
  result.status = RequestStatus.SUCCESS;
  result.data = response.data.data;
  return result;
}

function handleError(result: Result, error: any) {
  result.status = RequestStatus.ERROR;

  if (!error.response) {
    result.error = "Network Error";
    result.statusCode = 500;
    return result;
  }

  result.statusCode = error.response.status;
  result.error = error.response.data.error;
  return result;
}

export { postRequest, getRequest, putRequest, deleteRequest };
