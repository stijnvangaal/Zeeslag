/**
 * Created by stijn on 27-5-2015.
 */
function Board(){
	this.createMyBoard();
	this.myBoard;
}

Board.prototype.createMyBoard = function()
{
	this.myBoard = [];

	for(var y = 0; y < 10; y++)
	{
		this.myBoard[y] = [];
		for(var x = 0; x < 10; x++)
		{
			this.myBoard[y][x] = new Square();
		}
	}	
}

var board = new Board();