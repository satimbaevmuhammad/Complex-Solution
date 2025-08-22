const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateStatus,
} = require('../controllers/contactController');

// Yangi murojaat yuborish (public)
router.post('/', createContact);

// Murojaatlar ro‘yxati (admin panel uchun)
router.get('/', getContacts);

// Statusni yangilash (admin panel uchun)
router.patch('/:id/status', updateStatus);

module.exports = router;
