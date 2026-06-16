// redeploy trigger
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const bookingRoutes = require("./routes/bookingRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

const path = require("path");
const fs = require("fs");

// Dynamic image server to handle extension-less requests and name mismatches
app.use("/images/:key", (req, res, next) => {
  const key = req.params.key;
  const assetsDir = path.join(__dirname, "src", "assets");

  // 1. Try exact match (e.g. if requested with extension)
  let filePath = path.join(assetsDir, key);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }

  // 2. Map database keys to specific file names for special cases (spaces, camelCase)
  const specialMaps = {
    "aaluParathe": "aalu parathe.webp",
    "noodlesChines": "noodles-chines.webp",
    "tofuChines": "tofu-chines.webp",
    "shezwanrice": "shezwan rice.webp"
  };

  if (specialMaps[key]) {
    filePath = path.join(assetsDir, specialMaps[key]);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
  }

  // 3. Try to find a file with the key as base name and any extension
  try {
    const files = fs.readdirSync(assetsDir);
    const matchedFile = files.find(file => {
      const ext = path.extname(file);
      const nameWithoutExt = path.basename(file, ext);
      return nameWithoutExt.toLowerCase() === key.toLowerCase();
    });

    if (matchedFile) {
      filePath = path.join(assetsDir, matchedFile);
      return res.sendFile(filePath);
    }
  } catch (err) {
    console.error("Error reading assets directory:", err);
  }

  next();
});

app.use("/images", express.static(path.join(__dirname, "src", "assets")));



// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);


// Home route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

// MongoDB connect + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🍃");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });