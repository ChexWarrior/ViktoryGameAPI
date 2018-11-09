const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/start', (request, response) => {
  console.log(request.body);
  response.send(request.body);
});

app.listen(port, () => console.log('Example app listening on 3000!'));
