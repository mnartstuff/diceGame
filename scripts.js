(function() {
  const gamecontrol = document.querySelector("#gamecontrol");
  const banner = document.querySelector("#gamecontrol h2");
  const startgame = document.querySelector("#startgame");
  const rolldice = document.querySelector("#rolldice");
  const rollagain = document.querySelector("#rollagain");
  const pass = document.querySelector("#pass");
  const proceed = document.querySelector("#proceed");
  const newgame = document.querySelector("#newgame");
  const game = document.querySelector("#game");

  const gameEnd = 30;
  let players = [{
      score: 0
    },
    {
      score: 0
    }
  ];
  let plc;


  upDateScore();


  /////////// BUTTONS
  startgame.addEventListener("click", () => {
    plc = Math.floor((Math.random() * 2));
    upDateScore();
    reposition();
    announce(`Player ${plc + 1} Roll`);
    clear();
    show(rolldice);
  });

  rolldice.addEventListener("click", rollDice);

  rollagain.addEventListener("click", function() {
    newTurn();
  });

  pass.addEventListener("click", changePlayer);

  proceed.addEventListener("click", changePlayer);

  newgame.addEventListener("click", function() {
    clear();
    noDice();
    players[0].score = 0;
    players[1].score = 0;
    upDateScore();
    show(startgame);
    plc = "";
reposition();
  });

  //////// FUNCTIONS
  function rollDice() {
    clear();
    const die1 = Math.floor((Math.random() * 6) + 1);

    const die2 = Math.floor((Math.random() * 6) + 1);
    console.log(die1 + " & " + die2);
    const sum = die1 + die2;
    const dice = Array.from([die1, die2]);
    dice.forEach(die => {
      const dieImg = document.createElement("img");
      dieImg.setAttribute("src", `images/dice${die}.png`);
      dieImg.setAttribute("alt", `Dice ${die}`);
      game.appendChild(dieImg);
    });

    if (sum === 2) {
      players[plc].score = 0;
      announce("SNAKE EYES! (Hey, loser!)");
      show(proceed);
    } else {
      if (die1 === 1 || die2 === 1) {
        announce("Lose a Turn");
        clear();
        show(proceed);
      } else {
        players[plc].score += sum;
        upDateScore();
        if (players[plc].score >= gameEnd) {
          // REFACTOR INTO SEPARATE FUNCTION
          clear();
          announce(`Player ${plc + 1} Wins!`);
          show(newgame);
          //
        } else {
          clear();
          show(rollagain);
          show(pass);
        }
      }
    }

  } // END OF rollDice()

  function upDateScore() {
    document.querySelector("#score-1 h4").textContent = players[0].score;
    document.querySelector("#score-2 h4").textContent = players[1].score;
  }

  function announce(msg) {
    banner.textContent = msg;
  }

  function changePlayer() {
    plc === 0 ? plc = 1 : plc = 0;
    console.log("NEW PLAYER: " + (plc + 1));
    reposition();
    newTurn();
  }

  function reposition(){
    if (plc === 0) {
      gamecontrol.className = "center";
    } else if (plc === 1) {
      gamecontrol.className = "right";
    } else {
      gamecontrol.className = "";
      banner.textContent = "Pig Dice";
    }
  }

  function newTurn() {
    clear()
    announce(`Player ${plc + 1} Roll`);
    show(rolldice);
    noDice();
    upDateScore();
  }

  function noDice() {
    document.querySelectorAll("#game img").forEach(img => {
      img.remove();
    });
  }

  function clear() {
    document.querySelectorAll(".show").forEach(button => {
      button.classList.remove("show");
    });
  }

  function show(btn) {
    btn.classList.add("show");
  }


}());
