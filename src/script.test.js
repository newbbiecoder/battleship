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
    describe('Error cases in placeShip', () => {
        test('Place a single ship at coordinate [1,2] then place the ship on that same coord again', () => {
            makeBoard.placeShip(1, [1,2]);
            expect(() => makeBoard.placeShip(1, [1,2])).toThrow("Already a ship present");
        })

        test('Place ship of length 3 from coordinates [2,3] to [2,5], then place vertical ship of length 6 from [1,3] to [5,3]', () => {
            makeBoard.placeShip(3,[[2,3], [2,5]]);
            expect(() => makeBoard.placeShip(6, [[1,3], [5,3]])).toThrow("Already a ship present");
        })

        test('Place vertical ships from coordinates [1,1] to [3,1], then place horizontal ships from [2,1] to [4,1]', () => {
            makeBoard.placeShip(4, [[1,1], [3,1]]);
            expect(() => makeBoard.placeShip(3, [[2,1], [4,1]])).toThrow("Already a ship present");
        })
    })

    describe('recieveAttack function' , () => {
        test('Add a single ship of length 1 at coordinate [3,5] then attack it and check if ship sank', () => {
            makeBoard.placeShip(1, [3,5]);
            expect(makeBoard.recieveAttack([3,5])).toBe("All ships have sunk")
        })

        test('Place a ship of length 3 from coordinates [4,3] to [4,5], then attack from [4,3] to [4,5] to see if single ship has sunk', () => {
            makeBoard.placeShip(3, [[4,3], [4,5]]);
            makeBoard.recieveAttack([4,3]);
            makeBoard.recieveAttack([4,4]);
            expect(makeBoard.recieveAttack([4,5])).toBe("All ships have sunk");
        })

        test('Place a ship of length 3 from coordinates [4,3] to [4,5], then attack the same, then add another ship of length 1 at [5,5] to see if all ships have sunk', () => {
            makeBoard.placeShip(3, [[4,3], [4,5]]);
            makeBoard.placeShip(1, [5,5]);
            makeBoard.recieveAttack([4,3]);
            makeBoard.recieveAttack([4,4]);
            expect(makeBoard.recieveAttack([4,5])).toBe("Ship sunk");
        })

        test('Place a ship of length 3 from coordinates [4,3] to [4,5] and attack the same, then add another ship of length 1 at [5,5] and attack it, to see if all ships have sunk', () => {
            makeBoard.placeShip(3, [[4,3], [4,5]]);
            makeBoard.placeShip(1, [5,5]);
            makeBoard.recieveAttack([5,5]);
            makeBoard.recieveAttack([4,3]);
            makeBoard.recieveAttack([4,4]);
            expect(makeBoard.recieveAttack([4,5])).toBe("All ships have sunk");
        })

        test('Place a ship of length 1 at [3,4] and attack it, then check if it is marked by X in board', () => {
            makeBoard.placeShip(1, [3,4]);
            makeBoard.recieveAttack([3,4]);

            expect(makeBoard.showBoard()[3][4]).toBe('X');
        })

        test('Place a ship at [3,4], then attack coordinate [1,2] and check if it is marked by . in board', () => {
            makeBoard.placeShip(1, [3,4]);
            makeBoard.recieveAttack([1,2]);

            expect(makeBoard.showBoard()[1][2]).toBe('.');
        })

        test('Place a ship at [3,4], then attack coordinate [1,2] and check if it returns miss', () => {
            makeBoard.placeShip(1, [3,4]);
            expect(makeBoard.recieveAttack([1,2])).toBe("Miss");
        })
    })

    describe('Player class test', () => {
        beforeEach(() => {
            player1 = new script.Player("Shelby");
            player2 = new script.Player("Campbell");

            humanPlayer = new script.Player("Superman");
            computerPlayer = new script.Player("Optimus Prime", true);
        })

        test("Human player attacking opponent's board", () => {
            player1.gameboard.placeShip(1, [2,5]);
            expect(player2.attack(player1, [2,5])).toBe("All ships have sunk");
            expect(player1.gameboard.showBoard()[2][5]).toBe('X');
            
        })

        test('Computer player attacking randomly', () => {
            let coord = computerPlayer.randomAttack(humanPlayer);

            expect(Array.isArray(coord)).toBe(true);
            expect(coord.length).toBe(2);
        })

    })
})