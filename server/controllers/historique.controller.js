const Claim = require("../models/CLAIM");
const User = require("../models/USER");

module.exports = {
  getHistory: async (req, res) => {
    try {
      const { userId } = req.params;

      console.log(userId);

      const user = await User.findOne({ userId: userId });

      if (!user) {
        console.log("User not found with ID:", userId);
        return res.status(404).send("User not found.");
      }

      const claimHistory = await Claim.find({ user: user._id });

      res.status(200).json(claimHistory);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
};
