import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Fix: Use bcryptjs for ES module compatibility
import validator from "validator";
import userModel from "../models/userModel.js";

// Create token with expiration time
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Fix: Added token expiry
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate Token
        const token = createToken(user._id);
        return res.status(200).json({ success: true, token, message: "Login successful" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate Email Format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate Strong Password
        if (!validator.isStrongPassword(password, { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters and include uppercase, number, and special character" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save User
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Generate Token
        const token = createToken(user._id);
        return res.status(201).json({ success: true, token, message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { loginUser, registerUser };
