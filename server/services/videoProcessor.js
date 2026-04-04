import { Video } from "../models/video.schema.js";
import { getIO } from "../sockets/socket.js";

export const processVideo = async (video) => {
  setTimeout(async () => {
    try {
      video.status = "completed";
      video.sensitivity = Math.random() > 0.5 ? "safe" : "flagged";

      await video.save(); 

      const io = getIO();
      io.emit("videoProcessed", video);

    } catch (err) {
      console.error(err);
    }
  }, 5000);
};