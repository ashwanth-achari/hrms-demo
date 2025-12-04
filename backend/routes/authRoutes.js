const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Example placeholder route
router.get("/me", authController.getMe);

module.exports = router;
