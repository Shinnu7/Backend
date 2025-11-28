const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ---- AUTO CREATE UPLOADS FOLDER ----
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Get all uploaded images
router.get("/images", (req, res) => {
    fs.readdir("uploads", (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error reading folder" });
        }

        const images = files.map(file => ({
            filename: file,
            url: `http://localhost:4001/uploads/${file}`
        }));
        console.log(images)

        res.json(images);
    });
});

// // Multer Storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });
const upload = multer({ dest: './uploads/' });

// Route
router.post("/upload", upload.single("avtar"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File not uploaded" });
    }
    res.send({
        message: "Image uploaded successfully",
        filename: req.file.filename,
        url: `http://localhost:4001/uploads/${req.file.filename}`
    });
});

module.exports = router;
