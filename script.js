"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

initGlobalObject();
prepGame()
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
    if (checkWinner(`X`)) {
        return 1;
    }
    //Kontrollerar om "O" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 2
    if (checkWinner(`O`)) {
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
    return oGameData.gameField.every(position => position !== ``);
}

//Funktion som förbereder spelet inför start
function prepGame() {
    // Göm spelplanen
    const gameAreaRef = document.querySelector(`#gameArea`)
    gameAreaRef.classList.add(`d-none`);
    // lägga en lyssnare på "Starta spelet!"-knappen. klick anropar funktionen "initiateGame()
    document.querySelector(`#newGame`).addEventListener(`click`, () => initiateGame(gameAreaRef));
}

function validateForm() {

}

function initiateGame(gameAreaRef) {
    // Göm formuläret
    document.querySelector(`#theForm`).classList.add(`d-none`);
    // Visa spelplanen
    gameAreaRef.classList.remove(`d-none`);
    // Ta bort textInnehållet
    document.querySelector(`#errorMsg`).textContent = ``;
    // Spara information om spelare ett 
    oGameData.nickNamePlayerOne = document.querySelector(`#nick1`).value;
    oGameData.colorPlayerOne = document.querySelector(`#color1`).value;
    // Spara information om spelare två
    oGameData.nickNamePlayerTwo = document.querySelector(`#nick2`).value;
    oGameData.colorPlayerTwo = document.querySelector(`#color2`).value;
    // Töm spelplanen
    const gameAreaBoxes = gameAreaRef.querySelectorAll(`TD`);
    gameAreaBoxes.forEach(box => { box.textContent = `` });
    // lokala variablerna 
    let playerChar = ``;
    let playerName = ``;
    // Slumpa vilken spelare som börjar 
    for (let i = 0; i < 50; i++) {
        let randomNum = Math.random()
        if (randomNum < .5) {
            playerChar = oGameData.playerOne;
            playerName = oGameData.nickNamePlayerOne;
            oGameData.currentPlayer = oGameData.playerOne;
        } else if (randomNum >= .5) {
            playerChar = oGameData.playerTwo;
            playerName = oGameData.nickNamePlayerTwo;
            oGameData.currentPlayer = oGameData.playerTwo;
        }
    }

    // Ändra texten i h1-elementet till aktuell spelare
    document.querySelector(`.jumbotron h1`).textContent = `Aktuell spelare är ${oGameData.currentPlayer}`

    // Lägg till en klicklyssnare på spelplanen. Vid klick skall funktionen "executeMove()" anropas.
    gameAreaBoxes.forEach(box => {
        box.addEventListener(`click`, executeMove, box)
    });

}

function executeMove(box) {
    const clickedBox = box.target;
    console.log('box clicked')
    // Kontrollera att den klickade cellen är ledig.
    if (clickedBox.textContent === ``) {
        // Hämta ut attributet "data-id" från den klickade cellen,
        const boxId = clickedBox.getAttribute(`data-id`)
        // sätta "oGameData.gameField" på den hämtade positionen till nuvarande spelare
        oGameData.gameField[boxId] = oGameData.currentPlayer
        // Anropa funktionen "changePlayer()"
        changePlayer(clickedBox)
        // Anropa er rättningsfunktion
        const returnedNmbr = checkForGameOver()

        if (returnedNmbr !== 0) {
            gameOver(returnedNmbr)
        }

    }


}
function startGame() {

}

function changePlayer(clickedBox) {
    // Kontrollera vem som är nuvarande spelare, och utifrån det sätt bakgrundsfärgen
    if (oGameData.currentPlayer === oGameData.playerOne) {
        clickedBox.style.backgroundColor = oGameData.colorPlayerOne
        clickedBox.textContent = `X`
        oGameData.currentPlayer = `O`
    } else {
        clickedBox.style.backgroundColor = oGameData.colorPlayerTwo
        clickedBox.textContent = `O`
        oGameData.currentPlayer = `X`
    }

    document.querySelector(`.jumbotron h1`).textContent = `Aktuell spelare är ${oGameData.currentPlayer}`
}

function timer() {

}

function gameOver(nmbr) {
    const gameAreaBoxes = document.querySelector(`#gameArea`).querySelectorAll(`TD`);
    gameAreaBoxes.forEach(box => {
        box.removeEventListener(`click`, executeMove)
        box.style.backgroundColor = `white`;
    })
    document.querySelector(`#theForm`).classList.remove(`d-none`)
    document.querySelector(`#gameArea`).classList.add(`d-none`)

    if (nmbr === 1) {
        document.querySelector(`.jumbotron h1`).innerHTML = `Grattis ${oGameData.nickNamePlayerOne} du har vunnit! <br> Spela igen?`;
    } else if (nmbr === 2) {
        document.querySelector(`.jumbotron h1`).innerHTML = `Grattis ${oGameData.nickNamePlayerTwo} du har vunnit! <br> Spela igen?`;
    } else if (nmbr === 3) {
        document.querySelector(`.jumbotron h1`).innerHTML = "Spelet slutade oavgjort <br> Spela igen?";
    }
    initGlobalObject()
}
