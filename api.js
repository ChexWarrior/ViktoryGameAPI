const puppeteer = require('puppeteer');

const typeValue = async (selector, value, page) => {
  await page.focus(selector);
  await page.keyboard.type(value);
};

const addPlayer = async (player, page) => {
  const {
    name,
    alias,
    order,
    email,
  } = player;
  const combinedName = alias ? `${alias} (${name})` : name;

  await page.click(`#Foundation_Elemental_5_PlayerInfo_${order - 1} input`);
  await page.waitForSelector(`#Foundation_Elemental_5_PlayerTitle_${order - 1}`, { visible: true });

  await typeValue(`#Foundation_Elemental_5_PlayerTitle_${order - 1}`, combinedName, page);
  await typeValue(`#Foundation_Elemental_5_PlayerId_${order - 1}`, email, page);
};

const startGame = async (params) => {
  const startGameUrl = 'http://gamesbyemail.com/Games/Viktory2';
  const { numPlayers, players, title } = params;
  const browser = await puppeteer.launch();
  let url;

  try {
    const page = await browser.newPage();
    await page.goto(startGameUrl);
    await page.waitForSelector('#Foundation_Elemental_5_GameTitle');

    if (title) {
      await page.$eval('#Foundation_Elemental_5_GameTitle', (element, gameTitle) => {
        /* eslint-disable-next-line */
        element.value = gameTitle;
      }, title);
    }

    await page.click(`input[name^="Foundation_Elemental_5_numPlayers"][value="${numPlayers}"]`);

    /* eslint-disable-next-line */
    for (const player of players) await addPlayer(player, page);

    await page.click('#Foundation_Elemental_5_PlayButton');
    await page.waitForSelector('#Foundation_Elemental_8_refreshGame');
    await page.screenshot({ path: './test2.png' });
    url = page.url();
  } finally {
    await browser.close();
  }

  return url;
};

module.exports = {
  startGame,
};
