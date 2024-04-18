const User = require("../models/USER");

module.exports = {
    update: async (req, res) => {
        const userId = req.params.userId;
        const userDataToUpdate = req.body; // Assuming the updated user data is sent in the request body

        try {
            // Find the user by userId and update with new data
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                userDataToUpdate,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found." });
            }

            return res.status(200).json({
                message: "User updated successfully.",
                user: updatedUser,
            });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    },
};
