/* eslint-disable functional/no-expression-statement */
import mongoose from "mongoose";
import { DB_IP, DB_PASS, DB_PORT, DB_USER } from "./env.js";
import { tryCatch } from "ramda";

const mongoUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_IP}:${DB_PORT}/?authSource=admin`;

mongoose.set("useCreateIndex", true);
const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mongoConnectSuccess = mongo => () => {
  mongo.connect(mongoUrl, mongoOptions);
  console.info("Logged into MongoDb");
};

const mongoConnectError = error => console.error(error);

export const mongoConnect = tryCatch(
  mongoConnectSuccess(mongoose),
  mongoConnectError
);
