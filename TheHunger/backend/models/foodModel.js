import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  available: { type: Boolean, default: true }, // To track availability
  createdAt: { type: Date, default: Date.now }, // Auto timestamp
});

const FoodModel = mongoose.model("Food", FoodSchema);

export default FoodModel;
