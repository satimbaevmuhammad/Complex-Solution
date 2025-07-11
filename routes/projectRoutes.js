const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,
  updateProject
} = require('../controllers/projectController');  // path to your controller

// CREATE
router.post('/', createProject);

// READ ALL
router.get('/', getProjects);

// DELETE by ID
router.delete('/:id', deleteProject);

// UPDATE by ID
router.put('/:id', updateProject);

module.exports = router;
