import script from "../script.js";
import { computerPlayers } from "./gameLogicComputer.js";

let success;

// dragOverHandler
function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    const docker = document.querySelector('.docker');
    const dockerContainer = document.querySelector('.dockerContainer');

    ev.preventDefault();
    
    const {player} = computerPlayers;
    const {computer} = computerPlayers;

    const shipId = ev.dataTransfer.getData("shipId");
    const shipEl = document.getElementById(shipId);
    
    const x = Number(ev.target.dataset.x);
    const y = Number(ev.target.dataset.y);

    if(shipEl === null) return;

    const length = parseInt(shipEl.dataset.length);

    const selectInfo = document.querySelector('.info');

    if(docker.classList.contains('autoFlowColumn')) success = player.gameboard.placeShip(length, [[x,y], [x, y + length - 1]]);
    else success = player.gameboard.placeShip(length, [[x,y], [x + length - 1, y]]);

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

    if(success !== false && dockerContainer.classList.contains('playerDocker')) {
        selectInfo.classList.remove('error');
        selectInfo.textContent = "Place all of your ships on the board to start the game !"
        renderBoardComputer(player.gameboard.showBoard(), document.getElementById('humanPlayerBoard'));
        shipEl.setAttribute('draggable', false);
        shipEl.style.opacity = "0.5";
    }
}

function renderBoardComputer(board, boardContainer) {
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

            if(boardContainer === document.getElementById('computerPlayerBoard')) {
                if(!document.querySelector('.dockerContainer') && (!cell.classList.contains('hit') && !cell.classList.contains('miss'))) cell.classList.add('hide');
            }

            row.appendChild(cell);
        }

        boardContainer.appendChild(row);
    }
}

export {renderBoardComputer};