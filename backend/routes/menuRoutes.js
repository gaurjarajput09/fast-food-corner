const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem"); 

// GET ALL MENU ITEMS FROM MONGODB
router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find(); 
    res.json(menu);
  } catch (err) {
    console.log("Menu Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;