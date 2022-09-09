const express = require('express');

const router = express.Router();
const {
  getUsers, getUserbyID, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserbyID);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
