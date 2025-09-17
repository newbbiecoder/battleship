import script from './script';

describe('Ship', () => {
    let ship1;

    beforeEach(() => {
        ship1 = new script.Ship(2);
    })

    test('Hit the ship 1 time and check number of hits', () => {
        ship1.hitShip();
        expect(ship1.totalHits()).toBe(1);
    })

    test('Hit the ship two times and check if it has sunk', () => {
        ship1.hitShip();
        ship1.hitShip();
        expect(ship1.isShipSunk()).toBe(true);
    })
})

describe('GameBoard', () => {
    let makeBoard;

    beforeEach(() => {
        makeBoard = new script.Gameboard();
        makeBoard.makeGameboard();
    })

    describe('Initialize 10x10 Grid', () => {
        test('Board length should be 10', () => {
            expect(makeBoard.showBoard().length).toBe(10);
        })
        
        test("Each row's length should be 10", () => {
            expect(makeBoard.showBoard().every(row => row.length === 10)).toBe(true);
        })

        test("Each row's element should be null", () => {
            expect(makeBoard.showBoard().every(row => row.every(element => element === null))).toBe(true);
        })
    })

    // Throw error cases
    describe('Error cases', () => {
        test('Place a single ship at coordinate [1,2] then place the ship on that same coord again', () => {
            makeBoard.placeShip(1, [1,2]);
            expect(() => makeBoard.placeShip(1, [1,2])).toThrow("Already a ship present");
        })

        test('Place horizontal ships from coordinates [2,3] to [2,5], then place vertical ships from [1,3] to [5,3]', () => {
            makeBoard.placeShip(3,[[2,3], [2,5]]);
            expect(() => makeBoard.placeShip(6, [[1,3], [5,3]])).toThrow("Already a ship present");
        })

        test('Place vertical ships from coordinates [1,1] to [3,1], then place horizontal ships from [2,1] to [4,1]', () => {
            makeBoard.placeShip(4, [[1,1], [3,1]]);
            expect(() => makeBoard.placeShip(3, [[2,1], [4,1]])).toThrow("Already a ship present");
        })
    })
})