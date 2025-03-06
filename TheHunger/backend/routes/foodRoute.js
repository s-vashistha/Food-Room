import express from 'express';
import { addFood, listFood, removeFood, getFoodByCategory } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engine (Saving Image to uploads folder & renaming it)
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.get("/list", listFood); // Get all food items
foodRouter.post("/add", upload.single('image'), addFood); // Add new food item
foodRouter.post("/remove", removeFood); // Remove a food item

// ✅ New Route: Fetch food items by category
foodRouter.get("/menu/:category", getFoodByCategory);

// Debugging route
foodRouter.get("/", (req, res) => {
    res.send("Food API is working");
});

export default foodRouter;
