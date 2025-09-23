import INPUTNAMES from "./inputName.js";
import { renderBoard } from "./playerVSplayer.js";
import script from "../script.js";

const container = document.querySelector('.container');
let players = {};

function createBoards() {
    container.innerHTML = "";

    const playerTurn = document.createElement('div');
    playerTurn.classList.add('playerTurn');
    container.appendChild(playerTurn);
    
    const gameUpdates = document.createElement('div');
    gameUpdates.classList.add('gameUpdates');
    container.appendChild(gameUpdates);
    
    const player2 = new script.Player(INPUTNAMES.player2.value);

    const player2Wrapper = document.createElement('div');
    player2Wrapper.classList.add('player2Wrapper');

    const player2Name = document.createElement('p');
    player2Name.classList.add('player2Name');
    player2Name.textContent = `${INPUTNAMES.player2.value}`;
    player2Wrapper.appendChild(player2Name);

    const secondPlayerBoardContainer = document.createElement('div');
    secondPlayerBoardContainer.id = "secondPlayerBoard";
    secondPlayerBoardContainer.classList.add("board");
    player2Wrapper.appendChild(secondPlayerBoardContainer);

    
    const player1 = new script.Player(INPUTNAMES.player1.value);

    const player1Wrapper = document.createElement('div');
    player1Wrapper.classList.add('player1Wrapper');

    const player1Name = document.createElement('p');
    player1Name.classList.add('player1Name');
    player1Name.textContent = `${INPUTNAMES.player1.value}`;
    player1Wrapper.appendChild(player1Name);

    const firstPlayerBoardContainer = document.createElement('div');
    firstPlayerBoardContainer.id = "firstPlayerBoard"
    firstPlayerBoardContainer.classList.add('board');
    player1Wrapper.appendChild(firstPlayerBoardContainer);

    const gameBoards = document.createElement('div');
    gameBoards.classList.add('gameBoards'); 
    gameBoards.appendChild(player1Wrapper);
    gameBoards.appendChild(player2Wrapper);
    container.appendChild(gameBoards);

    renderBoard(player1.gameboard.showBoard(), firstPlayerBoardContainer);
    renderBoard(player2.gameboard.showBoard(), secondPlayerBoardContainer);
    // Place player1 ships
    placeShipsOnBoard(player1);
    
    // Event Listeners for both boards
    boardEventListeners(player1, firstPlayerBoardContainer, player2, secondPlayerBoardContainer);
    
    players = {player1, player2};
    return players;
}

function placeShipsOnBoard(player) {
    const gameBoards = document.querySelector('.gameBoards');

    let player1Name = document.querySelector('.player1Name');
    let player2Name = document.querySelector('.player2Name');

    const dockerContainer = document.createElement('div');
    dockerContainer.classList.add('dockerContainer');
    gameBoards.appendChild(dockerContainer);

    const info = document.createElement('div');
    info.classList.add('info');
    dockerContainer.appendChild(info);

    const rotateButton = document.createElement('button');
    rotateButton.classList.add('rotate');
    dockerContainer.appendChild(rotateButton);
    rotateButton.textContent = "↻"

    if(player.name === player1Name.textContent) {
        dockerContainer.classList.add('player1Docker');
        info.textContent = "Place all of your ships on the board to start the game !";
    }


    const docker = document.createElement('div');
    docker.classList.add('docker');
    dockerContainer.appendChild(docker);
    
    // Continue Button
    const continueButton = document.createElement('div');
    continueButton.classList.add('continueButton');
    continueButton.textContent = "Continue";
    dockerContainer.appendChild(continueButton);

    // dragStartHandler
    function dragstartHandler(ev) {
        ev.dataTransfer.setData("shipId", ev.target.id);
    }

    // 5 SHIPS

    // Carrier
    const carrier = document.createElement('div');
    carrier.id = 'carrier';
    carrier.setAttribute('draggable', true);
    carrier.addEventListener("dragstart", dragstartHandler);
    carrier.dataset.length = "5";
    docker.appendChild(carrier);

    for(let i = 0; i < 5; i++) {
        const cell1 = document.createElement('div');
        cell1.classList.add('cell');
        cell1.classList.add('removeHover');
        carrier.appendChild(cell1);
    }

    // Battleship
    const battleship = document.createElement('div');
    battleship.id = 'battleship';
    battleship.setAttribute('draggable', true);
    battleship.addEventListener('dragstart', dragstartHandler);
    battleship.dataset.length = "4";
    docker.appendChild(battleship);

    for(let i = 0; i < 4; i++) {
        const cell2 = document.createElement('div');
        cell2.classList.add('cell');
        cell2.classList.add('removeHover');
        battleship.appendChild(cell2);
    }

    // Cruiser
    const cruiser = document.createElement('div');
    cruiser.id = 'cruiser';
    cruiser.setAttribute('draggable', true);
    cruiser.addEventListener('dragstart', dragstartHandler);
    cruiser.dataset.length = "3";
    docker.appendChild(cruiser);

    for(let i = 0; i < 3; i++) {
        const cell3 = document.createElement('div');
        cell3.classList.add('cell');
        cell3.classList.add('removeHover');
        cruiser.appendChild(cell3);
    }

    // Submarine
    const submarine = document.createElement('div');
    submarine.id = 'submarine';
    submarine.setAttribute('draggable', true);
    submarine.addEventListener('dragstart', dragstartHandler);
    submarine.dataset.length = "3";
    docker.appendChild(submarine);

    for(let i = 0; i < 3; i++) {
        const cell4 = document.createElement('div');
        cell4.classList.add('cell');
        cell4.classList.add('removeHover');
        submarine.appendChild(cell4);
    }

    // Destroyer
    const destroyer = document.createElement('div');
    destroyer.id = 'destroyer';
    destroyer.setAttribute('draggable', true);
    destroyer.addEventListener('dragstart', dragstartHandler);
    destroyer.dataset.length = "2";
    docker.appendChild(destroyer);

    for(let i = 0; i < 2; i++) {
        const cell5 = document.createElement('div');
        cell5.classList.add('cell');
        cell5.classList.add('removeHover');
        destroyer.appendChild(cell5);
    }

    buttonEventListener();
}
let isRotated = false;

function buttonEventListener() {
    const docker = document.querySelector('.docker');
    const rotateButton = document.querySelector('.rotate');

    const carrier = document.getElementById('carrier');
    const battleship = document.getElementById('battleship');
    const cruiser = document.getElementById('cruiser');
    const submarine = document.getElementById('submarine');
    const destroyer = document.getElementById('destroyer');
    
    rotateButton.addEventListener('click', () => {
        if(!isRotated) {
            carrier.classList.add('column');
            battleship.classList.add('column');
            cruiser.classList.add('column');
            submarine.classList.add('column');
            destroyer.classList.add('column');
            docker.classList.add('autoFlowColumn');
            docker.style.gridTemplateRows = 'none';
            isRotated = true;
            return;
        }
        carrier.classList.remove('column');
        battleship.classList.remove('column');
        cruiser.classList.remove('column');
        submarine.classList.remove('column');
        destroyer.classList.remove('column');
        docker.classList.remove('autoFlowColumn');
        docker.setAttribute('grid-template-row', 'repeat(5, 1fr)');
        isRotated = false;
        return;
    })

    const continueButton = document.querySelector('.continueButton');
    const info = document.querySelector('.info');

    continueButton.addEventListener('click', () => {
        if(carrier.draggable || battleship.draggable ||
            cruiser.draggable || submarine.draggable ||
            destroyer.draggable
        ) {  
            info.classList.add('error');
            info.textContent = "Place all of the ships first";
        }
        else {

            document.querySelector('.dockerContainer').classList.remove('player1Docker');
            document.querySelector('.dockerContainer').classList.add('player2Docker');

            document.getElementById('carrier').setAttribute('draggable', true);
            document.getElementById('carrier').style = "";

            document.getElementById('battleship').setAttribute('draggable', true);
            document.getElementById('battleship').style = "";

            document.getElementById('cruiser').setAttribute('draggable', true);
            document.getElementById('cruiser').style = "";

            document.getElementById('submarine').setAttribute('draggable', true);
            document.getElementById('submarine').style = "";

            document.getElementById('destroyer').setAttribute('draggable', true);
            document.getElementById('destroyer').style = ""

            continueButton.textContent = "Submit";
            continueButton.addEventListener('click', () => {
                document.querySelector('.dockerContainer').remove();
                document.querySelector('.cell').removeEventListener("dragover", dragoverHandler)
            })
        }
    })
}

function dragoverHandler(ev) {
    ev.preventDefault();
}


let player1Turn = true;

function boardEventListeners(player1, firstPlayerBoardContainer, player2, secondPlayerBoardContainer) {
    const gameUpdates = document.querySelector('.gameUpdates');
    const playerTurn = document.querySelector('.playerTurn');

    const player1Name = document.querySelector('.player1Name');
    const player2Name = document.querySelector('.player2Name');

    playerTurn.textContent = `${player1Name.textContent}'s Turn`
    playerTurn.classList.add('player1');

    const dockerContainer = document.querySelector('.dockerContainer');
    
    function secondEventListener(e) {
        if(!player1Turn) return;
        playerTurn.textContent = `${player1Name.textContent}'s Turn`;
        if(!e.target.classList.contains("cell")) return;
        if(e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;
        if(dockerContainer.classList.contains('player2Docker')) return;

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

    secondPlayerBoardContainer.addEventListener('click', secondEventListener);
        
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
    firstPlayerBoardContainer.addEventListener('click', firstEventListener);
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

export {createBoards, players}