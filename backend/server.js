require("dotenv").config();

const cboRoutes = require("./routes/cbos"); // ✅ Correct name
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// Express app
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000", // Allow frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        allowedHeaders: ["Content-Type"], // Allowed headers
    })
);

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
    console.log(req.method, req.path); // ✅ Debugging
    next();
});

// Routes
app.use("/api/cbos", cboRoutes); // ✅   name

// Connect to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and Listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
