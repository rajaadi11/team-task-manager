const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (Admin only)
const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, deadline, priority } = req.body;

    // Verify project exists
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy: req.user._id,
      deadline,
      priority: priority || 'medium',
    });

    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let query = {};

    // If user is a member, only show tasks assigned to them
    if (req.user.role === 'member') {
      query.assignedTo = req.user._id;
    }

    // Filter by project if provided
    if (req.query.project) {
      query.project = req.query.project;
    }

    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name')
      .sort({ deadline: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user has access to this task
    if (
      req.user.role === 'member' &&
      task.assignedTo._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Members can only update status of their assigned tasks
    if (req.user.role === 'member') {
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      // Members can only update status
      if (req.body.status) {
        task.status = req.body.status;
      }
    } else {
      // Admins can update everything
      const { title, description, assignedTo, deadline, priority, status } = req.body;
      task.title = title || task.title;
      task.description = description || task.description;
      task.assignedTo = assignedTo || task.assignedTo;
      task.deadline = deadline || task.deadline;
      task.priority = priority || task.priority;
      task.status = status || task.status;
    }

    const updatedTask = await task.save();

    const populatedTask = await Task.findById(updatedTask._id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    res.json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin only)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/tasks/stats/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    let query = {};

    // If user is a member, only show their tasks
    if (req.user.role === 'member') {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query);

    const stats = {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      overdue: tasks.filter(
        (t) => new Date(t.deadline) < new Date() && t.status !== 'completed'
      ).length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStats,
};