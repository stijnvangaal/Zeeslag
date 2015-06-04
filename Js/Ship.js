/**
 * Created by stijn on 27-5-2015.
 */
function Ship(length, context){
    var self = this;
    this.length = length;
    this.context = context;
    this.squares = [];

    this.img_ship_front         = new Image();
    this.img_ship_middle        = new Image();
    this.img_ship_back          = new Image();
    this.img_ship_front.src     = "Images/front.png";
    this.img_ship_middle.src    = "Images/middle.png";
    this.img_ship_back.src      = "Images/back.png";

    this.drawSelf();

}


Ship.prototype.setPosition = function(squares){

    this.squares = squares;
}

Ship.prototype.drawSelf = function(){
    debugger;
    var self = this;
    for(var index = 0; index < this.squares.length; index++){
        switch (index){
            case 0:
                self.img_ship_front.onload = function(){
                    self.context.drawImage(self.img_ship_front, self.squares[index].xPos * self.squares[index].size + 1, self.squares[index].yPos * self.squares[index].size + 1, self.squares[index].size - 2, self.squares[index].size - 2)
                }

                break;
        }
    }
}