import script from "../script.js";
import { players } from "./gameLogic.js";

let success;

// dragOverHandler
function dragoverHandler(ev) {
    ev.preventDefault();
}

// dropHandler
function dropHandler(ev) {
    const docker = document.querySelector('.docker');
    const dockerContainer = document.querySelector('.dockerContainer');

    ev.preventDefault();
    const {player1} = players;
    const {player2} = players;

    const shipId = ev.dataTransfer.getData("shipId");
    const shipEl = document.getElementById(shipId);

    const x = Number(ev.target.dataset.x);
    const y = Number(ev.target.dataset.y);

    const length = parseInt(shipEl.dataset.length);

    const selectInfo = document.querySelector('.info');
    
    if(dockerContainer.classList.contains('player1Docker')) {
        if(docker.classList.contains('autoFlowColumn')) success = player1.gameboard.placeShip(length, [[x,y], [x, y + length - 1]]);
        else success = player1.gameboard.placeShip(length, [[x,y], [x + length - 1, y]]);
    }
    else if(dockerContainer.classList.contains('player2Docker')) {
        console.log("REACHED?");
        if(docker.classList.contains('autoFlowColumn')) success = player2.gameboard.placeShip(length, [[x,y], [x, y + length - 1]]);
        else success = player2.gameboard.placeShip(length, [[x,y], [x + length - 1, y]]);
    }

    
    if(success === "Invalid coord") {
        selectInfo.classList.add('error');
        selectInfo.textContent = "Invalid Placement";
        return;
    }

    if(success === "Already a ship present") {
        selectInfo.classList.add('error');
        selectInfo.textContent = "Already a ship present";
        return;
    }

    if(success !== false && dockerContainer.classList.contains('player1Docker')) {
        selectInfo.classList.remove('error');
        selectInfo.textContent = "Place all of your ships on the board to start the game !"
        renderBoard(player1.gameboard.showBoard(), document.getElementById('firstPlayerBoard'));
        shipEl.setAttribute('draggable', false);
        shipEl.style.opacity = "0.5";
    }
    else if(success !== false && dockerContainer.classList.contains('player2Docker')) {
        console.log("AGAIN HEHEHE");
        selectInfo.classList.remove('error');
        selectInfo.textContent = "Place all of your ships on the board to start the game !";
        renderBoard(player2.gameboard.showBoard(), document.getElementById('secondPlayerBoard'));
        shipEl.setAttribute('draggable', false);
        shipEl.style.opacity = "0.5";
    }
}

function renderBoard(board, boardContainer) {
    boardContainer.innerHTML = "";

    for(let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add(`row${i}`);

        for(let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener("dragover", dragoverHandler)
            cell.addEventListener("drop", dropHandler);           

            cell.dataset.x = i;
            cell.dataset.y = j;

            const value = board[i][j];

            if(value === "X") cell.classList.add('hit');
            else if(value === ".") cell.classList.add('miss');
            else if(value instanceof script.Ship) cell.classList.add('ship');

            if(!document.querySelector('.dockerContainer') && (!cell.classList.contains('hit') && !cell.classList.contains('miss'))) cell.classList.add('hide');

            row.appendChild(cell);
        }

        boardContainer.appendChild(row);
    }
}

export {renderBoard}