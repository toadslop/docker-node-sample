import { warnDbUserEmpty, warnDbPassEmpty } from "../utils/logger.js";

const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_PASS = warnDbPassEmpty(process.env.DB_PASS);
const DB_USER = warnDbUserEmpty(process.env.DB_USER);
const DB_IP = process.env.DB_IP || "mongo";

export { PORT, DB_IP, DB_PASS, DB_PORT, DB_USER };
