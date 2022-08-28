const express = require('express');

const router = express.Router();
const {
  getUsers, createUser, getUserbyID, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserbyID);
router.post('/', express.json(), createUser);
router.patch('/me', express.json(), updateProfile);
router.patch('/me/avatar', express.json(), updateAvatar);

module.exports = router;
