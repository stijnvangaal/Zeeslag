/**
 * Created by stijn on 27-5-2015.
 */
function Board(){
    var self = this;
    this.myBoard;

    this.myCanvas = document.querySelector('#gameBoard');
    this.myContext = this.myCanvas.getContext('2d');

	this.createMyBoard();
    this.ship = new Ship();
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

var board = new Board();