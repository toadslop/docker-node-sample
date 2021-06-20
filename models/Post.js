import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Post must have a title."],
  },
  body: {
    type: String,
    required: [true, "Post most have a body."],
  },
});
const Post = model("Post", postSchema);
console.log("POST FIND", Post.find);
export default Post;
