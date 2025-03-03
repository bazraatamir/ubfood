const express = require("express");
const router = express.Router();
const restaurantDetailsController = require("../controllers/restaurantDetails.controller");

router.post("/", restaurantDetailsController.create);
router.get("/", restaurantDetailsController.findAll);
router.get("/:id", restaurantDetailsController.findOne);
router.get(
  "/restaurant/:restaurantId",
  restaurantDetailsController.findByRestaurantId
);
router.put("/:id", restaurantDetailsController.update);
router.delete("/:id", restaurantDetailsController.delete);

module.exports = router;
