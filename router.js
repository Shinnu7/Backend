const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const filepath = path.join(__dirname, "file.json");

// Ensure file exists
if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, "[]", "utf-8");

// Helper functions
function readData() {
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// ----------------------- SIGNUP -----------------------
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  const data = readData();
  const exists = data.find((u) => u.email === email);

  if (exists) return res.json({ msg: "User already exists" });

  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };

  data.push(newUser);
  writeData(data);

  res.json({ msg: "User registered successfully", data: newUser });
});

// ----------------------- SIGNIN -----------------------
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const data = readData();

  const user = data.find((u) => u.email === email && u.password === password);

  if (!user) return res.json({ msg: "Register first!" });

  res.json({ msg: "Login successful", data: user });
});

// ----------------------- UPDATE -----------------------
router.put("/update", (req, res) => {
  const { id, name, email, password } = req.body;
  const data = readData();

  const index = data.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ msg: "User not found" });

  // Update only provided fields
  data[index] = {
    ...data[index],
    name: name || data[index].name,
    email: email || data[index].email,
    password: password || data[index].password
  };

  writeData(data);

  res.json({ msg: "User updated successfully", data: data[index] });
});

// ----------------------- GET ALL USERS -----------------------
router.get("/users", (req, res) => {
  const data = readData();
  res.json(data);
});

module.exports = router;
