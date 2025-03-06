import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Add a simple GET request to check if this route is working
userRouter.get("/", (req, res) => {
    res.send("User API is working");
});

export default userRouter;
