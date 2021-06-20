import { Router } from "express";
import posts from "../controllers/post.js";

const router = Router();

router.route("/").get(posts.index).post(posts.create);
router.route("/:id").get(posts.show).patch(posts.update).delete(posts.remove);

export default router;
