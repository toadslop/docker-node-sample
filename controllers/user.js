import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createEntity, tryCrud } from "./controllerUtils/index.js";
import { lensPath, set } from "ramda";

const sessionUserLens = lensPath(["session", "user"]);

const createUser = createEntity(User);
const tryCreateUser = tryCrud(createUser);

const signUp = async (req, res) => {
  const { username, userpass } = req.body;
  const hashpassword = await bcrypt.hash(userpass, 12);
  const result = await tryCreateUser({ username, userpass: hashpassword });
  const reqWithUser = set(sessionUserLens)(result.data)(req);
  return { res: res.status(result.code).json(result), req: reqWithUser };
};

const login = async (req, res) => {
  const { username, userpass } = req.body;
  try {
    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      return res.status(404).json({
        status: "fail",
        message: "user not found"
      });
    }

    const isCorrect = bcrypt.compare(userpass, currentUser.userpass);

    if (isCorrect) {
      req.session.user = currentUser;
      res.status(200).json({
        status: "success"
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Incorrect username or password."
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail"
    });
  }
};

const user = { signUp, login };
export default user;
