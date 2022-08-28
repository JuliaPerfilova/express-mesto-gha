const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');
const cardRouter = require('./routes/cards');
const { NOT_FOUND } = require('./utils/statusCodes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '630b623617a6b7c58fe3f112',
  };

  next();
});

app.use('/users', router);

app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: `${NOT_FOUND} - Страница не найдена` });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
