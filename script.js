"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

initGlobalObject();

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner 
    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];

    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
    //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
    //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
    //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 5;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
    //Kontrollerar om "X" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 1
    if (checkWinner('X')) {
        return 1;
    }
    //Kontrollerar om "O" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 2
    if (checkWinner('O')) {
        return 2;
    }
    //Kontrollerar om spelet är oavgjort, returnerar isåfall 3
    if (checkForDraw()) {
        return 3;
    }
    //Annars returneras 0, och spelet fortlöper
    else {
        return 0;
    }
}

//Skapa en array av alla vinnande kombinationer.
//Skapa en flagga för isWinner.
//Loopa igenom alla winningCombos.
//I varje loop kontrollerar ni om alla platser i oGameData.GameField 
//som motsvarar nuvarande combo innehåller playerIn. Om sant, ändra värdet på flaggan.
//Returnera flaggan isWinner
function checkWinner(playerIn) {
    let winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    let isWinner = false;

    isWinner = winningCombos.some(combo =>
        combo.every(position => oGameData.gameField[position] === playerIn));

    return isWinner
}


//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    return oGameData.gameField.every(position => position !== '');
}

prepGame();
//Funktion som förbereder spelet inför start
function prepGame() {
    const gameArea = document.querySelector('#gameArea');
    gameArea.classList.add('d-none');
    const startGameBtn = document.querySelector('#newGame');
    startGameBtn.addEventListener('click', initiateGame);
}
    
function validateForm() {

}

function initiateGame() {
    const form = document.querySelector('#theForm');
    form.classList.add('d-none');
    gameArea.classList.remove('d-none');
    const errorMsg = document.querySelector('#errorMsg');
    errorMsg.textContent = '';
    oGameData.nickNamePlayerOne = document.querySelector('#nick1').value;
    oGameData.colorPlayerOne = document.querySelector('#color1').value;
    oGameData.nickNamePlayerTwo = document.querySelector('#nick2').value;
    oGameData.colorPlayerTwo = document.querySelector('#color2').value;

    let emptyGame = document.querySelectorAll('td');
    for(let i = 0; i < emptyGame.length; i++) {
        emptyGame[i].textContent = ''
    };

    let playerChar;
    let playerName;

    let randomNumber = Math.random() * 1;
    if(randomNumber < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else if(randomNumber >= 0.5) {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    let currentPlayer = document.querySelector('.jumbotron h1');
    currentPlayer.innerText = `Aktuell spelare är ${playerName}`;

    const clickTable = document.querySelector('#gameArea table');
    clickTable.addEventListener('click', executeMove);
}

function startGame() {

}

function changePlayer() {
    let currentPlayer = document.querySelector('.jumbotron h1');
    if (oGameData.currentPlayer === oGameData.playerOne) {
        oGameData.currentPlayer = oGameData.playerTwo;
        currentPlayer.innerText = `Aktuell spelare är ${oGameData.nickNamePlayerTwo} och du spelar med O`;
    } else if (oGameData.currentPlayer === oGameData.playerTwo) {
        oGameData.currentPlayer = oGameData.playerOne;
        currentPlayer.innerText = `Aktuell spelare är ${oGameData.nickNamePlayerOne} och du spelar med X`;
    }
}

function timer() {

}

function gameOver(result) {
    let clickedTable = document.querySelector('#gameArea table');
    clickedTable.removeEventListener('click', executeMove);
    let form = document.querySelector('#theForm');
    form.classList.remove('d-none');
    let gameArea = document.querySelector('#gameArea');
    gameArea.classList.add('d-none');

    let gameOver = document.querySelector('.jumbotron h1');
    if(result === 1) {
        gameOver.innerText = `Grattis ${oGameData.nickNamePlayerOne} du har vunnit! Spela igen?`;
    } else if(result === 2) {
        gameOver.innerText = `Grattis ${oGameData.nickNamePlayerTwo} du har vunnit! Spela igen?`;
    } else if(result === 3) {
        gameOver.innerText = `Det blev oavgjort! Spela igen?`;
    }
    initGlobalObject();
}

function executeMove() {
    var clickedCell = document.querySelectorAll('td');
    for(let i = 0; i < clickedCell.length; i++) {
            clickedCell[i].addEventListener('click', (event) => {
                if (clickedCell[i].textContent === '') {
                    let dataId = event.target.getAttribute('data-id');
                    console.log(`Jag tillhör data-id ${dataId}`);
                    oGameData.gameField[dataId] = oGameData.currentPlayer;
                    clickedCell[i].textContent = oGameData.currentPlayer;
                    if (oGameData.currentPlayer === oGameData.playerOne) {
                        clickedCell[i].style.backgroundColor = oGameData.colorPlayerOne;
                    } else if (oGameData.currentPlayer === oGameData.playerTwo) {
                        clickedCell[i].style.backgroundColor = oGameData.colorPlayerTwo;
                    }
                    let checkIfPlayerHasWon = checkForGameOver();
                    if (checkIfPlayerHasWon) {
                        console.log(checkIfPlayerHasWon);
                       return gameOver(checkIfPlayerHasWon);
                    }    
                    changePlayer();
                };
            });
    };
};