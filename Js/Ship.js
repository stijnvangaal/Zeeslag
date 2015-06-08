/**
 * Created by stijn on 27-5-2015.
 */
function Ship(length, context, shipNr, fullImage){
    var self = this;
    this.shipNumber = shipNr;
    this.length = length;
    this.context = context;
    this.squares = null;
    this.selected = false;

    this.height  = 36;
    this.width   = 180;
    this.between = 10;

    this.img_ship_front         = new Image();
    this.img_ship_middle        = new Image();
    this.img_ship_back          = new Image();
    this.img_ship_full          = new Image();
    this.img_ship_front.src     = "Images/front.png";
    this.img_ship_middle.src    = "Images/middle.png";
    this.img_ship_back.src      = "Images/back.png";
    this.img_ship_full.src      = fullImage;

    this.draw();
}


Ship.prototype.setPosition = function(squares){

    this.squares = squares;
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

        self.context.drawImage(self.img_ship_full, minX, self.shipNumber * (self.height + self.between));
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