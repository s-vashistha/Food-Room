import foodModel from "../models/foodModel.js";
import fs from "fs";

// ✅ Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("🔥 Error fetching food list:", error);
        res.status(500).json({ success: false, message: "Error fetching food list", error: error.message });
    }
};

// ✅ Add a new food item
const addFood = async (req, res) => {
    try {
        console.log("📌 Received Add Food Request:", req.body);
        console.log("📸 Image Uploaded:", req.file);

        // Validate required fields
        const { name, description, price, category } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        let image_filename = req.file ? req.file.filename : null;

        const food = new foodModel({
            name,
            description: description || "", // Ensure description is not undefined
            price,
            category,
            image: image_filename,
        });

        await food.save();
        res.json({ success: true, message: "Food Added", data: food });
    } catch (error) {
        console.error("🔥 Error adding food item:", error);
        res.status(500).json({ success: false, message: "Error adding food item", error: error.message });
    }
};

// ✅ Remove a food item
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(`🗑️ Attempting to remove food with ID: ${id}`);

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete image file
        if (food.image) {
            const imagePath = `uploads/${food.image}`;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("⚠️ Error deleting image:", err.message);
                } else {
                    console.log(`✅ Image deleted: ${imagePath}`);
                }
            });
        }

        await foodModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error("🔥 Error removing food item:", error);
        res.status(500).json({ success: false, message: "Error removing food item", error: error.message });
    }
};

// ✅ Get food items by category
const getFoodByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log(`📂 Fetching food by category: ${category}`);

        const foods = await foodModel.find({ category });

        if (foods.length > 0) {
            res.json({ success: true, data: foods });
        } else {
            res.status(404).json({ success: false, message: "No food found in this category" });
        }
    } catch (error) {
        console.error("🔥 Error fetching category items:", error);
        res.status(500).json({ success: false, message: "Error fetching category items", error: error.message });
    }
};

export { listFood, addFood, removeFood, getFoodByCategory };
