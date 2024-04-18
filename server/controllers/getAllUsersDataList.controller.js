const User = require("../models/USER"); // Import the User model

module.exports = {
    getAllCandidates: async (req, res) => {
        try {
            const candidates = await User.find({ Role: "candidat" });
            return res.status(200).json(candidates);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getAllSecretaires: async (req, res) => {
        try {
            const secretaires = await User.find({ Role: "secretaire" });
            return res.status(200).json(secretaires);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getAllMoniteurs: async (req, res) => {
        try {
            const moniteurs = await User.find({ Role: "moniteur" });
            return res.status(200).json(moniteurs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
