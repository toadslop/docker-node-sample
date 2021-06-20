import User from "../models/User.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { username, userpass } = req.body;
  try {
    const hashpassword = await bcrypt.hash(userpass, 12);
    const newUser = await User.create({ username, userpass: hashpassword });
    res.status(201).json({
      status: "sucess",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

const login = async (req, res) => {
  const { username, userpass } = req.body;
  try {
    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
    const isCorrect = bcrypt.compare(userpass, currentUser.password);

    if (isCorrect) {
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Incorrect username or password.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

const user = { signUp, login };
export default user;
