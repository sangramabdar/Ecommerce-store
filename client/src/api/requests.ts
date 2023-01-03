import axios from "axios";
import { Result, Status } from "./constants";

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

    const responseBody = response.data;

    return handleSuccess(result, responseBody);
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

    const responseBody = response.data;

    return handleSuccess(result, responseBody);
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

    const responseBody = response.data;

    return handleSuccess(result, responseBody);
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
    const responseBody = response.data;

    return handleSuccess(result, responseBody);
  } catch (error: any) {
    return handleError(result, error);
  }
}

function handleSuccess(result: Result, responseBody: any) {
  result.statusCode = responseBody.statusCode;
  result.status = Status.SUCCESS;
  result.data = responseBody.data;
  return result;
}

function handleError(result: Result, error: any) {
  result.status = Status.ERROR;

  if (!error.response) {
    result.error = "Network Error";
    return result;
  }
  result.statusCode = error.response.status;
  result.error = error.response.data.error;
  return result;
}

export { postRequest, getRequest, putRequest, deleteRequest };
