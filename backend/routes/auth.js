const express = require("express");
const multer = require("multer");
const {
  uploadRestaurantImage,
  login,
  register,
} = require("../controllers/userController");

const router = express.Router();

// Multer storage setup (ensure 'uploads/' folder exists)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/register", register);
router.post("/login", login);
router.post("/upload", upload.single("image"), uploadRestaurantImage);

module.exports = router;
