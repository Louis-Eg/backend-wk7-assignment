const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.js");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
