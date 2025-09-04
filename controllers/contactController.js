const Contact = require('../models/Contact');

// POST /api/contacts
exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, message, privacyAccepted } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'name, phone va message majburiy' });
    }

    const contact = await Contact.create({
      name,
      phone,
      email,
      message,
      privacyAccepted: !!privacyAccepted,
    });

    res.status(201).json({ message: 'Murojaat qabul qilindi', data: contact });
  } catch (err) {
    console.error('createContact error:', err);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// GET /api/contacts  (faqat adminlar uchun — hozircha oddiy)
exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      data: contacts,
      pagination: { page: Number(page), limit: Number(limit), total },
    });
  } catch (err) {
    console.error('getContacts error:', err);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// PATCH /api/contacts/:id/status  (holatini yangilash)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // new | in_progress | resolved | archived
    const allowed = ['new', 'in_progress', 'resolved', 'archived'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Noto‘g‘ri status' });
    }
    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Topilmadi' });
    res.json({ message: 'Yangilandi', data: updated });
  } catch (err) {
    console.error('updateStatus error:', err);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// DELETE /api/contacts/:id
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Murojaat topilmadi' });
    }

    res.json({ message: 'Murojaat o‘chirildi', data: deleted });
  } catch (err) {
    console.error('deleteContact error:', err);
    res.status(500).json({ message: 'Server xatosi' });
  }
};