const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-app-zeta-swart.vercel.app",
      "https://food-app-git-main-sanjana-byte-hubs-projects.vercel.app"
    ],
    credentials: true
  })
);

// TEST ROUTE (VERY IMPORTANT)
app.get("/api/food", (req, res) => {
  res.json({ ok: true });
});

// REAL ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
