import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";
import { REDIS_PORT, REDIS_URL, SESSION_SECRET } from "./env.js";

const store = RedisStore(session);
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const redisConfig = {
  store: new store({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 300000,
  },
};

export const redisSessions = session(redisConfig);
