/**
 * Created by stijn on 27-5-2015.
 */
function Ship(length, context, shipNr, name, isVertical, startCell, hits){
    var self = this;
    this.name       = name;
    this.shipNumber = shipNr;
    this.length     = length;
    this.context    = context;
    this.squares    = null;
    this.selected   = false;
    this.isVertical = false;

    //animation variables
    this.xPos       = 0;
    this.yPos       = 0;
    this.animating  = false;
    this.targetX    = 0;
    this.targetY    = 0;
    this.speedX     = 0;
    this.speedY     = 0;
    this.rotation   = 0;

    this.height  = 36;
    this.width   = 180;
    this.between = 10;

    this.img_ship_front         = new Image();
    this.img_ship_middle        = new Image();
    this.img_ship_back          = new Image();
    this.img_ship_full          = new Image();

    if(name == "Submarine") {
        this.img_ship_front.src     = "Images/front-U.png";
        this.img_ship_middle.src    = "Images/middle-U.png";
        this.img_ship_back.src      = "Images/back-U.png";
    }
    else{
        this.img_ship_front.src     = "Images/front.png";
        this.img_ship_middle.src    = "Images/middle.png";
        this.img_ship_back.src      = "Images/back.png";
    }
    this.img_ship_full.src          = "Images/" + name + ".png";

    this.draw();
}


Ship.prototype.setPosition = function(squares){
    this.animating = true;
    if(this.squares == null){
        this.xPos = 810;
        this.yPos = this.shipNumber * (this.height + this.between);
    }
    else{
        this.xPos = this.squares[0].xPos * this.squares[0].size;
        this.yPos = this.squares[0].yPos * this.squares[0].size;
    }
    this.squares = squares;

    this.isVertical = this.checkVertical();

    this.targetX = this.squares[0].xPos * this.squares[0].size;
    this.targetY = this.squares[0].yPos * this.squares[0].size;

    this.speedX = (this.targetX - this.xPos)/100;
    this.speedY = (this.targetY - this.yPos)/100;

    //calculate the raduis for the image
    this.rotation = Math.atan2(this.yPos - this.targetY, this.xPos - this.targetX);
}

Ship.prototype.checkVertical = function(){
    if(this.squares[0].yPos == this.squares[1].yPos){
        return false;
    }
    else{
        return true;
    }
}

Ship.prototype.getPosition = function(){
    return this.squares;
}

Ship.prototype.switchSelected = function(){
    if(this.selected){this.selected = false;}
    else{this.selected = true;}
}

Ship.prototype.draw = function(){
    var self = this;
    //draw ship next to field
    if(self.squares == null){
        var minX    = 810;

        this.context.beginPath();
        this.context.lineWidth="1";
        if(this.selected){this.context.strokeStyle="red";}
        else{this.context.strokeStyle="black";}
        this.context.rect(minX, self.shipNumber * (self.height + self.between), self.width, self.height);
        this.context.stroke();

        this.context.drawImage(self.img_ship_full, minX, self.shipNumber * (self.height + self.between));
    }
    else {
        if(this.animating){

            if(this.targetX != null) {
                if (this.speedX < 0) {
                    if (this.targetX < this.xPos) {
                        this.xPos += this.speedX;
                    }
                }
                else {
                    if (this.targetX > this.xPos) {
                        this.xPos += this.speedX;
                    }
                }
            }
            if(this.targetY != null) {
                if (this.speedY < 0) {
                    if (this.targetY < this.yPos) {
                        this.yPos += this.speedY;
                    }
                }
                else {
                    if (this.targetY > this.yPos) {
                        this.yPos += this.speedY;
                    }
                }
            }

            this.context.save();
            //add a bit to the position because of the image size
            this.context.translate(this.xPos + (36 * (this.length * 0.5)), this.yPos + 18);
            this.context.rotate(this.rotation);
            this.context.drawImage(self.img_ship_full, 0, 0);
            this.context.restore();

            if(this.speedX < 0){
                if(this.targetX >= this.xPos){
                    this.targetX = null;
                }
            }
            else{
                if(this.targetX <= this.xPos){
                    this.targetX = null;
                }
            }

            if(this.speedY < 0){
                if(this.targetY >= this.yPos){
                    this.targetY = null;
                }
            }
            else{
                if(this.targetY <= this.yPos){
                    this.targetY = null;
                }
            }

            if(this.targetX == null && this.targetY == null){
                this.animating = false;
            }
        }
        else {
            //draw ship inside of field
            for (var count = 0; count < this.squares.length; count++) {
                if (count == 0) {
                    self.doDrawSides(count, self.img_ship_front);
                }
                else if (count == this.squares.length - 1) {
                    self.doDrawSides(count, self.img_ship_back);
                }
                else {
                    self.doDrawMiddle();
                }
            }
        }
    }
}

Ship.prototype.doDrawSides = function(index,image){
    var self = this;
    var size = self.squares[index].size;
    var xPos = self.squares[index].xPos;
    var yPos = self.squares[index].yPos
    if(self.squares[0].xPos != self.squares[1].xPos){
        self.context.save();
        self.context.translate(xPos * size + (size/2), yPos * size + (size/2));
        self.context.rotate(270 * Math.PI/180);
        self.context.drawImage(image, -(size/2) + 1, -(size/2) +1, size -2, size -2);
        self.context.restore();
    }
    else{
        self.context.drawImage(image, xPos * size +1, yPos * size +1, size -2, size -2);
    }
}

Ship.prototype.doDrawMiddle = function(){
    var self = this;
    image = self.img_ship_middle;
    for(var index = 1; index < self.squares.length -1; index++) {
        var size = self.squares[index].size;
        var xPos = self.squares[index].xPos;
        var yPos = self.squares[index].yPos
        if (self.squares[0].xPos != self.squares[1].xPos) {
            self.context.save();
            self.context.translate(xPos * size + (size / 2), yPos * size + (size / 2));
            self.context.rotate(270 * Math.PI / 180);
            self.context.drawImage(image, -(size / 2) + 1, -(size / 2) + 1, size - 2, size - 2);
            self.context.restore();
        }
        else {
            self.context.drawImage(image, xPos * size + 1, yPos * size + 1, size - 2, size - 2);
        }
    }

}