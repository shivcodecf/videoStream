import { processVideo } from "../services/videoProcessor.js";
import fs from "fs";
import path from "path";
import { Video } from "../models/video.schema.js";

// 📤 Upload video
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No video file uploaded" });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const video = await Video.create({
      title,
      filename: req.file.filename,
      userId: req.user.id,
      status: "processing",
    });

    // start processing (async)
    processVideo(video);

    res.status(201).json({
      msg: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Upload failed" });
  }
};

// 📃 Get all videos (user-specific)
export const getVideos = async (req, res) => {
  try {
    const { status, sensitivity } = req.query;

    const filter = {
      userId: req.user.id,
    };

    if (status) filter.status = status;
    if (sensitivity) filter.sensitivity = sensitivity;

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch videos" });
  }
};

// ❌ Optional (delete video - bonus feature)
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    await video.deleteOne();

    res.json({ msg: "Video deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Delete failed" });
  }
};

// 🎥 Stream video with range support
export const streamVideo = (req, res) => {
  try {
    const { filename } = req.params;

    const videoPath = path.join("uploads", filename);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ msg: "Video not found" });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
      return res.status(400).json({ msg: "Range header required" });
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;

    const fileStream = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Streaming error" });
  }
};
