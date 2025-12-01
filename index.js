const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4001;

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // your React app
  methods: "GET,POST,PUT,DELETE",
  optionsSuccessStatus: 200 // legacy browsers support
};
app.use(cors(corsOptions));

// Import routes
const router = require("./router");
app.use("/things", router);

// Test route
app.get("/", (req, res) => {
  res.send("Hello ji ... Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
