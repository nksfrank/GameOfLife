function Board() {
    var ALIVE = 1, DEAD = 0,
        neighbourMatrix = [{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}];

    this.checkNeighbourCount = function(index) {
        var x = this.getPosX(index);
        var y = this.getPosY(index);
        return neighbourMatrix.reduce((prev, curr) => this.isAliveAt(x+curr.x, y+curr.y) === ALIVE ? ++prev : prev, 0);
    };

    this.checkTile = function(curr, index) {
        var c = this.checkNeighbourCount(index);
        if(curr === DEAD && c === 3) {
            return ALIVE;
        }
        if(curr === ALIVE && (c == 2 || c == 3)) {
            return ALIVE;
        }
        return DEAD;
    };

    //Note: false is error
    this.isAliveAt = function(x, y) {
        return x >= 0 && y >= 0 && x < this.x && y < this.y && this.tiles[this.getIndex(x,y)];
    };

    this.getPosY = function(index) {
        return Math.trunc(index/this.x);
    };

    this.getPosX = function(index) {
        return Math.trunc(index%this.x);
    };

    this.getIndex = function(x,y) {
        return x + y * this.x;
    };
};

Board.prototype.setSizeY = function(y) {
    if(y <= 0) throw new Error("setSizeY: value to low");
    this.y = y;
    return this;
};

Board.prototype.setSizeX = function(x) {
    if(x <= 0) throw new Error("setSizeX: value to low");
    this.x = x;
    return this;
};
Board.prototype.setSize = function(x,y) {
    this.setSizeX(x).setSizeY(y);
    return this;
};

Board.prototype.getSizeX = function() {
    return this.x;
};

Board.prototype.getSizeY = function() {
    return this.y;
};

Board.prototype.create = function() {
    if(this.x === undefined) throw new Error("create: x is not set");
    if(this.y === undefined) throw new Error("create: y is not set");
    var size = this.x * this.y;
    this.tiles = new Array(size);
    for (var i = 0; i < size; i++) {
        this.tiles[i] = 0;
    }
    return this;
};

Board.prototype.seed = function(matrix) {
    if(this.x === undefined) throw new Error("seed: x is not set");
    if(this.y === undefined) throw new Error("seed: y is not set");
    this.tiles = matrix;
    return this;
}

Board.prototype.update = function() {
    if(this.tiles === undefined) throw new Error("update: board is not created");
    this.tiles = this.tiles.map(this.checkTile, this);
    return this;
};