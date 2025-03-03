const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const path = require("path");

const app = express();
const prisma = new PrismaClient();

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

// Статик файлуудын зам
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const restaurantDetailsRoutes = require("./routes/restaurantDetails.routes");
const authRoutes = require("./routes/auth");
const signatureRoutes = require("./routes/signatureDish");

app.use("/api/restaurant-details", restaurantDetailsRoutes);
app.use("/auth", authRoutes);
app.use("/signature", signatureRoutes);

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
