import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./router";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const MONGO_USER = "kipsi-mongo-system-user";
const MONGO_PW = "J6oQ4ckBa362tGCj";
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@kipsi-assessment-cluste.ugvlnaz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", console.log);

app.use("/api", router());
