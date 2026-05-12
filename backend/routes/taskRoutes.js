const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStats,
} = require('../controllers/taskController');
const { protect, admin } = require('../middleware/auth');

router.get('/stats/dashboard', protect, getDashboardStats);

router.route('/')
  .post(protect, admin, createTask)
  .get(protect, getTasks);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, admin, deleteTask);

module.exports = router;