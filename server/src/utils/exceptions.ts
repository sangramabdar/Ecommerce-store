import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  statusCode: number | null = null;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  setMessage(message: string) {
    this.message = message;
  }
}

class BadRequest extends CustomError {
  constructor(message: string = "bad request") {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class DataBaseConnectionError extends CustomError {
  private static message: string = "db connection error";
  constructor() {
    super(DataBaseConnectionError.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

class NotFound extends CustomError {
  private static message: string = "not found";
  constructor(entity: string) {
    super(`${entity} ${NotFound.message}`, StatusCodes.NOT_FOUND);
  }
}

class WrongContent extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class EmailExists extends CustomError {
  private static message: string = "email already exists";
  constructor() {
    super(EmailExists.message, StatusCodes.BAD_REQUEST);
  }
}

class NotRegistered extends CustomError {
  private static message: string = "email is not registered";
  constructor() {
    super(NotRegistered.message, 401);
  }
}

class Unauthorized extends CustomError {
  private static message: string = "forbidden";
  constructor() {
    super(Unauthorized.message, StatusCodes.FORBIDDEN);
  }
}

class Unauthenticated extends CustomError {
  private static message: string = "unauthorized";
  constructor() {
    super(Unauthenticated.message, StatusCodes.UNAUTHORIZED);
  }
}

class TokenError extends CustomError {
  private static message: string = "token is invalid";
  constructor() {
    super(TokenError.message, StatusCodes.BAD_REQUEST);
  }
}

export {
  DataBaseConnectionError,
  NotFound,
  WrongContent,
  EmailExists,
  NotRegistered,
  Unauthorized,
  CustomError,
  BadRequest,
  Unauthenticated,
  TokenError,
};
