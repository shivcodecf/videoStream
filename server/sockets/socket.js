import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config()

let io;

const FRONTEND_URL = process.env.FRONTEND_URL;

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// 🔌 Initialize socket server
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: FRONTEND_URL, 
      methods: ["GET", "POST"],
      credentials: true, 
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // Join room (optional)
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};


export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};