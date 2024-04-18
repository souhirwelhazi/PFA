const User = require("../models/USER");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = {
    add: async (req, res) => {
        try {
            // Extract data from the request body
            const {
                firstName,
                lastName,
                email,
                phone,
                address,
                password,
                role,
            } = req.body;

            console.log(req.body);

            // Check if a user with the provided email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ error: "User with this email already exists" });
            }

            // Concatenate first name and last name to create userName
            const userName = firstName + " " + lastName;
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user instance
            const newUser = new User({
                userId: new mongoose.Types.ObjectId(),
                userName,
                email,
                phone,
                address,
                password: hashedPassword,
                Role: role,
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).json({
                message: "User added successfully",
                newUser,
            });
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
