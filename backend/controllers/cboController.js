const CBO = require("../models/CBO");
const OperationDetails = require("../models/OperationDetails");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");



// Get all CBOs (populate operation details)
const getCBOs = async (req, res) => {
  try {
    const cbos = await CBO.find({}).populate("operationDetails").sort({ createdAt: -1 });
    if (!cbos.length) {
      return res.status(404).json({ error: "No CBOs found" });
    }
    res.status(200).json(cbos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single CBO
const getCBO = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID format" });
  }
  try {
    const cbo = await CBO.findById(id).populate("operationDetails");
    if (!cbo) {
      return res.status(404).json({ error: "CBO not found" });
    }
    res.status(200).json(cbo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new CBO with Operation Details
const createCBO = async (req, res) => {
  try {
    console.log("✅ Received Request Body:", req.body);
    console.log("✅ Received Files:", req.files);

    // 🛑 Check if `req.body` is missing
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Missing form data. Ensure 'Content-Type: multipart/form-data' is set." });
    }

    // ✅ Extract Required Fields
    const { name, shortname, address, representation } = req.body;

    if (!name || !shortname || !address || !representation) {
      return res.status(400).json({ error: "Missing required fields: name, shortname, address, representation" });
    }

    // ✅ Parse JSON Fields
    let operationDetails = {};
    let primaryContact = {};
    let secondaryContact = {};

    try {
      operationDetails = req.body.operationDetails ? JSON.parse(req.body.operationDetails) : {};
      primaryContact = req.body.primaryContact ? JSON.parse(req.body.primaryContact) : {};
      secondaryContact = req.body.secondaryContact ? JSON.parse(req.body.secondaryContact) : {};
    } catch (parseError) {
      console.error("❌ Error parsing JSON fields:", parseError);
      return res.status(400).json({ error: "Invalid JSON format in request body" });
    }

    // ✅ Handle File Uploads (Ensure URLs are stored)
    const files = req.files || {};
    let filesData = {};
    Object.keys(files).forEach((key) => {
      filesData[key] = { file: `http://localhost:4000/uploads/${files[key][0].filename}` };
    });

    // ✅ Save `operationDetails` First (If Needed)
    let savedOperationDetails;
    if (Object.keys(operationDetails).length > 0) {
      const newOperationDetails = new OperationDetails(operationDetails);
      savedOperationDetails = await newOperationDetails.save();
    }

    // ✅ Create CBO Entry
    const newCBO = new CBO({
      name,
      shortname,
      address,
      representation,
      operationDetails: savedOperationDetails ? savedOperationDetails._id : null,
      primaryContact,
      secondaryContact,
      files: filesData,
    });

    // ✅ Save and Respond with Success
    const savedCBO = await newCBO.save();
    res.status(201).json(savedCBO);
  } catch (error) {
    console.error("❌ Error creating CBO:", error);
    res.status(500).json({ error: "Internal Server Error. Please check backend logs." });
  }
};


// Delete a CBO and its operation details
const deleteCBO = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const cbo = await CBO.findByIdAndDelete(id);
    if (!cbo) {
      return res.status(404).json({ error: "CBO not found" });
    }
    
    // Delete associated operation details
    await OperationDetails.findByIdAndDelete(cbo.operationDetails);
    
    // Delete files from storage
    Object.values(cbo.files || {}).forEach((fileObj) => {
      if (fileObj.file) {
        const filePath = path.join(__dirname, "..", fileObj.file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });
    
    res.status(200).json({ message: "CBO deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// Delete all CBO
const deleteAllCBOs = async (req, res) => {
  try {
    await CBO.deleteMany({});
    res.status(200).json({ message: "All CBOs deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// Update a CBO and its operation details
const updateCBO = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const cbo = await CBO.findById(id);
    if (!cbo) {
      return res.status(404).json({ error: "CBO not found" });
    }
    
    Object.assign(cbo, req.body);
    if (req.body.operationDetails) {
      await OperationDetails.findByIdAndUpdate(cbo.operationDetails, JSON.parse(req.body.operationDetails));
    }
    
    // Update files and metadata, removing old files if needed
    Object.keys(req.files || {}).forEach((key) => {
      if (cbo.files[key]?.file) {
        const oldFilePath = path.join(__dirname, "..", cbo.files[key].file);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      cbo.files[key] = { file: req.files[key][0].path };
      if (req.body[key]) {
        Object.assign(cbo.files[key], JSON.parse(req.body[key]));
      }
    });
    
    await cbo.save();
    res.status(200).json(cbo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getCBOs, getCBO, createCBO, deleteCBO, updateCBO, deleteAllCBOs };
