require("dotenv").config();
const { default: mongoose } = require("mongoose");
const User = require("../models/USER");
const bcrypt = require("bcryptjs");

module.exports = {
    async register(req, res) {
        try {
            const {
                name,
                email,
                password,
                phone,
                address,
                adminInfo,
                userType,
            } = req.body;
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            let role;

            if (userType === "candidat") {
                role = "candidat";
            } else if (userType === "admin") {
                const isMatch = adminInfo === process.env.ADMIN_PASSWORD_HASH;
                if (!isMatch) {
                    return res
                        .status(401)
                        .json({ message: "Invalid credentials" });
                }
                role = "admin";
            } else {
                return res.status(400).json({ message: "Invalid user type" });
            }

            // Create a new user
            const user = new User({
                userId: new mongoose.Types.ObjectId(),
                userName: name,
                email,
                password: hashedPassword,
                phone,
                address,
                Role: role,
            });

            // Save the new user
            await user.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};
