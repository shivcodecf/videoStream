import express from "express";
import { upload } from "../middlewares/upload.js";
import { auth } from "../middlewares/auth.js";


import { uploadVideo, getVideos,streamVideo } from "../controllers/video.controller.js";



const router = express.Router();


router.post(
  "/upload",
  auth,

  upload.single("video"),
  uploadVideo,
);


router.get("/", auth, getVideos);


router.get("/stream/:filename", streamVideo);

export default router;
