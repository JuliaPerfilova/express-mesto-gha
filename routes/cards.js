const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { urlValidation } = require('../middlewares/validators');

const router = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(urlValidation).required(),
  }),
}), createCard);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
