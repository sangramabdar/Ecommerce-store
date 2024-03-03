import { hash, compare, genSalt } from "bcryptjs";
import { Request } from "express";
import { getUserByEmail, saveUser } from "../repositories";
import { SignUpSchema, LoginSchema } from "../schemas";
import { EmailExists, NotRegistered, BadRequest } from "../utils/exceptions";
import { generateAccessToken } from "../utils/jwt";

async function signUpService(req: Request) {
  try {
    let { email, password } = req.body as SignUpSchema;

    let user = await getUserByEmail(email);

    if (user) throw new EmailExists();

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    let result = await saveUser({ ...req.body, password: hashPassword });

    return result;
  } catch (error) {
    throw error;
  }
}

async function loginService(req: Request) {
  try {
    const { email, password } = req.body as LoginSchema;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new NotRegistered();
    }

    const isMatched = await compare(password, user.password);

    if (!isMatched) {
      throw new BadRequest("password is not matched");
    }

    const token = await generateAccessToken(
      {
        _id: user._id,
        email: user.email,
      },
      "24h"
    );

    return {
      token,
    };
  } catch (error) {
    throw error;
  }
}

export { signUpService, loginService };
