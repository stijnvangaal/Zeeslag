/**
 * Created by stijn on 27-5-2015.
 */
function Square(context, x, y)
{
    var self = this;
    this.context = context;
    this.img_water = new Image();
    this.img_water.src = "Images/Water_sprite.gif";
    this.selected = false;

    this.xPos = x;
    this.yPos = y;
    this.size = 80;

	this.ship;
	this.shot;

	this.draw();
}

Square.prototype.switchSelected = function(){
    if(this.selected){this.selected = false;}
    else{this.selected = true;}
}

Square.prototype.draw = function()
{
    var self = this;
    this.context.beginPath();
    this.context.lineWidth="1";
    this.context.strokeStyle="black";
    this.context.rect(this.xPos * this.size, this.yPos * this.size, this.size, this.size);
    this.context.stroke();


        if(self.selected){
            self.context.fillStyle = "red";
            self.context.fillRect(self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
            self.context.globalAlpha = 0.5;
            self.context.drawImage(self.img_water, self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
            self.context.globalAlpha = 1;
        }
        else {
            self.context.drawImage(self.img_water, self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
        }

}
