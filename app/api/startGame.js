const puppeteer = require('puppeteer');

const typeValue = async (selector, value, page) => {
  await page.focus(selector);
  await page.keyboard.type(value);
};

const clearValue = async (selector, page) => {
  await page.$eval(selector, (el) => {
    /* eslint-disable-next-line */
    el.value = '';
  });
};

const addPlayer = async (player, page) => {
  const playerStartBtnPrefix = '#Foundation_Elemental_5_PlayerInfo_';
  const playerTitleInputPrefix = '#Foundation_Elemental_5_PlayerTitle_';
  const playerEmailInputPrefix = '#Foundation_Elemental_5_PlayerId_';

  const {
    name,
    alias,
    order,
    email,
  } = player;
  const combinedName = alias ? `${alias} (${name})` : name;

  await page.click(`${playerStartBtnPrefix}${order - 1} input`);
  await page.waitForSelector(
    `${playerTitleInputPrefix}${order - 1}`,
    { visible: true },
  );

  await typeValue(
    `${playerTitleInputPrefix}${order - 1}`,
    combinedName,
    page,
  );

  await typeValue(`${playerEmailInputPrefix}${order - 1}`, email, page);
};

const startGame = async (params) => {
  const startGameUrl = 'http://gamesbyemail.com/Games/Viktory2';
  const gameTitleInput = '#Foundation_Elemental_5_GameTitle';
  const startGameBtn = '#Foundation_Elemental_5_PlayButton';
  const spectatorLink = '#Foundation_Elemental_8_spectatorAnchor';
  const numPlayersBtnPrefix = 'input[name^="Foundation_Elemental_5_numPlayers"]';

  const { players, title } = params;
  const numPlayers = players.length;
  const browser = await puppeteer.launch();

  let url;

  try {
    const page = await browser.newPage();
    await page.goto(startGameUrl);
    await page.waitForSelector(gameTitleInput);

    if (title) {
      await clearValue(gameTitleInput, page);
      await typeValue(gameTitleInput, title, page);
    }

    await page.click(`${numPlayersBtnPrefix}[value="${numPlayers}"]`);

    /* eslint-disable-next-line */
    for (const player of players) await addPlayer(player, page);

    await page.click(startGameBtn);
    await page.waitForSelector(spectatorLink);
    url = page.url();
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  } finally {
    await browser.close();
  }

  return {
    success: true,
    url,
  };
};

module.exports = {
  startGame,
};
