const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,
  updateProject
} = require('../controllers/projectController');

// Upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/projects'); // uploads/projects papkaga saqlanadi
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE (rasm bilan)
router.post('/', upload.single('img'), createProject);

// READ ALL
router.get('/', getProjects);

// DELETE
router.delete('/:id', deleteProject);

// UPDATE
router.put('/:id', upload.single('img'), updateProject);

module.exports = router;
