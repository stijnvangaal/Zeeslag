/**
 * Created by stijn on 27-5-2015.
 */
function Ship(){
    var self = this;
    this.draw();
    $('#Ship').on('dragstart', function(evt){
        self.drag(evt);
    });
}

Ship.prototype.draw = function(){
    $('#Game').append("<div id='Ship' draggable='true'>boooootje</div>");
};

Ship.prototype.drag = function(ev) {
    ev.originalEvent.dataTransfer.setData("text", ev.target.id);
};