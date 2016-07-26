describe("Board", function() {
    var board;

    beforeEach(function() {
        board = new Board();
    });

    it("x is the size of 15", function() {
        board.setSizeX(15);
        expect(board.x).toEqual(15);
    });

    it("y is the size of 15", function() {
        board.setSizeY(15);
        expect(board.y).toEqual(15);
    });

    it("setSize sets x and y values", function() {
        board.setSize(5,5);
        expect(board.x).toEqual(5);
        expect(board.y).toEqual(5);
    });

    it("getX(4) returns 4 in a 5x5", function() {
        board.setSize(5,5).create();
        expect(board.getPosX(4)).toEqual(4);
    });

    it("getY(4) returns 0 in a 5x5", function() {
        board.setSize(5,5).create();
        expect(board.getPosY(4)).toEqual(0);
    });

    it("tiles array length is 25", function() {
        board.setSize(5,5).create();
        expect(board.tiles.length).toEqual(25);
    });

    it("tiles created with init value of 0", function() {
        board.setSize(1,1).create();
        expect(board.tiles[0]).toEqual(0);
    });

    describe("Neighbours", function() {
        beforeEach(function() {
            board.setSize(3,3).create();
            board.tiles = [0,1,0,1,1,0,0,0,0];
        });

        it("0,0 has 3 neighbours", function() {
            expect(board.checkNeighbourCount(0)).toEqual(3);
        });

        it("0,1 has 2 neighbours", function() {
            expect(board.checkNeighbourCount(1)).toEqual(2);
        });

        it("3,3 has 1 neighbour", function() {
            expect(board.checkNeighbourCount(8)).toEqual(1);
        });
    });
    
});

var canvasMock = function() {};
canvasMock.prototype.getContext = function(str) {};

describe("Game", function() {
    var game;

    beforeEach(function() {
        game = new Game(new canvasMock());
    });

    it("x is the size of 15", function() {
        game.setX(15);
        expect(game.x).toEqual(15);
    });

    it("y is the size of 15", function() {
        game.setY(15);
        expect(game.y).toEqual(15);
    });

    it("initBoard creates a Board-object", function() {
        game.setX(1).setY(1).initBoard();
        expect(game.board).toEqual(jasmine.any(Board));
    });
});