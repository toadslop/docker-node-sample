import { Router } from "express";
import posts from "../controllers/post.js";

const postRouter = Router();

postRouter.route("/").get(posts.index).post(posts.create);
postRouter
  .route("/:id")
  .get(posts.show)
  .patch(posts.update)
  .delete(posts.remove);

export default postRouter;
