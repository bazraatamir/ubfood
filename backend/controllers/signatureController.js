const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a Signature Dish
const createSignatureDish = async (req, res) => {
  const { restaurantId, name, description, price, imageUrl } = req.body;

  try {
    const newDish = await prisma.signatureDish.create({
      data: {
        restaurantId,
        name,
        description,
        price,
        imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Signature dish created successfully", newDish });
  } catch (error) {
    console.error("Error creating signature dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all Signature Dishes for a Restaurant
const getSignatureDishes = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const dishes = await prisma.signatureDish.findMany({
      where: { restaurantId: parseInt(restaurantId) },
    });

    if (dishes.length === 0) {
      return res
        .status(404)
        .json({ message: "No signature dishes found for this restaurant" });
    }

    res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching signature dishes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Signature Dish
const updateSignatureDish = async (req, res) => {
  const { dishId } = req.params;
  const { name, description, price, imageUrl } = req.body;

  try {
    const updatedDish = await prisma.signatureDish.update({
      where: { id: parseInt(dishId) },
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    });

    res
      .status(200)
      .json({ message: "Signature dish updated successfully", updatedDish });
  } catch (error) {
    console.error("Error updating signature dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a Signature Dish
const deleteSignatureDish = async (req, res) => {
  const { dishId } = req.params;

  try {
    await prisma.signatureDish.delete({
      where: { id: parseInt(dishId) },
    });

    res.status(200).json({ message: "Signature dish deleted successfully" });
  } catch (error) {
    console.error("Error deleting signature dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createSignatureDish,
  getSignatureDishes,
  updateSignatureDish,
  deleteSignatureDish,
};
