import express from "express";
import mongoose from "mongoose";
import router from "./routes/post.js";

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_IP = process.env.DB_IP || "mongo";
const mongoUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_IP}:${DB_PORT}/?authSource=admin`;

if (!DB_PASS) {
  console.error("No value for DB_PASS found in .env file");
}

if (!DB_USER) {
  console.error("No value for DB_USER found in .env file");
}

(async () => {
  try {
    const mongoDb = await mongoose.connect(mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.info("Logged into mongoDb");
  } catch (error) {
    console.error(error);
  }
})();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>I love hamburgers!!!.</h2>");
});

app.use("/api/v1/posts", router);

app.listen(PORT, () => console.info(`listening on port ${PORT}`));
