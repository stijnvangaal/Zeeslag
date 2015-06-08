/**
 * Created by stijn on 27-5-2015.
 */
function Board(context){
    var self = this;
    this.myBoard;
    this.myShips            = [];
    this.context            = context;
    this.selectedShip       = null;
    this.selectedSquares    = [];

	this.createMyBoard();
    this.CreateShips();
    setInterval(function(){self.redrawBoard(self)}, 100);
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

Board.prototype.CreateShips = function(){
    //Ships created and stored from big to small
    //1 * vliegdekschip
    this.myShips.push(new Ship(5,this.context,0, "Images/vliegdekschip.png"));
    //2 * slagschip
    this.myShips.push(new Ship(4,this.context,1, "Images/slagschip.png"));
    this.myShips.push(new Ship(4,this.context,2, "Images/slagschip.png"));
    //3 * onderzeeer
    this.myShips.push(new Ship(3,this.context,3, "Images/onderzeer.png"));
    this.myShips.push(new Ship(3,this.context,4, "Images/onderzeer.png"));
    this.myShips.push(new Ship(3,this.context,5, "Images/onderzeer.png"));
    //3 * torpedobootjager
    this.myShips.push(new Ship(3,this.context,6, "Images/torpedobootjager.png"));
    this.myShips.push(new Ship(3,this.context,7, "Images/torpedobootjager.png"));
    this.myShips.push(new Ship(3,this.context,8, "Images/torpedobootjager.png"));
    //4 * patrouilleschip
    this.myShips.push(new Ship(2,this.context,9, "Images/patrouilleschip.png"));
    this.myShips.push(new Ship(2,this.context,10, "Images/patrouilleschip.png"));
    this.myShips.push(new Ship(2,this.context,11, "Images/patrouilleschip.png"));
    this.myShips.push(new Ship(2,this.context,12, "Images/patrouilleschip.png"));
}

Board.prototype.redrawBoard = function(self){
    self.context.clearRect(0,0,1600,800);
    for(var y = 0; y < 10; y++)
    {
        for(var x = 0; x < 10; x++)
        {
            self.myBoard[y][x].draw();
        }
    }
    for(index in this.myShips){
        this.myShips[index].draw();
    }
}

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
                }
            }
        }
        this.selectedSquares = [];
    }
    else {
        //set new squares selection
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

Board.prototype.clickEventOnMiddle = function(x, y){
    var height  = this.myShips[0].height;
    var between = this.myShips[0].between;
    if(y <= this.myShips.length * (height + between)) {
        for (var count = 0; count < this.myShips.length; count++) {
            if (y <= height) {
                if(this.selectedShip != null) {
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
