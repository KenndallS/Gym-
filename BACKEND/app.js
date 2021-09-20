const express = require('express');
const app = express();

app.get('/', function (req, res) {
  console.log('Llamada a hello world...');
  res.send('hello world');
})

app.listen(3000);