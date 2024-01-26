import dotenv from "dotenv";

if (process.env.NODE_ENV) {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
} else {
  dotenv.config({ path: `.env` });
}

export default {
  ENVIRONMENT: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
  ACCESS_KEY: process.env.ACCESS_KEY,
  PORT: process.env.PORT,
};
