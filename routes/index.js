const express = require('express');
const router = express.Router();

/**
 * http://localhost:3100/sum?a=%d&b=%d
 * Эти параметры доступны через req.query
 */
router.get('/sum', (req, res, next) => {
  let { a, b } = req.query;
  a = +a; // преобразование в число
  b = +b;
  if (isNaN(a) || isNaN(b)) {
    res.status(400).send('Один или оба параметра не является числом');
    return;
  }
  const sum = a + b;
  res.status(200).send({
    sum
  });
});

router.post('/reverse-case', (req, res) => {
  const { str } = req.body;
  const chars = str.split('');
  const result = [];
  for (const char of chars) {
    if (char.toLowerCase() === char) {
      result.push(char.toUpperCase());
    } else if (char.toUpperCase() === char) {
      result.push(char.toLowerCase());
    } else {
      result.push(char);
    }
  }
  res.send({
    result: result.join('')
  });
});

router.put('/obj-to-array', (req, res) => {
  const obj = req.body;
  const result = Object.entries(obj).map(entry => ({
    key: entry[0],
    value: entry[1]
  }));
  res.send(result);
});

router.patch('/reverse-array', (req, res) => {
  const arr = req.body;
  res.send(arr.reverse());
});

router.delete('/duplicates', (req, res) => {
  let { arr } = req.query;
  if (typeof arr === 'string') {
    arr = JSON.parse(arr);
  }
  const result = new Set(arr);
  res.send([...result]);
});

module.exports = router;
