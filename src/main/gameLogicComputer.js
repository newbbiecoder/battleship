import INPUTCOMPUTERNAME from "./inputNameComputer.js";
import { renderBoardComputer } from "./playerVScomputer.js";
import script from "../script.js";

const container = document.querySelector('.container');

let computerPlayers = {};
function createBoardsComputer() {
    container.innerHTML = "";

    const onLoadHeading = document.createElement('div');
    onLoadHeading.textContent = "Place all of the ships to start the game :)"
    onLoadHeading.classList.add('onLoadHeading');
    container.appendChild(onLoadHeading);

    const playerTurn = document.createElement('div');
    playerTurn.classList.add('playerTurn');
    playerTurn.style.display = "none";
    container.appendChild(playerTurn);
    
    const gameUpdates = document.createElement('div');
    gameUpdates.classList.add('gameUpdates');
    container.appendChild(gameUpdates);

    const player = new script.Player(INPUTCOMPUTERNAME.player.value);

    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('playerWrapper');

    const playerName = document.createElement('p');
    playerName.classList.add('playerName');
    playerName.textContent = `${INPUTCOMPUTERNAME.player.value}`;
    playerWrapper.appendChild(playerName);

    const humanPlayerBoardContainer = document.createElement('div');
    humanPlayerBoardContainer.id = "humanPlayerBoard";
    humanPlayerBoardContainer.classList.add("board");
    playerWrapper.appendChild(humanPlayerBoardContainer);

    const computer = new script.Player("Computer", true);

    const computerWrapper = document.createElement('p');
    computerWrapper.classList.add('computerWrapper');

    const computerName = document.createElement('p');
    computerName.classList.add('computerName');
    computerName.textContent = "Computer";
    computerWrapper.appendChild(computerName);

    const computerPlayerBoardContainer = document.createElement('div');
    computerPlayerBoardContainer.id = "computerPlayerBoard";
    computerPlayerBoardContainer.classList.add("board");
    computerWrapper.appendChild(computerPlayerBoardContainer);

    const gameBoards = document.createElement('div');
    gameBoards.classList.add('gameBoards'); 
    gameBoards.appendChild(playerWrapper);
    gameBoards.appendChild(computerWrapper);
    container.appendChild(gameBoards);

    renderBoardComputer(player.gameboard.showBoard(), humanPlayerBoardContainer);
    renderBoardComputer(computer.gameboard.showBoard(), computerPlayerBoardContainer);

    document.getElementById('computerPlayerBoard').style.display = "none";

    placeShipsOnBoardComputer(player);
    placeRandomShipsOnBoard(computer);

    boardEventListeners(player, humanPlayerBoardContainer, computer, computerPlayerBoardContainer);

    computerPlayers = {player, computer};
    return computerPlayers;
}

function placeShipsOnBoardComputer(player) {
    const gameBoards = document.querySelector('.gameBoards');

    let playerName = document.querySelector('.playerName');

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

    if(player.name === playerName.textContent) {
        dockerContainer.classList.add('playerDocker');
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
        document.getElementById('humanPlayerBoard').classList.remove('addPointer');
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

            document.querySelector('.dockerContainer').classList.remove('playerDocker');
            document.getElementById('computerPlayerBoard').style.display = "grid";
            continueButton.remove();

            document.querySelector('.onLoadHeading').remove();
            document.querySelector('.playerTurn').style.display = "block";
            document.querySelector('.dockerContainer').remove();
        }
    })
}

let humanTurn = true;

function boardEventListeners(player, humanPlayerBoardContainer, computer, computerPlayerBoardContainer) {
    const gameUpdates = document.querySelector('.gameUpdates');
    const playerTurn = document.querySelector('.playerTurn');

    const playerName = document.querySelector('.playerName');
    const computerName = document.querySelector('.computerName');

    playerTurn.textContent = `${player.name}'s Turn`
    playerTurn.classList.add('player');
    
    function computerEventListener(e) {      
        if(!humanTurn) computerAttack();
        playerTurn.textContent = `${player.name}'s Turn`;
        if(!e.target.classList.contains("cell")) return;
        if(e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;

        const x = Number(e.target.dataset.x);
        const y = Number(e.target.dataset.y);
        
        const result = player.attack(computer, [x,y]);
        renderBoardComputer(computer.gameboard.showBoard(), document.getElementById('computerPlayerBoard'));
        
        updateGameMessage(gameUpdates, result);

        if(result === "Hit" || result === "Ship sunk") return;
        if(result === "Miss") {
            document.querySelector('.gameUpdates').style.display = "block";
            playerTurn.classList = "";
            playerTurn.classList.add("computer");
            playerTurn.classList.add('playerTurn');
            playerTurn.textContent = `Waiting for ${computerName.textContent}'s...`;
            humanTurn = false;
        }
        if(result === "All ships have sunk") {
            const playerWon = document.createElement('div');
            playerWon.textContent = `${player.name} Won`;
            playerWon.classList.add('playerWon');

            document.querySelector('.container').insertBefore(playerWon, document.querySelector('.gameUpdates'));

            const lobby = document.createElement('button');
            lobby.textContent = "Lobby";
            lobby.classList.add('lobby');
            document.querySelector('.gameBoards').insertBefore(lobby, document.querySelector('.computerWrapper'));

            lobby.addEventListener('click', () => {
                window.location.reload();
            })

            computerPlayerBoardContainer.removeEventListener('click', computerEventListener);
            humanTurn = true;
        }

        computerAttack();

        function computerAttack() {
            const gameUpdates = document.querySelector('.gameUpdates');
            const playerTurn = document.querySelector('.playerTurn');

            const playerName = document.querySelector('.playerName');
            const computerName = document.querySelector('.computerName');


            document.querySelector('.gameUpdates').style.display = "block";
            document.getElementById('computerPlayerBoard').classList.add('addPointer');
            if(humanTurn) return;
            playerTurn.textContent = `Waiting for ${computerName.textContent}...`;

            let computerAttacks = computerMediumAttack(computer, player);
            let {computerResult} = computerAttacks;

            setTimeout(() => {
                document.getElementById('computerPlayerBoard').classList.remove('addPointer');
                renderBoardComputer(player.gameboard.showBoard(), document.getElementById('humanPlayerBoard'));

                updateGameMessage(gameUpdates, computerResult);

                if(computerResult === "Hit" || computerResult === "Ship sunk") {
                    updateGameMessage(gameUpdates, computerResult);
                    computerAttack();
                }
                if(computerResult === "Miss") {
                    playerTurn.classList = "";
                    playerTurn.classList.add('hide');
                    playerTurn.classList.add("player");
                    playerTurn.classList.add('playerTurn');
                    playerTurn.textContent = `${playerName.textContent}'s Turn`;
                    humanTurn = true;
                }

                if(computerResult === "All ships have sunk") {
                    const playerWon = document.createElement('div');
                    playerWon.textContent = `${computerName.textContent} Won`;
                    playerWon.classList.add('playerWon');

                    document.querySelector('.container').insertBefore(playerWon, document.querySelector('.gameUpdates'));

                    const lobby = document.createElement('button');
                    lobby.textContent = "Lobby";
                    lobby.classList.add('lobby');
                    document.querySelector('.gameBoards').insertBefore(lobby, document.querySelector('.computerWrapper'));

                    lobby.addEventListener('click', () => {
                        window.location.reload();
                    })
                    
                    computerPlayerBoardContainer.removeEventListener('click', computerEventListener);
                    humanTurn = true;
                }
                
            }, 2000)             
        }
    }

    computerPlayerBoardContainer.addEventListener('click', computerEventListener);
}

function computerMediumAttack(computer, player, previousHits = []) {

    function isValid(x, y) {
        if (x < 0 || y < 0) return false; 
        if (x >= 10 || y >= 10) return false;

        // if already attacked
        if (player.gameboard.board[x][y] === "X") return false;
        if (player.gameboard.board[x][y] === ".") return false;

        return true;
    }

    if (previousHits.length >= 2) {
        const [x1, y1] = previousHits[0];
        const [x2, y2] = previousHits[1];

        // horizontal 
        if (x1 === x2) {
            const minY = Math.min(...previousHits.map(([_, y]) => y));
            const maxY = Math.max(...previousHits.map(([_, y]) => y));

            if (isValid(x1, minY - 1)) return attackCell(x1, minY - 1);
            if (isValid(x1, maxY + 1)) return attackCell(x1, maxY + 1);
        }

        // vertical 
        if (y1 === y2) {
            const minX = Math.min(...previousHits.map(([x]) => x));
            const maxX = Math.max(...previousHits.map(([x]) => x));

            if (isValid(minX - 1, y1)) return attackCell(minX - 1, y1);
            if (isValid(maxX + 1, y1)) return attackCell(maxX + 1, y1);
        }
    }

    // gEt one hit and attack the neighbors
    if (previousHits.length > 0) {
        const [lastX, lastY] = previousHits[previousHits.length - 1];
        const directions = [
        [lastX - 1, lastY],
        [lastX + 1, lastY],
        [lastX, lastY - 1],
        [lastX, lastY + 1],
        ];

        for (const [x, y] of directions) {
            if (isValid(x, y)) return attackCell(x, y);
        }
    }

    // if no hit, do random attack
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * 10);
        newY = Math.floor(Math.random() * 10);
    } while (!isValid(newX, newY));

    return attackCell(newX, newY);


    function attackCell(x, y) {
        const computerResult = computer.attack(player, [x, y]);

        if (computerResult === "Hit") {
            previousHits.push([x, y]);
        } else if (computerResult === "Ship sunk") {
            previousHits = []; 
        }

        return { computerResult };
    }
}


function placeRandomShipsOnBoard(computer, ships = [5,4,3,3,2]) {
    for(let length of ships) {
        let placed = false;

        while(!placed) {
            const isVertical = Math.random() < 0.5;

            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);

            let coords = [];

            if(isVertical) {
                if(x + length > 10) continue;
                coords = Array.from({ length }, (_, i) => [x + i, y]);
            }
            else {
                if(y + length > 10) continue;
                coords = Array.from({ length }, (_, i) => [x, y + i]);
            }

            const valid = coords.every(([cx, cy]) => !computer.gameboard.board[cx][cy]);

            if (valid) {
                if (isVertical) computer.gameboard.placeShip(length, [[x,y], [x + length - 1,y]]);
                else computer.gameboard.placeShip(length, [[x,y], [x,y + length - 1]]);

                console.log(computer.gameboard.showBoard());
                placed = true;
            }
        }
    }
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
            gameUpdates.textContent = "🏆 ALL SHIPS SUNK! GAME OVER! 🏆";
            document.querySelector('.container > .playerTurn').style.display = "none";
            document.querySelector('.gameUpdates').style.display = "none";
            break;
    }
}

export {createBoardsComputer, computerPlayers}