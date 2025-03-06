import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // Order status
    orderDate: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
