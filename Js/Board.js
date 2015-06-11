/**
 * Created by stijn on 27-5-2015.
 */
function Board(context, gameBoard, status, myTurn){
    var self = this;
    this.myBoard;
    this.enemyBoard;
    this.myShips            = [];
    this.context            = context;
    this.selectedShip       = null;
    this.selectedSquares    = [];

    this.mouseX             = 0;
    this.mouseY             = 0;

    this.status             = status;
    this.myTurn             = myTurn;

	this.createMyBoard();
    this.CreateShips(gameBoard);
    this.createEnemyBoard();

    this.allShipsPlaced     = this.checkAllShipsPlaced();

    requestAnimationFrame(function(){self.redrawBoard(self)});
}

Board.prototype.createMyBoard = function()
{

	this.myBoard = [];

	for(var y = 0; y < 10; y++)
	{
		this.myBoard[y] = [];
		for(var x = 0; x < 10; x++)
		{
			this.myBoard[y][x] = new Square(this.context, x, y);
		}
	}
}

Board.prototype.CreateShips = function(gameBoard){
    var ships = null;
    if(gameBoard == null){
        ships = getShips();
        for(index in ships){
            this.myShips.push(new Ship(ships[index].length, this.context, index, ships[index].name, null, null, null));
        }
    }
    else{
        ships = gameBoard.ships;
        for(index in ships){
            this.myShips.push(new Ship(ships[index].length, this.context, index, ships[index].name, ships[index].isVertical, ships[index].startCell, ships[index].hits));
        }
    }
}

Board.prototype.createEnemyBoard = function(){
    this.enemyBoard = [];

    for(var y = 0; y < 10; y++)
    {
        this.enemyBoard[y] = [];
        for(var x = 0; x < 10; x++)
        {
            this.enemyBoard[y][x] = new EnemySquare(this.context, x, y);
        }
    }
}

Board.prototype.redrawBoard = function(self){
    self.context.clearRect(0,0,1800,800);
    for(var y = 0; y < 10; y++)
    {
        for(var x = 0; x < 10; x++)
        {
            self.myBoard[y][x].draw();
        }
    }
    for(var index in this.myShips){
        this.myShips[index].draw();
    }
    for(var y = 0; y < 10; y++)
    {
        for(var x = 0; x < 10; x++)
        {
            self.enemyBoard[y][x].draw();
        }
    }
    this.drawMenu();
    requestAnimationFrame(function(){self.redrawBoard(self)});
}

Board.prototype.drawMenu = function(){
    if(this.mouseX >= 838 && this.mouseX <= 988 && this.mouseY >= 410 && this.mouseY <= 460){
        var rectX           = 828
        var rectY           = 403;
        var rectWidth       = 150;
        var rectHeight      = 60;
        var cornerRadius    = 15;
        var lineWidth       = 12;
    }
    else {
        var rectX           = 825;
        var rectY           = 400;
        var rectWidth       = 150;
        var rectHeight      = 60;
        var cornerRadius    = 15;
        var lineWidth       = 15;
    }

    this.context.strokeStyle="darkred";
    this.context.fillStyle = "red";

    this.context.lineJoin = "round";
    this.context.lineWidth = lineWidth;

    this.context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    this.context.fillRect(rectX+(cornerRadius/2)-2, rectY+(cornerRadius/2)-5, rectWidth-cornerRadius, rectHeight-cornerRadius);

    this.context.fillStyle = 'yellow';
    if(this.status == 'setup'){
        var message = "place Ships";
        if(!this.allShipsPlaced){
            this.context.fillStyle = 'black';
        }
    }

    this.context.font = '18pt Calibri';

    this.context.fillText(message, rectX+(rectWidth/10), rectY+(rectHeight/2));

}


Board.prototype.checkAllShipsPlaced = function(){
    for(var index in this.myShips){
        if(this.myShips[index].squares == null){
            return false;
        }
    }
    return true;
}

//click events

Board.prototype.clickEventOnField = function(x,y) {
    x = Math.floor(x / 80);
    y = Math.floor(y / 80);

    //deselect squares
    if(this.selectedSquares.length != 0) {
        for (index in this.selectedSquares) {
            this.selectedSquares[index].switchSelected();
        }
    }

    //check if there is a ship on the square
    //if so, select it
    if(this.myBoard[y][x].ship != null){
        this.selectedShip.switchSelected();
        this.selectedShip = this.myBoard[y][x].ship;
        this.selectedShip.switchSelected();
        this.selectedSquares = [];
    }
    else if ($.inArray(this.myBoard[y][x], this.selectedSquares) != -1) {
        //check if a ship is needed to be set
        if (x == this.selectedSquares[0].xPos && y == this.selectedSquares[0].yPos) {
            this.selectedSquares = [];
        }
        else {
            var shipSquares = [];
            if (x == this.selectedSquares[0].xPos) {
                //set ship vertical
                for (var index in this.selectedSquares) {
                    if (this.selectedSquares[index].xPos == x) {
                        shipSquares.push(this.selectedSquares[index])
                    }
                }
            }
            if (y == this.selectedSquares[0].yPos) {
                //set ship horizontal
                for (var index in this.selectedSquares) {
                    if (this.selectedSquares[index].yPos == y) {
                        shipSquares.push(this.selectedSquares[index])
                    }
                }
            }

            if(this.checkAvailable(shipSquares, this.selectedShip)) {
                oldPos = this.selectedShip.getPosition();
                for (var index in oldPos) {
                    oldPos[index].ship = null;
                }
                //place the ship
                this.selectedShip.setPosition(shipSquares);
                for (var index in shipSquares) {
                    shipSquares[index].ship = this.selectedShip;
                    this.allShipsPlaced = this.checkAllShipsPlaced();
                }
            }
        }
        this.selectedSquares = [];
    }
    else {
        //set new squares selection
        if(this.selectedShip != null) {
            this.selectedSquares = [];

            this.myBoard[y][x].switchSelected()
            this.selectedSquares.push(this.myBoard[y][x]);
            for (var count = 1; count < this.selectedShip.length; count++) {
                if (x + count < 10) {
                    this.myBoard[y][x + count].switchSelected();
                    this.selectedSquares.push(this.myBoard[y][x + count]);
                }
                if (y + count < 10) {
                    this.myBoard[y + count][x].switchSelected();
                    this.selectedSquares.push(this.myBoard[y + count][x]);
                }
            }
        }
    }
}

Board.prototype.clickEventOnMiddle = function(x, y){
    //button click
    if(x >= 838 && x <= 988 && y >= 410 && y <= 460){
        if(this.status == 'setup') {
            if(this.allShipsPlaced){
                this.doPlaceShips();
            }
        }
    }

    //click on a ship
    if(this.status == 'setup') {
        var height = this.myShips[0].height;
        var between = this.myShips[0].between;
        if (y <= this.myShips.length * (height + between)) {
            for (var count = 0; count < this.myShips.length; count++) {
                if (y <= height) {
                    if (this.selectedShip != null) {
                        this.selectedShip.switchSelected();
                    }
                    this.selectedShip = this.myShips[count];
                    this.selectedShip.switchSelected();
                    break;
                }
                else {
                    y -= height;
                    if (y <= between) {
                        break;
                    }
                    else {
                        y -= between;
                    }
                }
            }
        }
    }
}

Board.prototype.clickEventOnEnemy = function(x, y){

}

Board.prototype.mouseMove = function(x, y){
    this.mouseX = x;
    this.mouseY = y;
}

Board.prototype.checkAvailable = function(squares, ship){
    for(var index in squares){
        if(squares[index].ship != null){
            return false;
        }
    }

    if(squares.length == ship.length){
        return true;
    }

    return false;
}


Board.prototype.doPlaceShips = function(){
    //get the normal ships as json object and fill it in with the needed variables
    var ships = getShips();
    for(var index in this.myShips){
        ships[index].startCell = {'x': String.fromCharCode(97 + this.myShips[index].squares[0].xPos), 'y': this.myShips[index].squares[0].yPos};
        ships[index].isVertical = this.myShips[index].isVertical;
    }

}