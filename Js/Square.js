/**
 * Created by stijn on 27-5-2015.
 */
function Square(context, x, y)
{
    var self = this;
    this.context = context;
    this.img_water = new Image();
    this.img_splash     = new Image();
    this.img_boom       = new Image();
    this.img_water.src = "Images/Water_sprite.gif";
    this.img_splash.src = "Images/WaterBurst_sprite.gif";
    this.img_boom.src   = "Images/explosion_sprite.gif";
    this.selected = false;

    //animation variables
    this.animating      = null;
    this.animateCycle   = 0;
    this.animateIndexX  = 0;
    this.animateIndexY  = 0;
    this.boomSize       = 75;
    this.splashSize     = 100;

    this.xPos = x;
    this.yPos = y;
    this.size = 80;

	this.ship;
	this.shot = false;

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
    this.context.lineWidth="2";
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

        if(this.shot == 'BOOM'){
            self.context.fillStyle = "red";
            self.context.fillRect(self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
            self.context.globalAlpha = 0.5;
            self.context.drawImage(self.img_water, self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
            self.context.globalAlpha = 1;
        }
        else if(this.shot == 'SPLASH'){
            self.context.fillStyle = "yellow";
            self.context.fillRect(self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
            self.context.globalAlpha = 0.5;
            self.context.drawImage(self.img_water, self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
            self.context.globalAlpha = 1;
        }
        else {
            self.context.drawImage(self.img_water, self.xPos * self.size + 1, self.yPos * self.size + 1, self.size - 2, self.size - 2);
        }
    }

    if(this.animating != null){
        this.doAnimate();
    }

    if(this.ship != null && this.ship.selected){
        this.context.beginPath();
        this.context.lineWidth="2";
        this.context.strokeStyle="red";
        this.context.rect((this.xPos * this.size) + 2, (this.yPos * this.size) + 2, this.size - 4, this.size - 4);
        this.context.stroke();
    }
}

Square.prototype.getShot = function(shot){
    if(shot == 'SPLASH'){
        if(this.shot != "SPLASH") {
            this.animating = this.img_splash;
            var audioList = document.getElementsByClassName("sound_splash");
            var audio = audioList[Math.floor((Math.random() * audioList.length))];
            audio.play();
        }
    }
    else if(shot == 'BOOM'){
        if(this.shot != "BOOM") {
            this.animating = this.img_boom;
            var audioList = document.getElementsByClassName("sound_explosion");
            var audio = audioList[Math.floor((Math.random() * audioList.length))];
            audio.play();
        }
    }
    this.shot = shot;
}

Square.prototype.doAnimate = function(){
    var size        = 0;
    var duration    = 5;
    var frames      = 0;
    var posX        = this.xPos * this.size + 1;
    var posY        = this.yPos * this.size + 1
    var width       = this.size - 2;
    this.animateCycle++;

    if(this.animating == this.img_boom){
        size    = this.boomSize;
        frames  = 7;
        posX    -= 40;
        posY    -= 40;
        width   += 80;
    }
    else if(this.animating == this.img_splash){
        size    = this.splashSize;
        frames  = 5;
    }

    var beginX = this.animateIndexX * size;
    var beginY = this.animateIndexY * size;

    this.context.drawImage(this.animating, beginX, beginY, size, size, posX, posY, width, width);

    if(this.animateCycle % duration == 0){
        this.animateIndexX++;
        if(this.animating == this.img_boom && this.animateIndexX == 3){
            this.animateIndexX = 0;
            this.animateIndexY++;
        }
    }

    if(this.animateCycle >= frames * duration){
        this.animating = null;
        this.animateIndexX = 0;
        this.animateIndexY = 0;
    }
}
