const SAVE_KEY = "colon3ClickerSaveV6";
const API_KEY = "AIzaSyB-BGMK2osPDfyIhTJ3sfAQmoISZLoV5cQ";

let colon3 = 0;
let clickStrength = 1;
let autoStrength = 0;
let totalClicks = 0;
let alienCurrency = 0;
let spins = 0;
let spinning = false;
let hasWon = false;
let romanceState = { step: 0, score: 0, finished: false, lastReward: 0, runs: 0 };

const $ = (id) => document.getElementById(id);

const counter = $("counter");
const perSec = $("perSec");
const perClick = $("perClick");
const colonButton = $("colon3");
const shop = $("shop");
const menuBtn = $("menuBtn");
const toolsBtn = $("toolsBtn");
const toolsMenu = $("toolsMenu");
const gambleBtn = $("gambleBtn");
const dropdown = $("dropdown");
const achList = $("achList");
const gambleMenu = $("gambleMenu");
const spinBtn = $("spinBtn");
const spinResult = $("spinResult");
const notif = $("notif");
const ytToggle = $("ytToggle");
const ytBtn = $("ytBtn");
const ytSearch = $("ytSearch");
const ytResults = $("ytResults");
const ytPlayer = $("ytPlayer");
const hateBtn = $("hateBtn");
const rageVid = $("rageVid");
const winVid = $("winVid");
const alienBtn = $("alienBtn");
const exchangeBtn = $("exchangeBtn");
const alienShop = $("alienShop");
const alienItems = $("alienItems");
const exchangeMenu = $("exchangeMenu");
const exchangeInput = $("exchangeInput");
const exchangeConfirm = $("exchangeConfirm");
const exchangeInfo = $("exchangeInfo");
const romanceBtn = $("romanceBtn");
const romanceMenu = $("romanceMenu");
const romanceProgress = $("romanceProgress");
const romanceChat = $("romanceChat");
const romanceOptions = $("romanceOptions");

let shopItems = [
  { name: "+1 click strength", cost: 10, type: "click", value: 1, owned: 0 },
  { name: "+5 auto", cost: 50, type: "auto", value: 5, owned: 0 },
  { name: "+5 click", cost: 200, type: "click", value: 5, owned: 0 },
  { name: "+25 auto", cost: 500, type: "auto", value: 25, owned: 0 },
  { name: "+20 click", cost: 2000, type: "click", value: 20, owned: 0 },
  { name: "+100 auto", cost: 5000, type: "auto", value: 100, owned: 0 },
  { name: "+100 click", cost: 20000, type: "click", value: 100, owned: 0 },
  { name: "+500 auto", cost: 50000, type: "auto", value: 500, owned: 0 },
  { name: "SUPER click +1000", cost: 150000, type: "click", value: 1000, owned: 0 },
  { name: "MEGA auto +2000", cost: 300000, type: "auto", value: 2000, owned: 0 },
  { name: "INSANE click +10000", cost: 1000000, type: "click", value: 10000, owned: 0 },
  { name: "HYPER auto +50000", cost: 3000000, type: "auto", value: 50000, owned: 0 },
  { name: "GALAXY click +1M", cost: 20000000, type: "click", value: 1000000, owned: 0 },
  { name: "VOID auto +5M", cost: 50000000, type: "auto", value: 5000000, owned: 0 },
  { name: "UNREAL click +50M", cost: 500000000, type: "click", value: 50000000, owned: 0 },
  { name: "COSMIC auto +100M", cost: 1000000000, type: "auto", value: 100000000, owned: 0 },
  { name: "STAR click +250M", cost: 5000000000, type: "click", value: 250000000, owned: 0 },
  { name: "NEBULA auto +750M", cost: 10000000000, type: "auto", value: 750000000, owned: 0 },
  { name: "QUANTUM click +1B", cost: 50000000000, type: "click", value: 1000000000, owned: 0 },
  { name: "WARP auto +5B", cost: 100000000000, type: "auto", value: 5000000000, owned: 0 },
  { name: "REALITY click +25B", cost: 1000000000000, type: "click", value: 25000000000, owned: 0 },
  { name: "TIMELINE auto +100B", cost: 5000000000000, type: "auto", value: 100000000000, owned: 0 },
  { name: "INFINITY click +1T", cost: 50000000000000, type: "click", value: 1000000000000, owned: 0 },
  { name: "ETERNAL auto +5T", cost: 100000000000000, type: "auto", value: 5000000000000, owned: 0 },
  { name: "ASCENDED click +50T", cost: 1000000000000000, type: "click", value: 50000000000000, owned: 0 },
  { name: "FINAL auto +250T", cost: 5000000000000000, type: "auto", value: 250000000000000, owned: 0 }
];

let alienShopItems = [
  { name: "Alien Click +50", cost: 50, type: "click", value: 50, owned: 0 },
  { name: "Alien Auto +500", cost: 200, type: "auto", value: 500, owned: 0 },
  { name: "Alien Mega Click +5000", cost: 1000, type: "click", value: 5000, owned: 0 },
  { name: "Alien Hyper Auto +50000", cost: 5000, type: "auto", value: 50000, owned: 0 }
];

let achievements = {
  click1: { name: "One of Many", desc: "ur first ever click", got: false },
  thousand: { name: "Still More to Go", desc: "reach 1,000 :3s", got: false },
  million: { name: "My Fingers Are Getting Tired", desc: "reach 1m :3s", got: false },
  auto1: { name: "A Handful of Help", desc: "get auto income", got: false },
  shop1: { name: "First Purchase", desc: "buy something", got: false },
  clicker: { name: "Click Frenzy", desc: "click 100 times", got: false },
  idle: { name: "Let It Do The Work", desc: "reach 100/sec", got: false },
  rich: { name: "Getting Serious", desc: "reach 100k", got: false },
  clicker2: { name: "Where did my fingers go?", desc: "Oh, They snapped off...", got: false },
  idle2: { name: "Machines Everywhere", desc: "1M/sec", got: false },
  bigClick: { name: "Strong Fingers", desc: "1k click power", got: false },
  godClick: { name: "Finger God", desc: "1M click power", got: false },
  ultraRich: { name: "Filthy Rich", desc: "1B", got: false },
  absurd: { name: "This is Absurd", desc: "1T total", got: false },
  gambler: { name: "Risk Taker", desc: "gamble once", got: false },
  addict: { name: "Gambling Addict", desc: "gamble 50 times", got: false },
  alien: { name: "Space Money", desc: "get your first :P", got: false },
  romance: { name: "Soft Paws", desc: "successfully romance the :3", got: false },
  romancePerfect: { name: "Purrfect Match", desc: "get a perfect romance score", got: false },
  romanceAgain: { name: "Second Date", desc: "romance the :3 more than once", got: false },
  shopper5: { name: "Window Shopping", desc: "own 5 shop upgrades", got: false },
  shopper15: { name: "Receipt Collector", desc: "own 15 shop upgrades", got: false },
  shopper30: { name: "Mall Walker", desc: "own 30 shop upgrades", got: false },
  clicker3: { name: "Click Storm", desc: "click 5,000 times", got: false },
  clicker4: { name: "Click Singularity", desc: "click 25,000 times", got: false },
  idle3: { name: "Factory Floor", desc: "reach 1B/sec", got: false },
  idle4: { name: "Automatic Universe", desc: "reach 1T/sec", got: false },
  godClick2: { name: "Planet Tapper", desc: "10B click power", got: false },
  godClick3: { name: "Reality Tapper", desc: "1T click power", got: false },
  trillionaire: { name: "Trillionaire", desc: "reach 10T :3s", got: false },
  quadrillionaire: { name: "Number Soup", desc: "reach 1Q :3s", got: false },
  casinoRoyalty: { name: "Casino Royalty", desc: "gamble 250 times", got: false },
  alienCollector: { name: "Alien Investor", desc: "own every alien shop upgrade", got: false },
  all: { name: "Is there anymore to get?", desc: "i dont think so....", got: false, golden: true }
};

const romanceChats = [
  {
    cat: ":3 texts: 'hiii... do u also stare at the moon or is that just me'",
    options: [
      { text: "only when im hoping u are looking too", score: 2 },
      { text: "the moon is basically a sky lamp", score: 1 },
      { text: "nah im busy clicking", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i found a cardboard box. should i sit in it'",
    options: [
      { text: "yes, that is clearly your throne", score: 2 },
      { text: "maybe check if it is comfy first", score: 1 },
      { text: "boxes are overrated", score: 0 }
    ]
  },
  {
    cat: ":3 sends a blurry picture of one paw",
    options: [
      { text: "museum quality paw photo", score: 2 },
      { text: "nice paw", score: 1 },
      { text: "why is it blurry", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'what would u bring to a picnic with me'",
    options: [
      { text: "tiny sandwiches and a blanket in the sun", score: 2 },
      { text: "snacks probably", score: 1 },
      { text: "a calculator for clicker math", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i knocked a cup over but it was in my way'",
    options: [
      { text: "brave boundary setting honestly", score: 2 },
      { text: "classic :3 behavior", score: 1 },
      { text: "that was rude", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'do u like slow blinking'",
    options: [
      { text: "yes. blinking slowly at u right now", score: 2 },
      { text: "i can learn", score: 1 },
      { text: "sounds suspicious", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'describe me in one word'",
    options: [
      { text: "beloved", score: 2 },
      { text: "silly", score: 1 },
      { text: "expensive", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'if i nap on ur keyboard will u still love me'",
    options: [
      { text: "yes, i will type around destiny", score: 2 },
      { text: "depends what key you hold down", score: 1 },
      { text: "absolutely not", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i made biscuits thinking about u'",
    options: [
      { text: "my heart has been kneaded", score: 2 },
      { text: "thank u chef", score: 1 },
      { text: "where are the biscuits then", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'would u still text me if i hid under the couch for no reason'",
    options: [
      { text: "yes, i would send gentle updates from the floor", score: 2 },
      { text: "probably, depends how long", score: 1 },
      { text: "no, that is couch behavior", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i brought u a leaf. it is important'",
    options: [
      { text: "i will treasure the sacred leaf", score: 2 },
      { text: "thanks, nice leaf", score: 1 },
      { text: "please put it outside", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'what song would u play for me'",
    options: [
      { text: "something soft enough for a sleepy tail twitch", score: 2 },
      { text: "probably lofi", score: 1 },
      { text: "an alarm clock sound", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i sat on ur jacket because it smelled like u'",
    options: [
      { text: "keep it, it is yours now", score: 2 },
      { text: "that is kind of sweet", score: 1 },
      { text: "i needed that jacket", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'do u think my whiskers are dramatic'",
    options: [
      { text: "cinematic. award winning whiskers", score: 2 },
      { text: "a little, in a good way", score: 1 },
      { text: "they are just whiskers", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i practiced my tiny meow for u'",
    options: [
      { text: "10/10, encore please", score: 2 },
      { text: "pretty good meow", score: 1 },
      { text: "needs work", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'should we have matching friendship collars'",
    options: [
      { text: "yes, mine says officially chosen", score: 2 },
      { text: "maybe matching colors", score: 1 },
      { text: "i do not wear collars", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i got scared by my own tail'",
    options: [
      { text: "a mysterious and powerful opponent", score: 2 },
      { text: "it happens", score: 1 },
      { text: "how did u lose to a tail", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'where should our first fancy date be'",
    options: [
      { text: "sunbeam table by the window", score: 2 },
      { text: "somewhere cozy", score: 1 },
      { text: "the shop aisle", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i slow blinked at the wall by accident. jealous?'",
    options: [
      { text: "a little, but i respect the wall", score: 2 },
      { text: "maybe slightly", score: 1 },
      { text: "the wall can have u", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'what if i steal ur chair every day'",
    options: [
      { text: "then i will sit nearby and admire royalty", score: 2 },
      { text: "we can trade off", score: 1 },
      { text: "i will get a spray bottle", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i dreamed we ran a tiny bakery'",
    options: [
      { text: "u make biscuits, i handle the sign", score: 2 },
      { text: "sounds cute", score: 1 },
      { text: "that sounds like work", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'would u defend me from the vacuum'",
    options: [
      { text: "with honor and a closed closet door", score: 2 },
      { text: "i would turn it off", score: 1 },
      { text: "the vacuum has a job", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'what nickname would u give me'",
    options: [
      { text: "little moonbeam menace", score: 2 },
      { text: "buddy", score: 1 },
      { text: "tax collector", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i saved u the warm spot on the blanket'",
    options: [
      { text: "that is basically a love letter", score: 2 },
      { text: "thank u, very warm", score: 1 },
      { text: "i prefer cold blankets", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'if i bap ur hand is it flirting'",
    options: [
      { text: "yes, very advanced paw flirting", score: 2 },
      { text: "maybe a little", score: 1 },
      { text: "sounds like violence", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i saw a bird and thought of bravery'",
    options: [
      { text: "u are brave for letting it live rent free", score: 2 },
      { text: "birds are exciting", score: 1 },
      { text: "ok bird watcher", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'would u read me a bedtime story'",
    options: [
      { text: "yes, with all the dramatic voices", score: 2 },
      { text: "sure, a short one", score: 1 },
      { text: "read it yourself", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'i think i would share my favorite sunbeam with u'",
    options: [
      { text: "that is the highest honor i know", score: 2 },
      { text: "sounds warm", score: 1 },
      { text: "i might block the light", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'if i purr during a movie do we have to restart the scene'",
    options: [
      { text: "yes, your commentary is part of the plot", score: 2 },
      { text: "only for important scenes", score: 1 },
      { text: "no purring during movies", score: 0 }
    ]
  },
  {
    cat: ":3 texts: 'final final question. would u share ur last treat with me'",
    options: [
      { text: "yes, i saved it for you", score: 2 },
      { text: "we can split it", score: 1 },
      { text: "depends what treat", score: 0 }
    ]
  }
];

function format(n) {
  return Math.floor(Number(n) || 0).toLocaleString();
}

function renderShop() {
  if (!shop) return;
  shop.innerHTML = "";
  shopItems.forEach((item, i) => {
    const div = document.createElement("button");
    div.className = "item";
    div.innerHTML = `${item.name}<br>Cost: ${format(item.cost)}<br>Owned: ${item.owned}`;
    div.onclick = () => buy(i);
    shop.appendChild(div);
  });
}

function buy(i) {
  const item = shopItems[i];
  if (!item || colon3 < item.cost) return;

  colon3 -= item.cost;
  item.owned++;
  if (item.type === "click") clickStrength += item.value;
  if (item.type === "auto") {
    autoStrength += item.value;
    unlock("auto1");
  }

  unlock("shop1");
  item.cost = Math.floor(item.cost * 1.5);
  renderShop();
  update();
}

function renderAlienShop() {
  if (!alienItems) return;
  alienItems.innerHTML = "";
  alienShopItems.forEach((item, i) => {
    const div = document.createElement("button");
    div.className = "item";
    div.innerHTML = `${item.name}<br>Cost: ${format(item.cost)} :P<br>Owned: ${item.owned}`;
    div.onclick = () => buyAlien(i);
    alienItems.appendChild(div);
  });
}

function buyAlien(i) {
  const item = alienShopItems[i];
  if (!item || alienCurrency < item.cost) return;

  alienCurrency -= item.cost;
  item.owned++;
  if (item.type === "click") clickStrength += item.value;
  if (item.type === "auto") {
    autoStrength += item.value;
    unlock("auto1");
  }

  renderAlienShop();
  update();
}

function updateExchangeInfo() {
  if (exchangeInfo) exchangeInfo.innerText = `You have :P: ${format(alienCurrency)}`;
}

function exchangeCurrency() {
  if (!exchangeInput) return;
  let amount = Math.floor(Number(exchangeInput.value));
  if (!amount || amount <= 0) return;
  amount = Math.min(amount, colon3);

  const gained = Math.floor(amount / 10);
  if (gained <= 0) return;

  colon3 -= amount;
  alienCurrency += gained;
  exchangeInput.value = "";
  unlock("alien");
  update();
}

function resetRomance() {
  romanceState = { step: 0, score: 0, finished: false, lastReward: 0, runs: romanceState.runs || 0 };
  renderRomance();
  saveGame();
}

function getRomanceReward() {
  const maxScore = romanceChats.length * 2;
  return Math.round(600 + (romanceState.score / maxScore) * 9400);
}

function chooseRomance(option) {
  if (romanceState.finished) return;
  romanceState.score += option.score;
  romanceState.step++;

  if (romanceState.step >= romanceChats.length) {
    romanceState.finished = true;
    romanceState.lastReward = getRomanceReward();
    romanceState.runs = (romanceState.runs || 0) + 1;
    colon3 += romanceState.lastReward;
    if (romanceState.score >= Math.ceil(romanceChats.length * 1.4)) unlock("romance");
    if (romanceState.score >= romanceChats.length * 2) unlock("romancePerfect");
    if (romanceState.runs >= 2) unlock("romanceAgain");
    update();
  } else {
    renderRomance();
    saveGame();
  }
}

function renderRomance() {
  if (!romanceProgress || !romanceChat || !romanceOptions) return;

  romanceOptions.innerHTML = "";

  if (romanceState.finished) {
    romanceProgress.innerText = `chat complete - romance score ${romanceState.score}/${romanceChats.length * 2}`;
    romanceChat.innerHTML = `<div class="catText">:3 texts: 'mrrp... i think i like u a lot.'</div><div class="romanceReward">You got ${format(romanceState.lastReward)} :3</div>`;
    const restart = document.createElement("button");
    restart.className = "romanceOption";
    restart.innerText = "romance again";
    restart.onclick = resetRomance;
    romanceOptions.appendChild(restart);
    return;
  }

  const chat = romanceChats[romanceState.step];
  romanceProgress.innerText = `chat ${romanceState.step + 1} / ${romanceChats.length}`;
  romanceChat.innerHTML = `<div class="catText">${chat.cat}</div>`;
  chat.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "romanceOption";
    button.innerText = option.text;
    button.onclick = () => chooseRomance(option);
    romanceOptions.appendChild(button);
  });
}

function unlock(id) {
  const achievement = achievements[id];
  if (!achievement || achievement.got) return;

  achievement.got = true;
  notify(achievement.name);
  renderAchievements();
}

function checkAchievements() {
  if (colon3 >= 1000) unlock("thousand");
  if (colon3 >= 100000) unlock("rich");
  if (colon3 >= 1e6) unlock("million");
  if (colon3 >= 1e9) unlock("ultraRich");
  if (colon3 >= 1e12) unlock("absurd");
  if (colon3 >= 1e13) unlock("trillionaire");
  if (colon3 >= 1e15) unlock("quadrillionaire");
  if (totalClicks >= 100) unlock("clicker");
  if (totalClicks >= 1000) unlock("clicker2");
  if (totalClicks >= 5000) unlock("clicker3");
  if (totalClicks >= 25000) unlock("clicker4");
  if (autoStrength >= 100) unlock("idle");
  if (autoStrength >= 1000000) unlock("idle2");
  if (autoStrength >= 1e9) unlock("idle3");
  if (autoStrength >= 1e12) unlock("idle4");
  if (clickStrength >= 1000) unlock("bigClick");
  if (clickStrength >= 1000000) unlock("godClick");
  if (clickStrength >= 1e10) unlock("godClick2");
  if (clickStrength >= 1e12) unlock("godClick3");
  if (spins >= 250) unlock("casinoRoyalty");
  const ownedShopItems = shopItems.reduce((total, item) => total + item.owned, 0);
  if (ownedShopItems >= 5) unlock("shopper5");
  if (ownedShopItems >= 15) unlock("shopper15");
  if (ownedShopItems >= 30) unlock("shopper30");
  if (alienShopItems.every((item) => item.owned > 0)) unlock("alienCollector");
  if ((romanceState.runs || 0) >= 2) unlock("romanceAgain");
}

function checkAllAchievement() {
  const allDone = Object.entries(achievements)
    .filter(([id]) => id !== "all")
    .every(([, achievement]) => achievement.got);
  if (allDone) unlock("all");
}

function renderAchievements() {
  if (!achList) return;
  achList.innerHTML = "";

  Object.values(achievements).forEach((achievement, i) => {
    if (i > 0) {
      const divider = document.createElement("div");
      divider.className = "divider";
      divider.innerText = "-------";
      achList.appendChild(divider);
    }

    const div = document.createElement("div");
    div.className = "ach";
    if (achievement.got) {
      if (achievement.golden) div.classList.add("golden");
      div.innerHTML = `<b>${achievement.name}</b><br>${achievement.desc}`;
    } else {
      div.classList.add("locked");
      div.innerHTML = "<b>???</b><br>?????";
    }
    achList.appendChild(div);
  });
}

function notify(text) {
  if (!notif) return;
  const n = document.createElement("div");
  n.innerText = "Achievement: " + text;
  notif.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

function saveGame() {
  const data = {
    colon3,
    clickStrength,
    autoStrength,
    totalClicks,
    alienCurrency,
    spins,
    hasWon,
    romanceState,
    shopItems: shopItems.map(({ cost, owned }) => ({ cost, owned })),
    alienShopItems: alienShopItems.map(({ owned }) => ({ owned })),
    achievements: Object.fromEntries(
      Object.entries(achievements).map(([id, achievement]) => [id, achievement.got])
    )
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    // Saving can fail in private browsing or blocked file contexts.
  }
}

function loadGame() {
  try {
    const data = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!data) return;

    colon3 = Number(data.colon3) || 0;
    clickStrength = Number(data.clickStrength) || 1;
    autoStrength = Number(data.autoStrength) || 0;
    totalClicks = Number(data.totalClicks) || 0;
    alienCurrency = Number(data.alienCurrency) || 0;
    spins = Number(data.spins) || 0;
    hasWon = Boolean(data.hasWon);
    if (data.romanceState) {
      romanceState = {
        step: Math.min(Number(data.romanceState.step) || 0, romanceChats.length),
        score: Number(data.romanceState.score) || 0,
        finished: Boolean(data.romanceState.finished),
        lastReward: Number(data.romanceState.lastReward) || 0,
        runs: Number(data.romanceState.runs) || 0
      };
    }

    if (Array.isArray(data.shopItems)) {
      data.shopItems.forEach((saved, i) => {
        if (!shopItems[i]) return;
        shopItems[i].cost = Number(saved.cost) || shopItems[i].cost;
        shopItems[i].owned = Number(saved.owned) || 0;
      });
    }

    if (Array.isArray(data.alienShopItems)) {
      data.alienShopItems.forEach((saved, i) => {
        if (alienShopItems[i]) alienShopItems[i].owned = Number(saved.owned) || 0;
      });
    }

    if (data.achievements) {
      Object.entries(data.achievements).forEach(([id, got]) => {
        if (achievements[id]) achievements[id].got = Boolean(got);
      });
    }
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
}

function update() {
  if (counter) counter.innerText = ":3 : " + format(colon3);
  if (perSec) perSec.innerText = format(autoStrength);
  if (perClick) perClick.innerText = format(clickStrength);
  updateExchangeInfo();
  checkAchievements();
  checkAllAchievement();
  saveGame();

  if (colon3 >= 1e12 && !hasWon) {
    hasWon = true;
    playVideo(winVid);
  }
}

function getReward(rewards) {
  const total = rewards.reduce((sum, reward) => sum + reward.weight, 0);
  let rand = Math.random() * total;
  for (const reward of rewards) {
    if (rand < reward.weight) return reward.value;
    rand -= reward.weight;
  }
  return 0;
}

function spin() {
  if (spinning || colon3 < 1000) return;

  colon3 -= 1000;
  spins++;
  unlock("gambler");
  if (spins >= 50) unlock("addict");
  spinning = true;
  update();

  const rewards = [
    { value: -100000, weight: 2 },
    { value: -5000, weight: 5 },
    { value: -1000, weight: 15 },
    { value: 0, weight: 20 },
    { value: 500, weight: 25 },
    { value: 2000, weight: 20 },
    { value: 10000, weight: 10 },
    { value: 100000, weight: 4 },
    { value: 1000000, weight: 1 },
    { value: 10000000, weight: 1 }
  ];

  let elapsed = 0;
  const intervalMs = 100;
  const spinTimer = setInterval(() => {
    if (spinResult) spinResult.innerText = "Spinning... " + format(getReward(rewards));
    elapsed += intervalMs;

    if (elapsed < 2000) return;
    clearInterval(spinTimer);

    const final = getReward(rewards);
    colon3 = Math.max(0, colon3 + final);
    if (spinResult) {
      spinResult.innerText =
        final > 0 ? `You WON ${format(final)}` :
        final < 0 ? `You LOST ${format(Math.abs(final))}` :
        "Nothing...";
    }
    spinning = false;
    update();
  }, intervalMs);
}

function getYoutubeId(value) {
  const text = value.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(text)) return text;

  try {
    const url = new URL(text);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1).split("/")[0];
    if (url.hostname.includes("youtube.com")) {
      if (url.searchParams.get("v")) return url.searchParams.get("v");
      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];
    }
  } catch {
    return "";
  }
  return "";
}

function playYoutube(videoId) {
  if (!ytPlayer) return;
  ytPlayer.innerHTML = `<iframe title="YouTube player" src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

function renderYoutubeFallback(query) {
  if (!ytResults) return;
  const videoId = getYoutubeId(query);
  ytResults.innerHTML = "";

  if (videoId) {
    const play = document.createElement("button");
    play.className = "ytItem";
    play.innerText = "Play this video";
    play.onclick = () => playYoutube(videoId);
    ytResults.appendChild(play);
    playYoutube(videoId);
    return;
  }

  const openSearch = document.createElement("button");
  openSearch.className = "ytItem";
  openSearch.innerText = `Open YouTube results for "${query}"`;
  openSearch.onclick = () => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank", "noopener");
  ytResults.appendChild(openSearch);
}

async function searchYT() {
  const query = ytSearch?.value.trim();
  if (!query) return;

  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    renderYoutubeFallback(query);
    return;
  }

  ytResults.innerHTML = "Searching...";
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`);
    const data = await response.json();
    if (!response.ok || !Array.isArray(data.items)) throw new Error(data.error?.message || "YouTube search failed");

    ytResults.innerHTML = "";
    data.items.slice(0, 5).forEach((video) => {
      const videoId = video.id?.videoId;
      if (!videoId) return;
      const div = document.createElement("button");
      div.className = "ytItem";
      div.innerText = video.snippet?.title || "Untitled video";
      div.onclick = () => playYoutube(videoId);
      ytResults.appendChild(div);
    });
  } catch (error) {
    ytResults.innerHTML = "";
    const message = document.createElement("div");
    message.className = "ytMessage";
    message.innerText = "YouTube API search is unavailable. Direct links and video IDs still work.";
    ytResults.appendChild(message);
    renderYoutubeFallback(query);
  }
}

function playVideo(video) {
  if (!video) return;
  video.style.display = "block";
  video.currentTime = 0;
  video.play().catch(() => {});
  video.requestFullscreen?.();
}

function toggle(element) {
  if (!element) return;
  element.style.display = element.style.display === "block" ? "none" : "block";
}

colonButton?.addEventListener("click", () => {
  colon3 += clickStrength;
  totalClicks++;
  unlock("click1");
  update();
});

menuBtn?.addEventListener("click", () => toggle(dropdown));
toolsBtn?.addEventListener("click", () => toggle(toolsMenu));
gambleBtn?.addEventListener("click", () => toggle(gambleMenu));
ytToggle?.addEventListener("click", () => toggle($("ytDropdown")));
spinBtn?.addEventListener("click", spin);
ytBtn?.addEventListener("click", searchYT);
ytSearch?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchYT();
});
hateBtn?.addEventListener("click", () => playVideo(rageVid));
alienBtn?.addEventListener("click", () => toggle(alienShop));
exchangeBtn?.addEventListener("click", () => {
  toggle(exchangeMenu);
  updateExchangeInfo();
});
romanceBtn?.addEventListener("click", () => {
  toggle(romanceMenu);
  renderRomance();
});
exchangeConfirm?.addEventListener("click", exchangeCurrency);
exchangeInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") exchangeCurrency();
});

window.addEventListener("pagehide", saveGame);
window.addEventListener("beforeunload", saveGame);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") saveGame();
});

loadGame();
renderShop();
renderAlienShop();
renderAchievements();
renderRomance();
update();
setInterval(() => {
  colon3 += autoStrength;
  update();
}, 1000);
