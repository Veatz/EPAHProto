const express = require("express");
const { 
  getCBOs, 
  getCBO, 
  createCBO, 
  deleteCBO, 
  deleteAllCBOs, 
  updateCBO } = require("../controllers/cboController");
const { validateCBO,validateCBOUpdate  } = require("../middleware/validation");

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

module.exports = router;
