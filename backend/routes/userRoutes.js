const express = require('express');
const router = express.Router();
const {
  getUsers,
  getMembers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, getUsers);
router.get('/members', protect, admin, getMembers);
router.route('/:id')
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;