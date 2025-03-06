import express from "express";
import userRouter from "./userRoute.js";
import foodRouter from "./foodRoute.js";
import cartRouter from "./cartRoute.js";
import orderRouter from "./orderRoute.js";

const router = express.Router();

// Debugging log
console.log("🔹 Registering API Routes...");

router.use("/user", userRouter);
console.log("✅ /api/user registered");

router.use("/food", foodRouter);
console.log("✅ /api/food registered");

router.use("/cart", cartRouter);
console.log("✅ /api/cart registered");

router.use("/order",orderRouter);
console.log("✅ /api/order registered");

// Root API Response (For debugging)
router.get("/", (req, res) => {
  res.json({
    message: "API Index - Available Routes",
    routes: ["/api/user", "/api/food", "/api/cart", "/api/order"],
  });
});

export default router;