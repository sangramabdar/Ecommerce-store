class ResponseBodyBuilder<T = any> {
  private timeStamp: number = Date.now();
  private error: string = "";
  private statusCode: number = 200;
  private data: T | {} = null;
  private ok: boolean = true;

  setError(error: string) {
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

  build() {
    return this;
  }
}

export default ResponseBodyBuilder;
