/**
 * Created by stijn on 27-5-2015.
 */
function Square()
{
	this.ship;
	this.shot;

	this.draw();
}

Square.prototype.draw = function()
{
	$('#Board').append("<div id='Square'></div>");
}