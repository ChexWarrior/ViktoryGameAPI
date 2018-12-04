const express = require('express');
const api = require('./api/api.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/start', async (request, response) => {
  /**
   * Parameters
   * title
   * numPlayers: 2 - 8
   * players: [
   *  {alias, name, email, order} ...
   * ]
   */

  // TODO: Proper validation of request parameters
  const params = request.body();
  const result = await api.startGame(params);
});

app.listen(port, () => console.log(`Example app listening on ${port}!`));
