/**
 * Created by stijn on 27-5-2015.
 */
function Game(data){
    var self = this;
    this.id = data._id;

    this.myCanvas = document.createElement('canvas');
    this.myCanvas.id     = "gameBoard";
    this.myCanvas.width  = 1800;
    this.myCanvas.height = 800;
    this.container = document.querySelector('#canvasContainer');
    this.container.appendChild(this.myCanvas);
    this.context = this.myCanvas.getContext('2d');

    this.board = new Board(this.context, this.id, data.myGameboard, data.enemyGameboard, data.status, data.yourTurn, data.youWon);

    this.myCanvas.addEventListener('click', function(event){
        // the canvas is displayed with an extra 10 px on x and y
        //left is displayed between x = 0 - x = 810 y = 0 - y = 810
        if(event.x <= 810 && event.y <= 810){
            self.board.clickEventOnField(event.x-10, event.y-10);
        }
        //middle menu is displayed between x = 810 - x = 990 y = 10 y = 810
        if(event.x > 820 && event.x <= 1000 && event.y <= 810){
            self.board.clickEventOnMiddle(event.x-10, event.y-10);
        }
        //right field is displayed between x = 1000 - x = 1800 y = 10 y = 810
        if(event.x > 1010 && event.x <= 1810 && event.y <= 810){
            self.board.clickEventOnEnemy(event.x-10, event.y-10);
        }
    });

    this.myCanvas.addEventListener('mousemove', function(event){
        self.board.mouseMove(event.clientX, event.clientY);
    })
}

Game.prototype.destroy = function(){
    this.myCanvas.remove();
    this.board = null;
}