class Ship {
    constructor(length, hit) {
        this.length = length;
        this.hit = hit;
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

export default Ship;