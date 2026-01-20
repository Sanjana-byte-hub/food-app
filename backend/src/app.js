const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed origins for CORS
const allowedOrigins = [
  "https://food-app-zeta-swart.vercel.app",
  "https://food-app-git-main-sanjana-byte-hubs-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server or Postman
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight OPTIONS requests
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.header("Access-Control-Allow-Credentials", "true");
    }
    return res.sendStatus(204);
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);


app.get("/", (req, res) => res.send("Backend is running"));

module.exports = app;
