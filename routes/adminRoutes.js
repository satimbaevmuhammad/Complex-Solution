const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  deleteAdmin,
  updateAdmin
} = require('../controllers/adminController');

// Create
router.post('/', createAdmin);

// Get all
router.get('/', getAdmins);

// Delete by ID
router.delete('/:id', deleteAdmin);

// Update by ID
router.put('/:id', updateAdmin);

module.exports = router;
