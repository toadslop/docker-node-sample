import { Router } from "express";
import posts from "../controllers/post.js";
import { protect } from "../middleware/authMiddleware";

const postRouter = Router();

postRouter.route("/").get(posts.index).post(protect, posts.create);
postRouter
  .route("/:id")
  .get(posts.show)
  .patch(protect, posts.update)
  .delete(protect, posts.remove);

export default postRouter;
