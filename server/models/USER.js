const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Role: {
        type: String,
        required: true,
        enum: ["candidat", "admin", "moniteur", "secretaire"],
        default: "Candidat",
    },
    allClaims: [{ type: mongoose.Schema.Types.ObjectId, ref: "Claim" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
