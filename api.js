const puppeteer = require('puppeteer');

const addPlayer = async (player, page) => {
  const {
    name,
    alias,
    order,
    email,
  } = player;

  const combinedName = alias ? `${alias} (${name})` : name;

  await page.click(`#Foundation_Elemental_5_PlayerInfo_${order}> input`);
  await page.evaluate((playerName, playerEmail, playerOrder) => {
    document.querySelector(`#Foundation_Elemental_5_PlayerTitle_${playerOrder}`).value = playerName;
    document.querySelector(`#Foundation_Elemental_5_PlayerId_${playerOrder}`).value = playerEmail;
  }, combinedName, email, order);
};

const startGame = async (params) => {
  const startGameUrl = 'http://gamesbyemail.com/Games/Viktory2';
  const { numPlayers, players, title } = params;
  const browser = await puppeteer.launch();
  let url;

  try {
    const page = await browser.newPage();
    await page.goto(startGameUrl);
    await page.waitForSelector('#Foundation_Elemental_5_ReadyToPlayButton');

    if (title) {
      await page.$eval('#Foundation_Elemental_5_GameTitle', (element, gameTitle) => {
        element.value = gameTitle;
      }, title);
    }

    await page.click(`input[name="Foundation_Elemental_5_numPlayers"][value="${numPlayers}"]`);
    players.forEach(async player => addPlayer(player, page));

    await page.click('#Foundation_Elemental_5_PlayButton');
    await page.waitForNavigation();
    await page.waitForSelector('#Foundation_Elemental_8_centerOverPiece');

    url = page.url();
  } finally {
    await browser.close();
  }

  return url;
};

module.exports = {
  startGame,
};
