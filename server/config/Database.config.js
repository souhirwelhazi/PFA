require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://araysimohamedali:Spkbcyk0hwzbvCjp@cluster0.relusac.mongodb.net/projet",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("----Data Base Connection------------------------");
    console.log("MONGO Connection SUCCESS !!!!");
  } catch (err) {
    console.error("MONGO Connection FAIL !!!!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
