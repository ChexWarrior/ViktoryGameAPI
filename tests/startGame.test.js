const api = require('../api.js');

test('Verify that 2 player game is created', async () => {
  const response = await api.startGame({
    title: 'Test Game',
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

  expect(response.success).toBeTruthy();
  expect(response.url).toBeTruthy();
});
