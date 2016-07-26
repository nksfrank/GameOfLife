function Game(canvas) {
    this.fps = 1000 / 20;
    this.ctx = canvas.getContext('2d');
    this.tick = 0;
};

Game.prototype.setX = function(x) {
    if(x < 1) throw new Error("setX: value less than 1");
    this.x = x;
    this.board = undefined;
    return this;
};

Game.prototype.setY = function(y) {
    if(y < 1) throw new Error("setY: value less than 1");
    this.y = y;
    this.board = undefined;
    return this;
};

Game.prototype.initBoard = function() {
    if(this.y === undefined && this.x === undefined) throw new Error("initBoard: board is not created");
    if(this.board === undefined) {
        this.board = new Board().setSize(this.x, this.y);
    }
    return this;
};

Game.prototype.seedBoard = function(matrix) {
    if(this.board === undefined && this.x !== undefined && this.y !== undefined) {
        this.initBoard();
    }
    this.board.seed(matrix);
    this.render();
    return this;
}

Game.prototype.resetBoard = function() {
    this.board = new Board().setSize(this.x, this.y).create();
    this.render();
}

Game.prototype.update = function() {
    this.board.update();
    this.tick++;
};

Game.prototype.render = function() {
    this.ctx.clearRect(0,0, 1280, 720);
    this.board.tiles.forEach(function(status, index) {
        var x = this.board.getPosX(index),
            y = this.board.getPosY(index);
        this.ctx.fillStyle = status === 1 ? "#fff" : "#000";
        this.ctx.fillRect(x * 10, y * 10, 10, 10);
    }, this);
};

Game.prototype.run = function() {
    this.update();
    this.render();
};

Game.prototype.start = function() {
    if(this.running === true) return;
    this.initBoard();
    this._loop = setInterval(this.run.bind(this), this.fps);
    this.running = true;
    return this;
};

Game.prototype.stop = function() {
    clearInterval(this._loop);
    this.running = false;
    this.tick = 0;
    return this;
};

Game.prototype.clear = function() {
    this.stop().resetBoard();
};