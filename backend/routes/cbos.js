const express = require('express');
const multer = require("multer");
const CBO = require("../models/CBO");
const RegistrationDocuments = require("../models/RegistrationDocuments");

const {
  getCBOs, 
  getCBO, 
  createCBO, 
  deleteCBO,
  deleteAllCBOs, 
  updateCBO
} = require('../controllers/cboController');

const router = express.Router();

// GET all CBOs
router.get('/', getCBOs);

// GET a single CBO
router.get('/:id', getCBO);

// POST a new CBO
router.post('/', createCBO); // ✅ Supports Step 2

// DELETE a CBO
router.delete('/:id', deleteCBO);

// DELETE ALL CBO
router.delete ("/", deleteAllCBOs);

// UPDATE a CBO
router.patch('/:id', updateCBO); // ✅ Supports Step 2 

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files to "uploads" folder
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// File Upload Route (Step 3)
router.post("/upload-documents", upload.fields([
  { name: "board_resolution" },
  { name: "registration_certificate" },
  { name: "business_permit" },
  { name: "bank_account_certificate" },
  { name: "bir_certificate" }
]), async (req, res) => {
  try {
      const documentData = {
          board_resolution: req.files["board_resolution"]?.[0]?.path,
          registration_certificate: req.files["registration_certificate"]?.[0]?.path,
          business_permit: req.files["business_permit"]?.[0]?.path,
          bank_account_certificate: req.files["bank_account_certificate"]?.[0]?.path,
          bir_certificate: req.files["bir_certificate"]?.[0]?.path
      };

      const registrationDocuments = await RegistrationDocuments.create(documentData);
      res.status(201).json({ message: "Files uploaded successfully", registrationDocuments });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

module.exports = router;