import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart", cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding item to cart" });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart", cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing item from cart" });
    }
};

// Get user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart" });
    }
};

export { addToCart, removeFromCart, getCart };
