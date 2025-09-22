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
    ev.preventDefault();
    const {player1} = players;
    const shipId = ev.dataTransfer.getData("shipId");
    const shipEl = document.getElementById(shipId);

    const x = Number(ev.target.dataset.x);
    const y = Number(ev.target.dataset.y);

    const length = parseInt(shipEl.dataset.length);

    const selectInfo = document.querySelector('.info');
    
    if(docker.classList.contains('autoFlowColumn')) success = player1.gameboard.placeShip(length, [[x,y], [x, y + length - 1]]);
    else success = player1.gameboard.placeShip(length, [[x,y], [x + length - 1, y]]);
    console.log(success);
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

        if(success !== false) {
            selectInfo.classList.remove('error');
            selectInfo.textContent = "Place all of your ships on the board to start the game !"
            renderBoard(player1.gameboard.showBoard(), document.getElementById('firstPlayerBoard'));
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

            row.appendChild(cell);
        }

        boardContainer.appendChild(row);
    }
}

export {renderBoard}