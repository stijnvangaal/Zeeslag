/**
 * Created by stijn on 10-6-2015.
 */
/**
 * Created by stijn on 27-5-2015.
 */
function EnemySquare(context, x, y)
{
    var self = this;
    this.context = context;
    this.img_water = new Image();
    this.img_water.src = "Images/Water_sprite.gif";
    this.selected = false;

    this.xPos = x;
    this.yPos = y;
    this.size = 80;
    this.left = 1000;

    this.shot;

    this.draw();
}

EnemySquare.prototype.draw = function()
{
    var self = this;
    this.context.beginPath();
    this.context.lineWidth="2";
    this.context.strokeStyle="black";
    this.context.rect((this.xPos * this.size) + this.left, this.yPos * this.size, this.size, this.size);
    this.context.stroke();

    self.context.drawImage(self.img_water,(self.xPos * self.size) + this.left + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
}