/**
 * Created by stijn on 27-5-2015.
 */
function Game(){
    var self = this;

    this.myCanvas = document.querySelector('#gameBoard');
    this.context = this.myCanvas.getContext('2d');
    this.board = new Board(this.context);

    this.myCanvas.addEventListener('click', function(event){
        // the canvas is displayed with an extra 10 px on x and y
        if(event.x <= 810 && event.y <= 810){
           console.log("on board")
            self.board.clickEvent(event.x-10, event.y-10);
        }
        console.log(event.x + " " + event.y);
    });
}



var game = new Game();