/**
 * Created by stijn on 9-6-2015.
 */

var basicUrl    = "https://zeeslagavans.herokuapp.com/";
var token       = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InNqamdhYWxAYXZhbnMubmwi.Qz_MVnCCp6roturoGC_wQzIPZHS2jjAlvWes35Dinfw";
var game        = null;
var ships       = null;
//token marthijn eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1tYW1odmVyQGF2YW5zLm5sIg.mJdVEDMIIBweop80Bo6yJT1b0MJiz8wYe-2MKq6vXuU

var homeMenu    = document.querySelector('#menuContainer');
var gameMenu    = document.createElement('div');

gameMenu.id     = 'GameMenuContainer';
gameMenu.innerHTML  = "<div class='MenuButton' onclick='deleteGame()'><p>Back to Menu</p></div>";

$.get(basicUrl + 'ships' + token, function(data) {

    //console.log(data);
});

function openGame(id){
    $.get(basicUrl + 'games/' + id + token, function(data){
        console.log(data);
        if(data.myGameboard == null){
            game = new Game(data);
        }
    });
    toggleMenu(true);
}

function deleteGame(){
    game.destroy();
    game = null;
    toggleMenu(false);
}

function requestGamePlayer(){

}

function requestGameAI(){
    $.get(basicUrl + 'games/AI' + token, function(data){
        console.log(data);
    });
    getGames();
}

function prepareShips(){
    $.get(basicUrl + 'ships' + token, function(data){
        ships = data;
    });
}

function getShips(){
    return ships;
}

function getGames(){
    var gameList = document.querySelector('#myGames');
    gameList.innerHTML = '';
    $.get(basicUrl + 'users/me/games' + token, function(data){
       for(index in data){
           gameList.innerHTML += "<div class='gameDiv'><h1>" + data[index].enemyName + "<br/>"+ data[index].status +"</h1>"
                                +"<div class='openButton' onclick='openGame("+ data[index]._id +")'><p>Play</p></div></div>";
       }
    });
}

function toggleMenu(toGame){
    if(toGame) {
        var container = document.querySelector('#GameContent');
        container.appendChild(gameMenu);
        homeMenu.remove();
    }
    else{
        var container = document.querySelector('#GameContent');
        container.appendChild(homeMenu);
        gameMenu.remove();
        getGames();
    }
}


//initiate the search for open games
prepareShips();
getGames();