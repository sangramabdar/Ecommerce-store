import { StatusCodes } from "http-status-codes";

class ResponseBodyBuilder<T = any> {
  error: {};
  statusCode: number = StatusCodes.OK;
  data: T | {};
  ok: boolean = true;

  setError(error: {}) {
    this.error = error;
    return this;
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  setData(data: T) {
    this.data = data;
    return this;
  }

  setOK(ok: boolean) {
    this.ok = ok;
    return this;
  }

  build() {
    return this;
  }
}

export default ResponseBodyBuilder;
