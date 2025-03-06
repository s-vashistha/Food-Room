import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);

// Add a simple GET request to check if this route is working
cartRouter.get("/", (req, res) => {
    res.send("Cart API is working");
});

export default cartRouter;
