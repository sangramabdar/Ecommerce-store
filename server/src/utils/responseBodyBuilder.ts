import { StatusCodes } from "http-status-codes";

class ResponseBodyBuilder<T = any> {
  private timeStamp: number = Date.now();
  private errors: any[] = [];
  private statusCode: number = StatusCodes.OK;
  private data: T | {} = {};
  private ok: boolean = true;

  setErrors(errors: any[]) {
    this.errors = errors;
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
