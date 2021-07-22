import Post from "../models/Post.js";
import {
  find,
  findById,
  tryCrud,
  createEntity,
  findByIdAndUpdate,
  findByIdAndDelete
} from "./controllerUtils/index.js";

const findPosts = find(Post);
const findPostById = findById(Post);
const createPost = createEntity(Post);
const updatePost = findByIdAndUpdate(Post);
const removePost = findByIdAndDelete(Post);

const tryFindPosts = tryCrud(findPosts);
const tryFindPostsById = tryCrud(findPostById);
const tryCreatePost = tryCrud(createPost);
const tryUpdatePost = tryCrud(updatePost);
const tryAndRemovePost = tryCrud(removePost);

const index = async (req, res) => {
  const result = await tryFindPosts();
  return res.status(result.code).json(result);
};

const show = async (req, res) => {
  const result = await tryFindPostsById(req.params.id);
  return res.status(result.code).json(result);
};

const create = async (req, res) => {
  const result = await tryCreatePost(req.body);
  return res.status(result.code).json(result);
};

const update = async (req, res) => {
  const result = await tryUpdatePost(req.params.id, req.body);
  return res.status(result.code).json(result);
};

const remove = async (req, res) => {
  const result = await tryAndRemovePost(req.params.id);
  return res.status(result.code).json(result);
};

const posts = { index, show, create, remove, update };
export default posts;
