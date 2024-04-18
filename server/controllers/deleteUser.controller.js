const User = require("../models/USER");

module.exports = {
    deleteUser: async (req, res) => {
        const userId = req.params.userId;

        try {
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ message: "User not found." });
            }

            return res
                .status(200)
                .json({ message: "User deleted successfully." });
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    },
};
