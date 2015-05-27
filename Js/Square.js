/**
 * Created by stijn on 27-5-2015.
 */
function Square(){
    var self = this;
    var test = [4];
    test[0] = [4];
}

Square.prototype.allowDrop = function(){
    ev.preventDefault();
    ev.target.style.background = "blue";
}

Square.prototype.denyDrop = function(ev){
    ev.preventDefault();
    ev.target.style.background = "red";
}

Square.prototype.drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

Square.prototype.Drop = function(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}