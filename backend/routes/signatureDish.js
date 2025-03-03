const express = require("express");
const {
  createSignatureDish,
  getSignatureDishes,
  updateSignatureDish,
  deleteSignatureDish,
} = require("../controllers/signatureController");

const router = express.Router();

// Create a new signature dish
router.post("/", createSignatureDish);

// Get all signature dishes for a specific restaurant
router.get("/:restaurantId", getSignatureDishes);

// Update an existing signature dish
router.put("/:dishId", updateSignatureDish);

// Delete a signature dish
router.delete("/:dishId", deleteSignatureDish);

module.exports = router;
