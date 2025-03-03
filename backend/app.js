const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS тохиргоо
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const restaurantDetailsRoutes = require("./routes/restaurantDetails.routes");
app.use("/api/restaurant-details", restaurantDetailsRoutes);

// Алдаа боловсруулах middleware
app.use((err, req, res, next) => {
  console.error("Алдаа гарлаа:", err);
  res.status(500).json({
    status: "error",
    message: "Серверийн алдаа гарлаа!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 алдаа
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Хуудас олдсонгүй!",
  });
});

// Сервер эхлүүлэх
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр ажиллаж байна`);
});

module.exports = app;
