const express = require('express');

const app = express();
const port = 3005;

app.set('views', './views');
app.set('view engine', 'pug');
// app.use(express.json());

app.get('/startGame', async (request, response) => {
  response.render('index', { title: 'Test', message: 'Hi!' });
});

app.listen(port, () => console.log(`Test server listening on ${port}!`));
