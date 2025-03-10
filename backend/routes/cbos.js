const express = require("express");
const cboController = require("../controllers/cboController"); 
const { 
  getCBOs, 
  getCBO, 
  createCBO, 
  deleteCBO, 
  deleteAllCBOs, 
  updateCBO } = require("../controllers/cboController");
const { validateCBO,validateCBOUpdate  } = require("../middleware/validation");

const upload = require("../config/multer"); // Import multer config
const router = express.Router();

// GET all CBOs
router.get("/", getCBOs);

// GET a single CBO
router.get("/:id", getCBO);

// POST a new CBO (with validation)
router.post("/", validateCBO, createCBO);

// DELETE a CBO
router.delete("/:id", deleteCBO);

// DELETE ALL CBOs
router.delete("/", deleteAllCBOs);

// UPDATE a CBO (with validation)
router.patch("/:id", validateCBOUpdate, updateCBO); 

// Route to create a new CBO with file uploads
router.post(
  "/",
  upload.fields([
    { name: "rctResolution", maxCount: 1 },
    { name: "businessPermit", maxCount: 1 },
    { name: "doleCertificate", maxCount: 1 },
  ]),
  cboController.createCBO
);

module.exports = router;
