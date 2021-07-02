import express from "express";
import mongoose from "mongoose";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_IP = process.env.DB_IP || "mongo";
const mongoUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_IP}:${DB_PORT}/?authSource=admin`;
console.log(DB_USER, DB_PASS);
let store = RedisStore(session);
let redisClient = redis.createClient({
  host: process.env.REDIS_URL || "redis",
  port: process.env.REDIS_PORT || 6379,
});
mongoose.set("useCreateIndex", true);

if (!DB_PASS) {
  console.error("No value for DB_PASS found in .env file");
}

if (!DB_USER) {
  console.error("No value for DB_USER found in .env file");
}

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
