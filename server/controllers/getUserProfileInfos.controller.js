const User = require("../models/USER");

module.exports = {
  userData: async (req, res) => {
    try {
      const { userId } = req.params;

      console.log(userId);

      const user = await User.findOne({ userId: userId });

      if (!user) {
        console.log("User not found with ID:", userId);
        return res.status(404).send("User not found.");
      }

      res.status(201).json({ user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
};
