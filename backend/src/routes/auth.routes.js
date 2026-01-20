const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// USER AUTH
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post(
  "/user/logout",
  authMiddleware.authUserMiddleware,
  authController.logoutUser
);

// FOOD PARTNER AUTH
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.post(
  "/food-partner/logout",
  authMiddleware.authFoodPartnerMiddleware,
  authController.logoutfoodPartner
);

module.exports = router;
