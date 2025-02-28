const CBO = require("../models/CBO");
const OperationDetails = require("../models/OperationDetails");
const mongoose = require("mongoose");

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

// Get a single CBO (populate operation details)
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
    const { name, shortname, description, address, representation, operationDetails } = req.body;

    if (!name || !shortname || !address || !representation || !operationDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Create and save the OperationDetails first
    const newOperationDetails = new OperationDetails(operationDetails);
    const savedOperationDetails = await newOperationDetails.save();

    // ✅ Create and save the CBO with the linked operationDetails ID
    const newCBO = new CBO({
      name,
      shortname,
      description,
      address,
      representation,
      operationDetails: savedOperationDetails._id, // ✅ Correctly reference the ObjectId
    });

    const savedCBO = await newCBO.save();

    res.status(201).json({ message: "CBO created successfully", cbo: savedCBO });
  } catch (error) {
    console.error("❌ Error creating CBO:", error);
    res.status(500).json({ error: error.message || "Failed to create CBO" });
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

    res.status(200).json({ message: "CBO deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//Delete all CBO
const deleteAllCBOs = async (req, res) => {
  try {
    await CBO.deleteMany({});
    res.status(200).json({ message: "All CBOs deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a CBO and its operation details
const updateCBO = async (req, res) => {
  const { id } = req.params;
  const { operationDetails, ...cboData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const cbo = await CBO.findById(id);
    if (!cbo) {
      return res.status(404).json({ error: "CBO not found" });
    }

    // Update CBO data
    Object.assign(cbo, cboData);
    await cbo.save();

    // Update operation details if provided
    if (operationDetails) {
      await OperationDetails.findByIdAndUpdate(cbo.operationDetails, operationDetails);
    }

    res.status(200).json(cbo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCBOs,
  getCBO,
  createCBO,
  deleteCBO,
  updateCBO,
  deleteAllCBOs,
};