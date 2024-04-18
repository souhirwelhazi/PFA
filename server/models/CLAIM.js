const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  name: String,
  sujet: String,
  address: String,
  phoneNumber: String,
  voiceRecording: {
    data: Buffer,
    contentType: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
