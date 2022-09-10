const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { urlValidation } = require('../middlewares/validators');

const router = express.Router();
const {
  getUsers, getUserbyID, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), getUserbyID);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  avatar: Joi.string().min(2).custom(urlValidation),
}), updateAvatar);

module.exports = router;
