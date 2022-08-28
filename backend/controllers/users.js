const User = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserbyID =(req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (user === null) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send({ data: user })
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Ошибка: ${err}` });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: `Ошибка: ${err}` });
    });
  };

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => {
      if (user === null) {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: `Ошибка: ${err}` });
    });
  };

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => {
      if (user === null) {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: `Ошибка: ${err}` });
    });
  };