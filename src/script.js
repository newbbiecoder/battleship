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

    recieveAttack(coordinates) {
        let [x,y] = coordinates;
        let cell = this.board[x][y];

        if(cell instanceof Ship) {
            cell.hitShip();
            this.board[x][y] = 'X';
        }
        else {
            this.board[x][y] = '.';
            return "Miss";
        }

        if(cell.isShipSunk()) {
            if(this.allshipsSunk()) {
                return "All ships have sunk";
            }
            return "Ship sunk";
        }
    }

    showBoard() {
        return this.board;
    }

    allshipsSunk() {
        return this.board.flat().filter(cell => cell instanceof Ship).every(ship => ship.isShipSunk());
    }
}

class Player {
    constructor(name, isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.gameboard = new Gameboard();
        this.gameboard.makeGameboard();
    }

    attack(opponent, coordinates) {
        return opponent.gameboard.recieveAttack(coordinates);
    }

    randomAttack(opponent) {
        if(!this.isComputer) return null;

        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        if(opponent.gameboard.showBoard()[x,y] !== 'X') this.attack(opponent, [x,y]);
        return [x,y];
    }
}

export default {Ship, Gameboard, Player};