const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ---- CREATE UPLOADS FOLDER IF NOT EXISTS ----
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ---- MULTER STORAGE CONFIG ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep original extension
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ---------------- GET ALL IMAGES ----------------
router.get("/images", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading uploads folder" });

    const images = files.map((file) => ({
      filename: file,
      url: `http://localhost:4001/uploads/${file}`,
    }));

    res.json(images);
  });
});

// ---------------- UPLOAD IMAGE ----------------
router.post("/upload", upload.single("avtar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    success: true,
    message: "Image uploaded successfully",
    filename: req.file.filename,
    url: `http://localhost:4001/uploads/${req.file.filename}`,
  });
});

module.exports = router;
