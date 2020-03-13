var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/users', function (req, res) {
  res.json({
    payload: {
      users: [
        {
          "user_id": "1",
          "login": "admin",
          "firstname": "Администратор",
          "lastname": "Главный",
          "middlename": "",
          "role_name": "Системный администратор",
          "status": "A",
          "role_id": "1"
        },
        {
          "user_id": "2",
          "login": "user_2",
          "firstname": "Алексей",
          "lastname": "Каспаров",
          "middlename": "Дмитриевич",
          "role_name": "Старший администратор",
          "status": "P",
          "role_id": "2"
        },
        {
          "user_id": "4",
          "login": "user_4",
          "firstname": "Павел",
          "lastname": "Мисакин",
          "middlename": "Артурович",
          "role_name": "Заведующий ортопедией",
          "status": "D",
          "role_id": "4"
        },
        {
          "user_id": "3",
          "login": "user_3",
          "firstname": "Валентина",
          "lastname": "Рей",
          "middlename": "Игоревна",
          "role_name": "Пародонтолог",
          "status": "A",
          "role_id": "3"
        }
      ],
      count: 4
    },
    error: null,
    params: req.query
  })
});

app.post('/user', function (req, res) {
  res.json({
    payload: {
      created: true
    },
    error: null,
    params: req.query
  })
});

app.put('/user', function (req, res) {
  res.json({
    payload: {
      updated: true
    },
    error: null,
    params: req.query
  })
});

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
