const Card = require('../models/card');
const BadRequestError = require('../utils/errors/BadRequestError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');
const { ERROR_MESSAGES } = require('../utils/errorConstants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError(ERROR_MESSAGES.WRONG_URL));
      else next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        return card.remove()
          .then(() => res.send({ message: 'Карточка удалена' }));
      }
      return next(new ForbiddenError('Нельзя удалить чужую карточку'));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError());
      else next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError());
      else next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError());
      else next(err);
    });
};
