const express = require("express");
const cboController = require("../controllers/cboController"); 
const { 
  getCBOs, 
  getCBO, 
  createCBO, 
  deleteCBO,
  deleteAllCBOs, 
  updateCBO, 
} = require("../controllers/cboController");
const { validateCBO,validateCBOUpdate  } = require("../middleware/validation");

const upload = require("../middleware/multer"); // Import multer config
const router = express.Router();

// GET all CBOs
router.get("/", getCBOs);

// GET a single CBO
router.get("/:id", getCBO);

// POST a new CBO (with validation)
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
    { name: "rsbsa" },
    { name: "fishAr" },
    { name: "fda" },
    { name: "agrarianReformBeneficiaries" },
    { name: "farmersAssociation" },
    { name: "irrigatorsAssociation" },
    { name: "laborUnionsWorkersAssoc" },
  ]),
  createCBO
);


// DELETE a CBO
router.delete("/:id", deleteCBO);

// DELETE ALL CBOs
router.delete("/", deleteAllCBOs);

// UPDATE a CBO (with validation)
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
  updateCBO
);

module.exports = router;