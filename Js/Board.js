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
    setInterval(function(){self.redrawBoard(self)}, 1);
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
    this.selectedShip = this.myShips[0];
    this.myShips[0].selected = true;
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

Board.prototype.clickEvent = function(x,y){
    x = Math.floor(x/80);
    y = Math.floor(y/80);
    for(index in this.selectedSquares){
        this.selectedSquares[index].switchSelected();
    }
    this.selectedSquares = [];

    this.myBoard[y][x].switchSelected()
    this.selectedSquares.push(this.myBoard[y][x]);
    for(var count = 0; count < this.selectedShip.length; count++) {
        if(x + count < 10) {
            this.myBoard[y][x + count].switchSelected();
            this.selectedSquares.push(this.myBoard[y][x + count]);
        }
        if(y + count < 10) {
            this.myBoard[y + count][x].switchSelected();
            this.selectedSquares.push(this.myBoard[y + count][x]);
        }
    }
}