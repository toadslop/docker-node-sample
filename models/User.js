import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  userpass: {
    type: String,
    required: [true, "User must have a password"],
  },
});

const User = model("User", userSchema);
export default User;
