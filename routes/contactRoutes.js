const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateStatus,
  deleteContact,   // ✅ yangi controller
} = require('../controllers/contactController');

// Yangi murojaat yuborish (public)
router.post('/', createContact);

// Murojaatlar ro‘yxati (admin panel uchun)
router.get('/', getContacts);

// Statusni yangilash (admin panel uchun)
router.patch('/:id/status', updateStatus);

// Murojaatni o‘chirish (admin panel uchun)
router.delete('/:id', deleteContact); // ✅ yangi route

module.exports = router;
