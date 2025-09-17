class Ship {
    constructor(length) {
        this.length = length;
        this.hit = 0;
        this.isSunk = false;
    }

    hitShip() {
        this.hit += 1;
        if(this.hit === this.length) this.isSunk = true;
    }
    
    totalHits() {
        return this.hit;
    }

    isShipSunk() {
        return this.isSunk;
    }
}

class Gameboard {
    constructor() {
        this.board = [];
    }

    makeGameboard() {

        for(let i = 0; i < 10; i++) {
            this.board[i] = []
            for(let j = 0; j < 10; j++) {
                this.board[i][j] = null;
            }
        }
    }

    placeShip(length, coordinates) {
        const ship = new Ship(length);

        if(length === 1) {
            let [x,y] = coordinates;

            if(this.board[x][y]) throw new Error("Already a ship present");
            this.board[x][y] = ship;
        }
        else {
            let [x1,y1] = coordinates[0]
            let [x2,y2] = coordinates[1];

            if(x1 === x2) { // Vertical
                for(;y1 <= y2; y1++) {
                    if(this.board[x1][y1]) throw new Error('Already a ship present');
                    this.board[x1][y1] = ship;
                }
            }
            else if(y1 === y2){ // Horizontal
                for(;x1 <= x2; x1++) {
                    if(this.board[x1][y1]) throw new Error('Already a ship present');
                    this.board[x1][y1] = ship;
                }
            }
        }
    }

    recieveAttack(length, coordinates) {
        let ship = new Ship(length);
        let x = coordinates[0];
        let y = coordinates[1];

        if(this.board[x][y] === '-') {

            ship.hitShip();
            this.board[x][y] = 'X';
        }

        else {
            this.board[x][y] = '.';
        }

        if(ship.isShipSunk()) console.log("All ships have sunk");
    }

    showBoard() {
        return this.board;
    }
}


// let makeBoard = new Gameboard();
// makeBoard.makeGameboard()

// makeBoard.placeShip(2,[[2,3], [2,4]]);
// makeBoard.placeShip(6, [[1,3], [5,3]]);
// console.log(printBoard(makeBoard.showBoard()));

export default {Ship, Gameboard};