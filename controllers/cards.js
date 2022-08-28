const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка: ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST);
      } else {
        res.status(INTERNAL_SERVER_ERROR);
      }
      res.send({ message: `Ошибка: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST);
      } else {
        res.status(INTERNAL_SERVER_ERROR);
      }
      res.send({ message: `Ошибка: ${err}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST);
      } else {
        res.status(INTERNAL_SERVER_ERROR);
      }
      res.send({ message: `Ошибка: ${err}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST);
      } else {
        res.status(INTERNAL_SERVER_ERROR);
      }
      res.send({ message: `Ошибка: ${err}` });
    });
};
