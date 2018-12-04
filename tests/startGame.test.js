const api = require('../app/api/api.js');

test('Verify that 2 player game is created', async () => {
  const response = await api.startGame({
    title: 'Test Game 2',
    players: [
      {
        name: 'Andy',
        alias: 'Ceezy The Great',
        order: 2,
        email: 'viktory2tester@yahoo.com',
      },
      {
        name: 'Joan',
        order: 1,
        email: 'al95788n@pace.edu',
      },
    ],
  });

  expect(response.success).toBeTruthy();
  expect(response.url).toBeTruthy();
});
