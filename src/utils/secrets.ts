import * as dotenv from "dotenv";
import * as _ from "lodash";
import * as path from "path";

dotenv.config({ path: ".env" });

export const ENVIRONMENT = _.defaultTo(process.env.APP_ENV, "dev");
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const APP_PORT = _.defaultTo(process.env.APP_PORT, 3006);
export const LOG_DIRECTORY = _.defaultTo(
  process.env.LOG_DIRECTORY,
  path.resolve("applogs")
);
export const RSA_PRIVATE_KEY = _.defaultTo(
  process.env.RSA_PRIVATE_KEY,
  "secret"
);
export const RSA_PUBLIC_KEY = _.defaultTo(process.env.RSA_PUBLIC_KEY, "secret");
export const SESSION_SECRET = _.defaultTo(process.env.SESSION_SECRET, "secret");

export const ENCRYPTION_SECRET = _.defaultTo(
  dotenv.config().parsed?.ENCRYPTION_SECRET,
  ""
);
export const CLIENT_ID = _.defaultTo(dotenv.config().parsed?.CLIENT_ID, "");
export const CLIENT_SECRET = _.defaultTo(
  dotenv.config().parsed?.CLIENT_SECRET,
  ""
);

export const DB = {
  USER: _.defaultTo(dotenv.config().parsed?.USER, ""),
  PASSWORD: _.defaultTo(dotenv.config().parsed?.PW, ""),
  HOST: _.defaultTo(dotenv.config().parsed?.HOST, ""),
  DATABASE: _.defaultTo(dotenv.config().parsed?.DATABASE, ""),
};

export const EMAIL = {
  EMAIL_SERVICE: _.defaultTo(dotenv.config().parsed?.EMAIL_SERVICE, ""),
  EMAIL_HOST: _.defaultTo(dotenv.config().parsed?.EMAIL_HOST, ""),
  EMAIL_USER: _.defaultTo(dotenv.config().parsed?.EMAIL_USER, ""),
  EMAIL_PASSWORD: _.defaultTo(dotenv.config().parsed?.EMAIL_PASSWORD, ""),
};
