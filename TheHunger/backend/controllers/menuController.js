import menuModel from "../models/menuModel";

// ✅ Fetch all menu items
export const getAllMenus = async (req, res) => {
  try {
    const items = await MenuModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items" });
  }
};

// ✅ Fetch menu items by category
export const getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await menuModel.find({ menu_name: category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category items" });
  }
};
