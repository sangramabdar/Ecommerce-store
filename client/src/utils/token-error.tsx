function handleTokenError(statusCode: number) {
  if (statusCode === 403) {
    localStorage.removeItem("user");
  }
}

export { handleTokenError };
