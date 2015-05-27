/**
 * Created by stijn on 27-5-2015.
 */
function Square()
{
    var self = this;
	this.ship;
	this.shot;

	this.draw();
}

Square.prototype.draw = function()
{
	$('#Board').append("<div id='Square'></div>");
}