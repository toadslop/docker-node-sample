import express from "express";
import mongoose from "mongoose";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";
import cors from "cors";
import { PORT, DB_IP, DB_PASS, DB_PORT, DB_USER } from "./config/env.js";

const app = express();

const mongoUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_IP}:${DB_PORT}/?authSource=admin`;

const store = RedisStore(session);
const redisClient = redis.createClient({
  host: process.env.REDIS_URL || "redis",
  port: process.env.REDIS_PORT || 6379,
});
// eslint-disable-next-line functional/no-expression-statement
mongoose.set("useCreateIndex", true);

(async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.info("Logged into mongoDb");
  } catch (error) {
    console.error(error);
  }
})();

app.enable("trust proxy");
app.use(cors({}));

app.use(
  session({
    store: new store({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "asdfghjkl",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 300000,
    },
  })
);
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("<h2>I love hamburgers!!!.</h2>");
  console.log("lalal");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => console.info(`listening on port ${PORT}`));
