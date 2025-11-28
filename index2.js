const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
}));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const router = require('./router2');
app.use('/things', router);

// Test route
app.get('/', (req, res) => {
    res.send("Server is working...");
});


// Start server
app.listen(4001, () => {
    console.log(`Server is running at http://localhost:4001`);
});
