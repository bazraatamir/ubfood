const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register a new restaurant
const register = async (req, res) => {
  try {
    const { name, email, password, contactInfo } = req.body;

    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { email },
    });

    if (existingRestaurant) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        contactInfo,
      },
    });

    res
      .status(201)
      .json({ message: "Restaurant registered successfully", newRestaurant });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login a restaurant
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const restaurant = await prisma.restaurant.findUnique({ where: { email } });

    if (!restaurant) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      restaurant.passwordHash
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ restaurantId: restaurant.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all restaurants
const getAllRestaurants = async (_req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single restaurant by ID
const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) },
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update restaurant details
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contactInfo } = req.body;

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: { name, email, contactInfo },
    });

    res.json(updatedRestaurant);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.restaurant.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const uploadRestaurantImage = async (req, res) => {
  try {
    const { restaurantId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newImage = await prisma.restaurantImage.create({
      data: {
        url: imageUrl,
        restaurantId: parseInt(restaurantId),
      },
    });

    res.status(201).json({ message: "Image uploaded successfully", newImage });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getRestaurantImages = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const images = await prisma.restaurantImage.findMany({
      where: { restaurantId: parseInt(restaurantId) },
    });

    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRestaurantImages,
  uploadRestaurantImage,
  register,
  login,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
