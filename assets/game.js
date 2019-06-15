//Initialization
const itemArray = [
  {
    name: "Gunting",
    letter: "g",
    symbol: "<i class='far fa-hand-scissors'></i>",
    symbolselect: "<i class='fas fa-hand-scissors'></i>"
  },
  {
    name: "Batu",
    letter: "b",
    symbol: "<i class='far fa-hand-rock'></i>",
    symbolselect: "<i class='fas fa-hand-rock'></i>"
  },
  {
    name: "Kertas",
    letter: "k",
    symbol: "<i class='far fa-hand-paper'></i>",
    symbolselect: "<i class='fas fa-hand-paper'></i>"
  },
  {
    name: "Gugur",
    letter: "x",
    symbol: "<i class='far fa-window-close'></i>",
    symbolselect: "<i class='fas fa-window-close'></i>"
  }
];
var gameData = {
  manifest: {
    version: "1.0"
  },
  players: [],
}
var fightready;
var playervalue;
function startGame(){
  var i;
  // Input Validation
  if (document.getElementById("playervalue").value >= 2){
    playervalue = document.getElementById("playervalue").value;
    togglePage('landing','game')
  } else {
    playervalue = 0
  }
  for (i = 0; i < playervalue; i++){
    const cardtemplate = '<div class="card"><h1><span id="latestmove' + (i + 1) +
    '"></span><span contenteditable="true">Player '  + (i + 1) + '<span></h1><p><b>Skor:</b> <span id="score' +
    (i + 1) + '">0.000</span></p><h2><span id="slot' + (i + 1) + '-1"><i class="far fa-window-close"></i></span><span id="slot' +
    (i + 1) + '-2"><i class="far fa-window-close"></i></span><span id="slot' +
    (i + 1) + '-3"><i class="far fa-window-close"></i></span></h2><button class="color-primary" onclick="toggleJackpot(' +
    (i + 1) + ')">MULAI/BERHENTI</button><h3>Antrian</h3><p id="moverow' + (i + 1) + '"></p></div>';
    gameData.players.push({
      name: "Player " + (i + 1),
      isFinished: false,
      isStopped: true,
      lastMoveUpdate: 0,
      moveSequence: [],
      rng: -1,
      score: 0,
      slotSequence: [],
      slotIndex: 1
    });
    document.getElementById("gamearea").innerHTML += cardtemplate
  }
  console.log(gameData)
}
function printGameData(){
  console.log(gameData)
}
function toggleJackpot(n){
  if (gameData.players[n - 1].isStopped == true){
    startJackpot(n)
  } else {
    stopJackpot(n)
  }
}
function startJackpot(n){
  var slotIndex = gameData.players[n - 1].slotIndex;
  var i;
  gameData.players[n - 1].isStopped = false;
  for (i = 1; i < 4; i++){
    document.getElementById('slot' + n + "-" + i).innerHTML = ""
  };
  randomizeSequence(n, slotIndex);
}
function stopJackpot(n){
  gameData.players[n - 1].isStopped = true;
  setTimeout(nextSlot, 200, n)
}
function nextSlot(n){
  var slotIndex = gameData.players[n - 1].slotIndex;
  if (slotIndex < 3){
    slotIndex++;
    gameData.players[n - 1].slotIndex = slotIndex;
    gameData.players[n - 1].isStopped = false;
    randomizeSequence(n, slotIndex);
  } else {
    gameData.players[n - 1].slotIndex = 1; //reset
    gameData.players[n - 1].isFinished = true;
    insertMove(n);
  };
}
function randomizeSequence(n, slotIndex){
  if (gameData.players[n - 1].isStopped == false){
    getRandomInt(3, n);
    document.getElementById('slot' + n + "-" + slotIndex).innerHTML = itemArray[gameData.players[n - 1].rng].symbolselect;
    slotUpdate = setTimeout(randomizeSequence, 200, n, slotIndex)
  } else {
    clearTimeout();
    document.getElementById('slot' + n + "-" + slotIndex).innerHTML = itemArray[gameData.players[n - 1].rng].symbol;
    gameData.players[n - 1].slotSequence.push(itemArray[gameData.players[n - 1].rng].letter);
  }
}
function insertMove(n){
  var g = 0,
      b = 0,
      k = 0;
  var i;
  var slotSequence = gameData.players[n - 1].slotSequence;
  clearTimeout(fightready)
  // Hitung jumlah G, B, K
  for (i = 0; i < 3; i++){
    if (slotSequence[i] == "g"){
      g++
    } else if (slotSequence[i] == "b"){
      b++
    } else if (slotSequence[i] == "k"){
      k++
    }
  };
  if (g >= 2){
    gameData.players[n - 1].moveSequence.push("g");
    if (g == 3){
      gameData.players[n - 1].moveSequence.push("g"); // GGG
    }
  } else if (b >= 2){
    gameData.players[n - 1].moveSequence.push("b");
    if (b == 3){
      gameData.players[n - 1].moveSequence.push("b"); // BBB
    }
  } else if (k >= 2){
    gameData.players[n - 1].moveSequence.push("k");
    if (k == 3){
      gameData.players[n - 1].moveSequence.push("k"); // KKK
    }
  } else {
    gameData.players[n - 1].moveSequence.push("x") // GBK, GKB, BGK, BKG, KGB, KBG
  };
  gameData.players[n - 1].slotSequence = [];
  updateData(n);
  fightready = setTimeout(fight, 3000);
  //console.log(gameData.players[n - 1].moveSequence);
}
function fight(){
  var movesets = [];
  var i;
  var j;
  var isReady = true;
  // Extract available moveSequence
  for (i = 0; i < playervalue; i++){
    movesets.push(gameData.players[i].moveSequence.length)
  };
  //console.log("1: " + movesets);
  var minmoves = Math.min.apply(Math, movesets);
  //console.log("2: " + minmoves);
  // Validation
  if (minmoves > 0){
    i = 0;
    fightInterval(i, minmoves)
  }
}
function fightInterval(i, minmoves){
  if (i < minmoves){
    var moves = [];
    var g = 0,
        b = 0,
        k = 0,
        x = 0;
    var gk = 0,
        bg = 0,
        kb = 0;
    var t = gameData.players.length;
    // g vs k, b vs g, k vs b
    for (j = 0; j < playervalue; j++){
      moves.push(gameData.players[j].moveSequence[0]);
    };
    //console.log("3: " + moves);
    for (j = 0; j < playervalue; j++){
      if (moves[j] == "g"){
        g++
      } else if (moves[j] == "b"){
        b++
      } else if (moves[j] == "k"){
        k++
      } else {x++};
    };
    //console.log("4: " + g + " " + b + " " + k + " " + x);
    // Count winning
    gk = Math.min(g, k) / g + x / (t - x);
    bg = Math.min(b, g) / b + x / (t - x);
    kb = Math.min(k, b) / k + x / (t - x);
    // Distribute score
    for (j = 0; j < playervalue; j++){
      var initscore = gameData.players[j].score;
      if (moves[j] == "g"){
        gameData.players[j].score = initscore + gk
      } else if (moves[j] == "b"){
        gameData.players[j].score = initscore + bg
      } else if (moves[j] == "k"){
        gameData.players[j].score = initscore + kb
      };
      // Show latest move
      document.getElementById("latestmove" + (j + 1)).innerHTML = itemArray[matchItemLetter(gameData.players[j].moveSequence[0])].symbolselect + " ";
      gameData.players[j].moveSequence.splice(0, 1)
    };
    for (j = 0; j < playervalue; j++){
      gameData.players[j].lastMoveUpdate = 0;
      document.getElementById("moverow" + (j + 1)).innerHTML = "";
      updateData(j + 1)
    };
    i++;
    setTimeout(fightInterval, 500, i, minmoves)
  }
}
function getRandomInt(m, n){
  var newrng = Math.floor(Math.random()*Math.floor(m));
  var rng = gameData.players[n - 1].rng;
  if (newrng == rng){
    getRandomInt(m, n)
  } else {
    gameData.players[n - 1].rng = newrng
  }
}
function updateData(n){
  var i;

  document.getElementById("score" + n).innerHTML = gameData.players[n - 1].score.toFixed(3);
  for (i = gameData.players[n - 1].lastMoveUpdate; i < gameData.players[n - 1].moveSequence.length; i++){
    if (i % 2 == 0){
      document.getElementById("moverow" + n).innerHTML += itemArray[matchItemLetter(gameData.players[n - 1].moveSequence[i])].symbolselect
    } else {
      document.getElementById("moverow" + n).innerHTML += itemArray[matchItemLetter(gameData.players[n - 1].moveSequence[i])].symbol
    }
  }
  gameData.players[n - 1].lastMoveUpdate = gameData.players[n - 1].moveSequence.length;
}
function matchItemLetter(a){
  var symbols = ["g", "b", "k", "x"];
  return symbols.indexOf(a);
}
