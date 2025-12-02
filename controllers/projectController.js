const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const { name, about, advantages, newFeature, link } = req.body;

    const project = new Project({
      img: req.file ? `/uploads/projects/${req.file.filename}` : null,
      name: JSON.parse(name),
      about: JSON.parse(about),
      advantages: JSON.parse(advantages),
      newFeature: JSON.parse(newFeature),
      link
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const projects = await Project.find();

    const localizedProjects = projects.map(project => ({
      _id: project._id,
      img: project.img,
      name: project.name[lang],
      about: project.about[lang],
      advantages: project.advantages[lang],
      newFeature: project.newFeature[lang],
      link: project.link,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    res.json(localizedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      link: req.body.link,
      name: req.body.name ? JSON.parse(req.body.name) : undefined,
      about: req.body.about ? JSON.parse(req.body.about) : undefined,
      advantages: req.body.advantages ? JSON.parse(req.body.advantages) : undefined,
      newFeature: req.body.newFeature ? JSON.parse(req.body.newFeature) : undefined,
    };

    // Agar rasm kelgan bo'lsa yangisini qo'yamiz
    if (req.file) {
      data.img = `/uploads/projects/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(id, data, { new: true });

    if (!updatedProject)
      return res.status(404).json({ error: 'Project not found' });

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject
};
