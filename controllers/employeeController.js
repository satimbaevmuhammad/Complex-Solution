const Employee = require('../models/Employee');
const path = require('path');
const fs = require('fs');

// GET all
exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// GET one
exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).send("Topilmadi");
    res.json(emp);
  } catch {
    res.status(400).send("Xatolik");
  }
};

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    const { fullname, age, role, ishStagi, skills } = req.body;
    const rasm = req.file ? `/uploads/${req.file.filename}` : null;

    const newEmp = new Employee({
      rasm,
      fullname,
      age,
      role,
      ishStagi,
      skills: JSON.parse(skills)
    });

    const saved = await newEmp.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(400).send("Yangilashda xatolik");
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);

    // Faylni o'chirish (agar mavjud bo‘lsa)
    if (emp && emp.rasm) {
      const filePath = path.join(__dirname, '..', emp.rasm);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "O'chirildi" });
  } catch {
    res.status(400).send("O'chirishda xatolik");
  }
};
