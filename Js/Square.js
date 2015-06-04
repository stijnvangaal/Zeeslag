/**
 * Created by stijn on 27-5-2015.
 */
function Square(context, x, y)
{
    var self = this;
    this.context = context;
    this.img_water = new Image();
    this.img_water.src = "Images/Water_sprite.gif";

    this.xPos = x;
    this.yPos = y;
    this.size = 80;

	this.ship;
	this.shot;

	this.draw(self);
}

Square.prototype.draw = function(self)
{
    this.context.beginPath();
    this.context.lineWidth="1";
    this.context.strokeStyle="black";
    this.context.rect(this.xPos * this.size, this.yPos * this.size, this.size, this.size);
    this.context.stroke();

    this.img_water.onload = function(){
        self.context.drawImage(self.img_water, self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
    };
}
