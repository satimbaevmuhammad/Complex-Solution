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
