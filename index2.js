const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4001;

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
}));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const router = require('./router2'); // make sure router2.js exists
app.use('/things', router);

// Root test route
app.get('/', (req, res) => {
    res.send("Server is working...");
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, msg: "Server error", error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
