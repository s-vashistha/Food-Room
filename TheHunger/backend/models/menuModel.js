import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  menu_name: { type: String, required: true },
  menu_image: { type: String, required: true },
});

const menuModel = mongoose.model("Menu", MenuSchema);

export default menuModel;
