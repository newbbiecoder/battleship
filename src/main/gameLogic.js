import INPUTNAMES from "./inputName.js";
import { renderBoard } from "./playerVSplayer.js";
import script from "../script.js";

const container = document.querySelector('.container');

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

    // Place player1 ships
    placeShips(player1);

    // Display ships on board
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
    
    // Place player2 ships
    placeShips(player2);

    // Display the ships on board
    renderBoard(player2.gameboard.showBoard(), secondPlayerBoardContainer);

    // Event Listeners for both boards
    boardEventListeners(player1, firstPlayerBoardContainer, player2, secondPlayerBoardContainer);

}

function boardEventListeners(player1, firstPlayerBoardContainer, player2, secondPlayerBoardContainer) {
    firstPlayerBoardContainer.addEventListener('click', (e) => {
        if(!e.target.classList.contains('cell')) return;
        if(e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;

        let x = e.target.dataset.x;
        let y = e.target.dataset.y;

        let result = player2.attack(player1, [x,y]);
        renderBoard(player1.gameboard.showBoard(), document.getElementById('firstPlayerBoard'));

        console.log("Player 1", result);
        return result;
    })

    secondPlayerBoardContainer.addEventListener('click', (e) => {
        if(!e.target.classList.contains("cell")) return;
        if(e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;

        const x = Number(e.target.dataset.x);
        const y = Number(e.target.dataset.y);

        const result = player1.attack(player2, [x,y]);
        renderBoard(player2.gameboard.showBoard(), document.getElementById('secondPlayerBoard'));

        console.log("Player 2", result);
        return result;
    })
}


function placeShips(player) {
    player.gameboard.placeShip(4, [[1,2], [1,5]]);
    player.gameboard.placeShip(1, [4,4]);
    player.gameboard.placeShip(5, [[8,4], [8,8]]);
    player.gameboard.placeShip(3, [[0,0], [2,0]]);
}

export {createBoards}