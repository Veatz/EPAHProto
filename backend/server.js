require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cboRoutes = require("./routes/cbos");
const multer = require("./middleware/multer");
const CBOMODEL = require("./models/CBO"); // ✅ Ensure correct path

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
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// ✅ Debugging Middleware
app.use((req, res, next) => {
    console.log(`🟢 ${req.method} Request to ${req.path}`);
    console.log("🔹 Body:", req.body);
    console.log("🔹 Files:", req.files);
    next();
});

// For File Upload
app.post("/api/cbos", async (req, res) => {
    try {
        console.log("🟢 Upload Request Received");
        console.log("🔹 Body:", req.body);
        console.log("🔹 Files:", req.files);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        // ✅ Parse JSON fields properly
        const parsedData = {
            ...req.body,
            operationDetails: JSON.parse(req.body.operationDetails || "{}"),
            primaryContact: JSON.parse(req.body.primaryContact || "{}"),
            secondaryContact: JSON.parse(req.body.secondaryContact || "{}"),
        };

        // ✅ Fix `representation` extra quotes issue
        if (parsedData.representation) {
            parsedData.representation = parsedData.representation.replace(/['"]+/g, '');
        }

        // ✅ Ensure uploaded files are mapped correctly
        let filesData = {};
        Object.keys(req.files).forEach((field) => {
            filesData[field] = { file: req.files[field][0].filename };

            // ✅ Add subfields from req.body
            if (req.body[field]) {
                try {
                    const subfields = JSON.parse(req.body[field]); // Ensure it's parsed correctly
                    filesData[field] = { ...filesData[field], ...subfields };
                } catch (error) {
                    console.error(`❌ Error parsing subfields for ${field}:`, error);
                }
            }
        });

        parsedData.files = filesData; // ✅ Attach files correctly

        // ✅ Save to MongoDB
        const newCBO = new CBOMODEL(parsedData);
        await newCBO.save();

        res.json({ message: "Upload successful", cbo: newCBO });

    } catch (error) {
        console.error("❌ Error handling upload:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Getting the Files for Display
app.get("/api/cbos/:id", async (req, res) => {
    try {
        const cbo = await CBOMODEL.findById(req.params.id);
        if (!cbo) return res.status(404).json({ error: "CBO not found" });

        console.log("🟢 Sending CBO Data:", JSON.stringify(cbo, null, 2)); // ✅ Log formatted data
        console.log("🔹 CBO Files:", cbo.files || "No files found"); // ✅ Check if files exist

        res.json(cbo);
    } catch (err) {
        console.error("❌ Error fetching CBO:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error: "File too large. Max size is 25MB." });
        }
        console.error("❌ Global Error:", err);
        res.status(500).json({ error: "Internal Server Error. Please check backend logs." });
    });