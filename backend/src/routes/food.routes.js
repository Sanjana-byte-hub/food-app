const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Create food (food partners only)
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

// Get all food items
router.get("/", foodController.getFoodItems);

// Like a food item (users only)
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFood);

// Save a food item (users only)
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFood);

// Get saved food (users only)
router.get("/save", authMiddleware.authUserMiddleware, foodController.getSavedFood);

module.exports = router;
