const api = require('../api.js');

(async () => {
  await api.startGame({
    title: 'My test game',
    numPlayers: 2,
    players: [
      {
        name: 'Andy',
        alias: 'Ceezy The Great',
        order: 2,
        email: 'aplehm@gmail.com',
      },
      {
        name: 'Joan',
        order: 1,
        email: 'aplehm@gmail.com',
      },
    ],
  });
})();
