const prisma = require("../database/index"); // Prisma Client-ийг импортлох

// Ресторан дэлгэрэнгүй мэдээлэл үүсгэх
exports.create = async (req, res) => {
  try {
    const restaurantDetails = await prisma.restaurantDetails.create({
      data: {
        restaurantId: req.body.restaurantId,
        description: req.body.description,
        location: req.body.location,
        district: req.body.district,
        mainImage: req.body.mainImage,
      },
    });
    res.status(201).json(restaurantDetails);
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    res.status(400).json({
      message: "Ресторан дэлгэрэнгүй мэдээлэл үүсгэхэд алдаа гарлаа!",
    });
  }
};

// Бүх ресторан дэлгэрэнгүй мэдээлэл авах
exports.findAll = async (req, res) => {
  try {
    const restaurantDetails = await prisma.restaurantDetails.findMany();
    res.json(restaurantDetails);
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    res.status(500).json({ message: "Серверийн алдаа гарлаа!" });
  }
};

// Тухайн id-р ресторан дэлгэрэнгүй мэдээлэл авах
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantDetails = await prisma.restaurantDetails.findUnique({
      where: { id: parseInt(id) },
    });
    if (!restaurantDetails) {
      return res
        .status(404)
        .json({ message: "Ресторан дэлгэрэнгүй мэдээлэл олдсонгүй!" });
    }
    res.json(restaurantDetails);
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    res.status(500).json({ message: "Серверийн алдаа гарлаа!" });
  }
};

// Ресторан id-р ресторан дэлгэрэнгүй мэдээлэл авах
exports.findByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurantDetails = await prisma.restaurantDetails.findMany({
      where: { restaurantId: parseInt(restaurantId) },
    });
    if (!restaurantDetails || restaurantDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "Ресторан дэлгэрэнгүй мэдээлэл олдсонгүй!" });
    }
    res.json(restaurantDetails);
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    res.status(500).json({ message: "Серверийн алдаа гарлаа!" });
  }
};

// Ресторан дэлгэрэнгүй мэдээлэл засварлах
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantDetails = await prisma.restaurantDetails.update({
      where: { id: parseInt(id) },
      data: {
        description: req.body.description,
        location: req.body.location,
        district: req.body.district,
        mainImage: req.body.mainImage,
      },
    });
    res.json(restaurantDetails);
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    res.status(400).json({
      message: "Ресторан дэлгэрэнгүй мэдээлэл шинэчлэхэд алдаа гарлаа!",
    });
  }
};

// Ресторан дэлгэрэнгүй мэдээлэл устгах
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.restaurantDetails.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    res.status(400).json({
      message: "Ресторан дэлгэрэнгүй мэдээлэл устгахад алдаа гарлаа!",
    });
  }
};

module.exports = exports;
