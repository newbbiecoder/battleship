import INPUTNAMES from "./main/inputName.js";
import { renderBoard } from "./main/playerVSplayer.js";
import script from "./script.js";
import "./style.css"

const pvp = document.querySelector('.modes > p:first-child');
const container = document.querySelector('.container');

pvp.addEventListener('click', () => {
    INPUTNAMES.askPlayersNames();

    const submit = document.querySelector('.submit');

    submit.addEventListener('click', () => {
        createBoards()
    })
});

function createBoards() {
    container.innerHTML = "";
    
    const gameUpdates = document.createElement('div');
    gameUpdates.classList.add('gameUpdates');
    container.appendChild(gameUpdates);

    const player1 = new script.Player(INPUTNAMES.player1.value);

    const player1Wrapper = document.createElement('div');
    player1Wrapper.classList.add('player1Wrapper');
    container.appendChild(player1Wrapper)

    const player1Name = document.createElement('p');
    player1Name.classList.add('player1Name');
    player1Name.textContent = `${INPUTNAMES.player1.value}`;
    player1Wrapper.appendChild(player1Name);

    const firstPlayerBoardContainer = document.createElement('div');
    firstPlayerBoardContainer.id = "firstPlayerBoard"
    firstPlayerBoardContainer.classList.add('board');
    player1Wrapper.appendChild(firstPlayerBoardContainer);

    renderBoard(player1.gameboard.showBoard(), firstPlayerBoardContainer);

    const player2 = new script.Player(INPUTNAMES.player2.value);

    const player2Wrapper = document.createElement('div');
    player2Wrapper.classList.add('player2Wrapper');
    container.appendChild(player2Wrapper);

    const player2Name = document.createElement('p');
    player2Name.classList.add('player2Name');
    player2Name.textContent = `${INPUTNAMES.player2.value}`;
    player2Wrapper.appendChild(player2Name);

    const secondPlayerBoardContainer = document.createElement('div');
    secondPlayerBoardContainer.id = "secondPlayerBoard";
    secondPlayerBoardContainer.classList.add("board");
    player2Wrapper.appendChild(secondPlayerBoardContainer);

    const gameBoards = document.createElement('div');
    gameBoards.classList.add('gameBoards');
    container.appendChild(gameBoards);
    gameBoards.appendChild(player1Wrapper);
    gameBoards.appendChild(player2Wrapper);

    renderBoard(player2.gameboard.showBoard(), secondPlayerBoardContainer);
}