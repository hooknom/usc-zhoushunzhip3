class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static solvePuzzle() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("解谜失败!箱子锁住了...");
        }
        resolve("解谜成功!箱子打开了...");
      }, 1500);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }
}

async function findTreasureWithAsyncAwait() {
  const output = document.getElementById("output");
  const image = document.getElementById("image");
  const guard = document.getElementById("guard");
  output.innerHTML = "";  // 清空输出区域
  image.style.display = "none";  // 隐藏图像
  guard.style.display = "none";  // 隐藏守卫图像

  try {
    const clue = await TreasureMap.getInitialClue();
    displayMessage(clue, "success", "library.png");

    const location = await TreasureMap.decodeAncientScript(clue);
    displayMessage(location, "success", "temple.png");

    const box = await TreasureMap.searchTemple(location);
    displayMessage(box, "success", "treasureBox.png");

    const puzzleResult = await TreasureMap.solvePuzzle();
    displayMessage(puzzleResult, "success");

    const treasure = await TreasureMap.openTreasureBox();
    displayMessage(treasure, "success", "treasure.png");
  } catch (error) {
    displayGuard();  // 显示守卫图片
    displayMessage(error, "error");
  }
}

function displayMessage(message, type, imageSrc) {
  const output = document.getElementById("output");
  const image = document.getElementById("image");

  output.className = type;  // 添加成功或错误样式
  output.innerHTML = message;

  // 更新图像
  if (imageSrc) {
    image.src = imageSrc;
    image.style.display = "block";  // 显示图像
    image.style.opacity = 0;
    setTimeout(() => {
      image.style.opacity = 1;  // 淡入效果
    }, 50);
  } else {
    image.style.display = "none";  // 没有图像则隐藏
  }

  // 淡入文本效果
  output.style.opacity = 0;
  setTimeout(() => {
    output.style.opacity = 1;
  }, 50);
}

function displayGuard() {
  const guard = document.getElementById("guard");
  guard.src = "guard.png";  // 设置守卫图片
  guard.style.display = "block";  // 显示守卫图像
  guard.style.opacity = 0;
  setTimeout(() => {
    guard.style.opacity = 1;  // 淡入效果
  }, 50);
}



document.getElementById("startButton").addEventListener("click", findTreasureWithAsyncAwait);

async function loadGameData() {
  try {
    const response = await fetch('gameData.txt');
    if (!response.ok) {
      throw new Error('无法加载游戏数据');
    }
    const text = await response.text();
    displayGameData(text);
  } catch (error) {
    console.error('加载数据失败:', error);
  }
}

function displayGameData(data) {
  const output = document.getElementById('output');
  output.innerHTML = data;  // 将加载的游戏数据显示到页面上
}

document.getElementById("startButton").addEventListener("click", loadGameData);
function savePlayerInfo(playerID, nickname) {
  const playerData = {
    playerID: playerID,
    nickname: nickname,
    gameHistory: []  // 游戏历史
  };
  localStorage.setItem('playerInfo', JSON.stringify(playerData));
}

function getPlayerInfo() {
  const playerData = localStorage.getItem('playerInfo');
  return playerData ? JSON.parse(playerData) : null;
}

function loadPlayerInfo() {
  const playerInfo = getPlayerInfo();
  if (playerInfo) {
    document.getElementById('output').innerText = `欢迎回来，${playerInfo.nickname}!`;
  } else {
    const playerID = prompt("请输入玩家ID:");
    const nickname = prompt("请输入昵称:");
    savePlayerInfo(playerID, nickname);
    document.getElementById('output').innerText = `欢迎，${nickname}！`;
  }
}

document.addEventListener("DOMContentLoaded", loadPlayerInfo);  // 页面加载时调用
function updateGameHistory(action) {
  const playerInfo = getPlayerInfo();
  if (playerInfo) {
    playerInfo.gameHistory.push(action);
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));  // 保存历史
  }
}

function displayGameHistory() {
  const playerInfo = getPlayerInfo();
  if (playerInfo && playerInfo.gameHistory.length > 0) {
    const history = playerInfo.gameHistory.join('\n');
    document.getElementById('output').innerText += `\n游戏历史:\n${history}`;
  }
}
function playBackgroundMusic() {
  const music = document.getElementById('backgroundMusic');
  music.play();
}

function pauseBackgroundMusic() {
  const music = document.getElementById('backgroundMusic');
  music.pause();
}

document.getElementById("startButton").addEventListener("click", playBackgroundMusic);  // 开始时播放背景音乐
function setVolume(volume) {
  const music = document.getElementById('backgroundMusic');
  music.volume = volume;  // 设置音量范围为 0.0 到 1.0
}

