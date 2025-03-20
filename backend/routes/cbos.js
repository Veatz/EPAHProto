const express = require("express");
const {
  getCBOs,
  getCBO,
  createCBO,
  deleteCBO,
  deleteAllCBOs,
  updateCBO,
} = require("../controllers/cboController");
const { validateCBO, validateCBOUpdate } = require("../middleware/validation");

const upload = require("../middleware/multer"); // Import multer config
const router = express.Router();

const baseUrl = process.env.BASE_URL || "http://localhost:4000/"; // ✅ Dynamic URL

// 🟢 GET all CBOs
router.get("/", getCBOs);

// 🟢 GET a single CBO
router.get("/:id", getCBO);

// 🟢 POST a new CBO (with validation & file upload)
router.post(
  "/",
  upload.fields([
    { name: "rctResolution" },
    { name: "dti" },
    { name: "sec" },
    { name: "cda" },
    { name: "csoNpoNgoPo" },
    { name: "doleRule1020" },
    { name: "bankBook" },
    { name: "auditedFinancialStatement" },
    { name: "latestITR" },
    { name: "salesInvoice" },
    { name: "businessPermit" },
    { name: "ffeDis" },
    { name: "birRegistration" },
    { name: "philGeps" }, // ✅ Added
    { name: "rsbsa" },
    { name: "fishAr" },
    { name: "fda" },
    { name: "agrarianReformBeneficiaries" },
    { name: "farmersAssociation" },
    { name: "irrigatorsAssociation" },
    { name: "laborUnionsWorkersAssoc" },
    { name: "slpa" }, // ✅ Added
  ]),
  async (req, res) => {
    try {
      const files = req.files || {}; // Get uploaded files

      // Construct the files object with full URLs
      let filesData = {};
      Object.keys(files).forEach((key) => {
        filesData[key] = {
          file: `${baseUrl}uploads/${files[key][0].filename}`,
        };
      });

      const newCBO = {
        ...req.body,
        files: filesData, // Attach processed files
      };

      const savedCBO = await createCBO(newCBO);
      res.status(201).json(savedCBO);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// 🔴 DELETE a CBO
router.delete("/:id", deleteCBO);

// 🔴 DELETE ALL CBOs
router.delete("/", deleteAllCBOs);

// 🟠 UPDATE a CBO (with file uploads)
router.patch(
  "/:id",
  upload.fields([
    { name: "rctResolution" },
    { name: "dti" },
    { name: "sec" },
    { name: "cda" },
    { name: "csoNpoNgoPo" },
    { name: "doleRule1020" },
    { name: "bankBook" },
    { name: "auditedFinancialStatement" },
    { name: "latestITR" },
    { name: "salesInvoice" },
    { name: "businessPermit" },
    { name: "ffeDis" },
    { name: "birRegistration" },
    { name: "philGeps" },
    { name: "rsbsa" },
    { name: "fishAr" },
    { name: "fda" },
    { name: "agrarianReformBeneficiaries" },
    { name: "farmersAssociation" },
    { name: "irrigatorsAssociation" },
    { name: "laborUnionsWorkersAssoc" },
    { name: "slpa" },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const files = req.files || {}; // Get uploaded files

      // Construct the updated files object with full URLs
      let updatedFilesData = {};
      Object.keys(files).forEach((key) => {
        updatedFilesData[key] = {
          file: `${baseUrl}uploads/${files[key][0].filename}`,
        };
      });

      const updatedData = {
        ...req.body,
        files: updatedFilesData, // Attach updated files
      };

      const updatedCBO = await updateCBO(id, updatedData);
      res.status(200).json(updatedCBO);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
