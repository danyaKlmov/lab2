// Импортируем библиотеки фреймворка
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todo_lab2');
const cors = require('cors');

// Создаем приложение express
const app = express();

// Подключаем Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// Подключаем наш обработчик запросов
app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
