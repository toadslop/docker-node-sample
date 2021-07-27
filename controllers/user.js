import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createEntity, findOne, tryCrud } from "./controllerUtils/index.js";
import { UNAUTHORIZED } from "./controllerUtils/responses.js";
import { lensPath, set, omit } from "ramda";

const sessionUserLens = lensPath(["session", "user"]);

const createUser = createEntity(User);
const findOneUser = findOne(User);

const tryCreateUser = tryCrud(createUser);

const loginSuccess = (req) => (res) => (result) => {
  const reqWithUser = set(sessionUserLens)(result.data)(req);
  return {
    res: res.status(result.code).json(result),
    req: reqWithUser
  };
};

const loginFail = (res) => (req) => {
  const result = UNAUTHORIZED();
  return { res: res.status(result.code).json(result), req };
};

const checkCredentials = (req) => (res) => (result) =>
  bcrypt.compare(req.body.userpass, result.data.userpass)
    ? loginSuccess(req)(res)(result)
    : loginFail(res)(req);

const tryFindOneUser = tryCrud(findOneUser);

const signUp = async (req, res) => {
  const { username, userpass } = req.body;
  const hashpassword = await bcrypt.hash(userpass, 12);
  const result = await tryCreateUser({ username, userpass: hashpassword });
  const reqWithUser = set(sessionUserLens)(result.data)(req);
  return { res: res.status(result.code).json(result), req: reqWithUser };
};

const login = async (req, res) => {
  const { username } = req.body;
  const result = await tryFindOneUser({ username: username });
  return checkCredentials(req)(res)(result);
};

const user = { signUp, login };
export default user;
