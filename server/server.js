require("dotenv").config();

const express = require("express");
var cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");

// Create a connection to MongoDB
const connectDB = require("./config/Database.config");
connectDB();

const app = express();
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "http://localhost:5173"],
        },
    })
);
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client/build")));

app.use(require("./routes"));

// Start the server
app.listen(process.env.PORT || null, () => {
    console.log(`Server is running on port ${process.env.PORT || null}`);
});
