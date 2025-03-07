require("dotenv").config();

const cboRoutes = require("./routes/cbos"); // ✅ Correct name
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//Validate environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error("❌ Missing required environment variables (MONGO_URI or PORT)");
    process.exit(1);
}

// Express app
const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.path); // ✅ Debugging
    next();
});

// Routes
app.use("/api/cbos", cboRoutes); // ✅   name
app.use("/api/cbo", cboRoutes); 

// Connect to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`✅ Connected to DB and listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection error:", error);
        process.exit(1); // Exit process if DB fails to connect
    });
