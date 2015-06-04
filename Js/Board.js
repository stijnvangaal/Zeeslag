/**
 * Created by stijn on 27-5-2015.
 */
function Board(){
    var self = this;
    this.myBoard;
    this.myShips = [];

    this.myCanvas = document.querySelector('#gameBoard');
    this.myContext = this.myCanvas.getContext('2d');

	this.createMyBoard();
    this.CreateShips();
}

Board.prototype.createMyBoard = function()
{

	this.myBoard = [];

	for(var y = 0; y < 10; y++)
	{
		this.myBoard[y] = [];
		for(var x = 0; x < 10; x++)
		{
			this.myBoard[y][x] = new Square(this.myContext, x, y);
		}
	}
}

Board.prototype.CreateShips = function(){
    this.myShips.push(new Ship(3, this.myContext));
    this.myShips[0].setPosition(
        [this.myBoard[1][2],
         this.myBoard[1][3],
         this.myBoard[1][4]
        ]
    );
    this.myShips[0].drawSelf();

}

Board.prototype.redrawBoard = function(){
    for(var y = 0; y < 10; y++)
    {
        for(var x = 0; x < 10; x++)
        {
            this.myBoard[y][x].redraw();
        }
    }
}

var board = new Board();