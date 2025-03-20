require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cboRoutes = require("./routes/cbos");
const multer = require("./middleware/multer");

const app = express();

// ✅ Serve Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ CORS Configuration
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    })
);

// ✅ Multer Middleware (Must be **Before** `express.json()`)
app.use(
    multer.fields([
        { name: "rctResolution", maxCount: 1 },
        { name: "dti", maxCount: 1 },
        { name: "sec", maxCount: 1 },
        { name: "cda", maxCount: 1 },
        { name: "csoNpoNgoPo", maxCount: 1 },
        { name: "doleRule1020", maxCount: 1 },
        { name: "bankBook", maxCount: 1 },
        { name: "auditedFinancialStatement", maxCount: 1 },
        { name: "latestITR", maxCount: 1 },
        { name: "salesInvoice", maxCount: 1 },
        { name: "businessPermit", maxCount: 1 },
        { name: "ffeDis", maxCount: 1 },
        { name: "birRegistration", maxCount: 1 },
        { name: "rsbsa", maxCount: 1 },
        { name: "fishAr", maxCount: 1 },
        { name: "fda", maxCount: 1 },
        { name: "agrarianReformBeneficiaries", maxCount: 1 },
        { name: "farmersAssociation", maxCount: 1 },
        { name: "irrigatorsAssociation", maxCount: 1 },
        { name: "laborUnionsWorkersAssoc", maxCount: 1 },
    ])
);

// ✅ Parse JSON AFTER multer
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Debugging Middleware
app.use((req, res, next) => {
    console.log(`🟢 ${req.method} Request to ${req.path}`);
    console.log("🔹 Body:", req.body);
    console.log("🔹 Files:", req.files);
    next();
});

// ✅ API Routes
app.use("/api/cbos", cboRoutes);

// ✅ Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`✅ Connected to DB and listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection error:", error);
        process.exit(1);
    });

    app.use((err, req, res, next) => {
        console.error("❌ Global Error:", err);
        res.status(500).json({ error: "Internal Server Error. Please check backend logs." });
    });