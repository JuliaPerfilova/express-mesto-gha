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
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserbyID);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2)
      .custom(urlValidation),
  }),
}), updateAvatar);

module.exports = router;
