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
                this.board[i][j] = [];
            }
        }
    }

    placeShip(length, coordinates) {
        if(length === 1) {
            let x = coordinates[0];
            let y = coordinates[1];

            if(this.board[x][y] === '-') throw Error('Already a ship present');
            this.board[x][y] = '-';
        }
        else {
            let x1 = coordinates[0][0];
            let y1 = coordinates[0][1];
            let x2 = coordinates[1][0];
            let y2 = coordinates[1][1];

            if(x1 === x2) {
                for(;y1 <= y2; y1++) {
                    if(this.shipAlreadyPresent(y1,y2,x1)) throw Error('Already a ship present');
                    this.board[x1][y1] = '-';
                }
            }
            else if(y1 === y2){
                for(;x1 <= x2; x1++) {
                    if(this.shipAlreadyPresent(x1,x2,y1)) throw Error('Already a ship present');
                    this.board[y1][x1] = '-';
                }
            }
        }
    }

    shipAlreadyPresent(a1, a2, x) {
        for(;a1 <= a2; a1++) {
            if(this.board[x][a1] === '-') {
                return true;
            }
            else {
                return false;
            }
        }
    }

    showBoard() {
        return this.board;
    }
}
let makeBoard = new Gameboard();
makeBoard.makeGameboard()
makeBoard.placeShip(4, [[1,2], [1,5]]);
makeBoard.placeShip(3, [[1,0], [1,3]]);
console.log(makeBoard.showBoard());

export default Ship;