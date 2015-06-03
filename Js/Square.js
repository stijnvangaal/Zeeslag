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

    //$('#Board').append("<div class='Square'></div>");
    //$('.Square').on('drop', function(evt){
    //    self.drop(evt);
    //});
    //$('.Square').on('dragover', function(evt){
    //    self.allowDrop(evt);
    //});
    //$('.Square').on('dragleave', function(evt){
    //    self.leaveSquare(evt);
    //});
}

Square.prototype.allowDrop = function(ev) {
    ev.preventDefault();
    ev.target.style.background = 'red';
}

Square.prototype.leaveSquare = function(ev) {
    ev.preventDefault();
    ev.target.style.background = 'white';
}

Square.prototype.drop = function(ev) {
    ev.preventDefault();
    var data = ev.originalEvent.dataTransfer.getData("text");
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
}