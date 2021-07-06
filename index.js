/* eslint-disable functional/no-expression-statement */
import express from "express";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import { PORT } from "./config/env.js";
import { redisSessions } from "./config/redis.js";
import { mongoConnect } from "./config/mongo.js";

mongoConnect();
const app = express();

app.enable("trust proxy");
app.use(cors({}));

app.use(redisSessions);
app.use(express.json());

app.get("/api", (req, res) => res.send("<h2>Sup bro.</h2>"));

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => console.info(`listening on port ${PORT}`));
