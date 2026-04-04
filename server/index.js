import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";

import authRoutes from "./routes/auth.route.js";
import videoRoutes from "./routes/video.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";

import { initSocket } from "./sockets/socket.js";
import connectDB from "./config/db.js";



const app = express();


const server = createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL;


app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);


connectDB();


initSocket(server);


const PORT = process.env.PORT || 720;

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});