const Project = require('../models/Project');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const { name, description, teamMembers } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      teamMembers: teamMembers || [],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    let query = {};

    // If user is a member, only show projects they're part of
    if (req.user.role === 'member') {
      query = { teamMembers: req.user._id };
    }

    const projects = await Project.find(query)
      .populate('createdBy', 'name email')
      .populate('teamMembers', 'name email role')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('teamMembers', 'name email role');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user has access to this project
    if (
      req.user.role === 'member' &&
      !project.teamMembers.some((member) => member._id.toString() === req.user._id.toString())
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
const updateProject = async (req, res) => {
  try {
    const { name, description, teamMembers, status } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.teamMembers = teamMembers || project.teamMembers;
    project.status = status || project.status;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();

    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};