import Ship from './script';

describe('Ship', () => {
    let ship1;

    beforeEach(() => {
        ship1 = new Ship(4,2);
    })

    test('Hit the ship 1 time and check number of hits', () => {
        ship1.hitShip();
        expect(ship1.totalHits()).toBe(3);
    })

    test('Hit the ship two times and check if it has sunk', () => {
        ship1.hitShip();
        ship1.hitShip();
        expect(ship1.isShipSunk()).toBe(true);
    })
})