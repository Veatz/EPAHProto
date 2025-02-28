require("dotenv").config();

const cboRoutes = require("./routes/cbos"); // ✅ Correct name
const mongoose = require("mongoose");
const express = require("express");

// Express app
const app = express();

// Middleware
app.use(express.json());
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
