import multer from "multer";
import path from "path";
import fs from "fs";


const uploadDir = path.resolve("uploads");


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);

    cb(null, uniqueName + ext);
  },
});


const fileFilter = (req, file, cb) => {
  console.log("Uploading file type:", file.mimetype); 

  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, 
  },
});