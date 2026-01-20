const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Create food
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

// Get all food items
router.get("/", foodController.getFoodItems);

// Like
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

// Save
router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

// Get saved
router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSavedFood
);

module.exports = router;
