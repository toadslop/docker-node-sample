import Post from "../models/Post.js";

const index = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

const show = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

const create = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

const update = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

const remove = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

const posts = { index, show, create, remove, update };
export default posts;
