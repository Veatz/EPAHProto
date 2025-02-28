const express = require('express');
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
router.patch('/:id', updateCBO); // ✅ Supports Step 2 updates

module.exports = router;