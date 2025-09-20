import INPUTNAMES from "./inputName.js";
import { renderBoard } from "./playerVSplayer.js";
import script from "../script.js";

const container = document.querySelector('.container');

function createBoards() {
    container.innerHTML = "";

    const playerTurn = document.createElement('div');
    playerTurn.classList.add('playerTurn');
    container.appendChild(playerTurn);
    
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


let player1Turn = true;

function boardEventListeners(player1, firstPlayerBoardContainer, player2, secondPlayerBoardContainer) {
    const gameUpdates = document.querySelector('.gameUpdates');
    const playerTurn = document.querySelector('.playerTurn');

    const player1Name = document.querySelector('.player1Name');
    const player2Name = document.querySelector('.player2Name');

    playerTurn.textContent = `${player1Name.textContent}'s Turn`
    playerTurn.classList.add('player1');
    
    function secondEventListener(e) {
        if(!player1Turn) return;
        playerTurn.textContent = `${player1Name.textContent}'s Turn`;
        if(!e.target.classList.contains("cell")) return;
        if(e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;

        const x = Number(e.target.dataset.x);
        const y = Number(e.target.dataset.y);
        
        const result = player1.attack(player2, [x,y]);
        renderBoard(player2.gameboard.showBoard(), document.getElementById('secondPlayerBoard'));
        console.log("Player 2", result);
        
        updateGameMessage(gameUpdates, result);

        if(result === "Hit" || result === "Ship sunk") return;
        if(result === "Miss") {
            playerTurn.classList = "";
            playerTurn.classList.add("player2");
            playerTurn.textContent = `${player2Name.textContent}'s Turn`;
        }
        if(result === "All ships have sunk") {
            firstPlayerBoardContainer.removeEventListener('click', firstEventListener);
            secondPlayerBoardContainer.removeEventListener('click', secondEventListener)
        }
        player1Turn = false;
    }

    secondPlayerBoardContainer.addEventListener('click', secondEventListener)
        
    function firstEventListener(e) {
        if(player1Turn) return;
        playerTurn.textContent = `${player2Name.textContent}'s Turn`;
        if(!e.target.classList.contains("cell")) return;
        if(e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;

        const x = Number(e.target.dataset.x);
        const y = Number(e.target.dataset.y);

        let result = player2.attack(player1, [x,y]);
        renderBoard(player1.gameboard.showBoard(), document.getElementById('firstPlayerBoard'));
        console.log("Player 1", result);

        updateGameMessage(gameUpdates, result);

        if(result === "Hit" || result === "Ship sunk") return;
        if(result === "Miss") {
            playerTurn.classList = "";
            playerTurn.textContent = `${player1Name.textContent}'s Turn`;
            playerTurn.classList.add('player1');
        }
        if(result === "All ships have sunk") {
            firstPlayerBoardContainer.removeEventListener('click', firstEventListener);
            secondPlayerBoardContainer.removeEventListener('click', secondEventListener)
        }

        player1Turn = true;
    } 
    firstPlayerBoardContainer.addEventListener('click', firstEventListener)
}    



function placeShips(player) {
    player.gameboard.placeShip(4, [[1,2], [1,5]]);
    player.gameboard.placeShip(1, [4,4]);
    player.gameboard.placeShip(5, [[8,4], [8,8]]);
    player.gameboard.placeShip(3, [[0,0], [2,0]]);
}

function updateGameMessage(gameUpdates, type) {
    gameUpdates.classList = "";
    gameUpdates.classList = "gameUpdates show";

    switch(type) {
        case "Hit":
            gameUpdates.classList.add("hit");
            gameUpdates.textContent = "💥 HIT!";
            break;
        case "Miss":
            gameUpdates.classList.add("miss");
            gameUpdates.textContent = "🌊 MISS!";
            break;
        case "Ship sunk":
            gameUpdates.classList.add("shipSunk");
            gameUpdates.textContent = "🚢 SHIP SUNK!";
            break;
        case "All ships have sunk":
            gameUpdates.classList.add("gameover");
            gameUpdates.textContent = "🏆 ALL SHIPS SUNK! GAME OVER!";
            break;
    }
}



export {createBoards}