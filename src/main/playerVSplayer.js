import script from "../script.js";

function renderBoard(board, boardContainer) {
    boardContainer.innerHTML = "";

    for(let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add(`row${i}`);

        for(let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');

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