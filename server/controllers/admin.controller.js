const Claim = require("../models/CLAIM");
const User = require("../models/USER");

module.exports = {
  getReaclamation: async (req, res) => {
    try {
      const claimHistory = await Claim.find();

      res.status(200).json(claimHistory);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();

      res.status(200).json({ users: allUsers });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
  reclamationConfirmation: async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const user = await User.findById(userId);

      if (!user) {
        console.log("User not found with ID:", userId);
        return res.status(404).json({ message: "User not found." });
      }

      const claim = await Claim.findOneAndUpdate(
        { user: user._id, confirmed: false },
        { $set: { confirmed: true } },
        { new: true }
      );

      if (!claim) {
        return res
          .status(404)
          .json({ message: "No unconfirmed claims found for this user." });
      }

      res.status(201).json({ message: "Claim confirmed successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
};
