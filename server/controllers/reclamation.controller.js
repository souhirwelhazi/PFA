const Claim = require("../models/CLAIM");
const User = require("../models/USER");

module.exports = {
  postRequest: async (req, res) => {
    try {
      const { name, address, phoneNumber, userId, sujet } = req.body;
      const voiceRecordingFile = req.file; // Get the uploaded audio file

      const user = await User.findOne({ userId: userId });

      if (!user) {
        console.log("User not found with ID:", userId);
        return res.status(404).send("User not found.");
      }

      const newClaim = new Claim({
        name,
        sujet,
        address,
        phoneNumber,
        user: user._id,
      });

      if (voiceRecordingFile) {
        // If an audio file was uploaded, handle it here
        newClaim.voiceRecording.data = voiceRecordingFile.buffer;
        newClaim.voiceRecording.contentType = voiceRecordingFile.mimetype;
      }

      await newClaim.save();

      user.allClaims.push(newClaim._id);
      await user.save();

      res.status(201).send("Claim submitted successfully!");
    } catch (error) {
      console.error("Error submitting claim:", error);
      res.status(500).send("An error occurred while submitting the claim.");
    }
  },
};
