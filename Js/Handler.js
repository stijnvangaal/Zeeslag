/**
 * Created by stijn on 9-6-2015.
 */

var basicUrl    = "https://zeeslagavans.herokuapp.com/";
var stijnToken  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InNqamdhYWxAYXZhbnMubmwi.Qz_MVnCCp6roturoGC_wQzIPZHS2jjAlvWes35Dinfw";
var marToken    = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1hcnRoaWpuLnZlcmhvZXZlbkBnbWFpbC5jb20i.Ma7j4qX6YgGQEvZcuy-L-FJW_G4ilMlVDaQrfjwMq0I";
var token       = "?token=" + stijnToken;
var game        = null;
var ships       = null;
var opening     = false;
//token marthijn eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1hcnRoaWpuLnZlcmhvZXZlbkBnbWFpbC5jb20i.Ma7j4qX6YgGQEvZcuy-L-FJW_G4ilMlVDaQrfjwMq0I

var homeMenu    = document.querySelector('#menuContainer');
var gameMenu    = document.createElement('div');

gameMenu.id     = 'GameMenuContainer';
gameMenu.innerHTML  = "<div class='MenuButton DeleteButton' onclick='deleteGame()'><p>Back to Menu</p></div>";

var options = {query: "token=" +  stijnToken};

var socket = io.connect(basicUrl, options);

socket.on('update', function(gameId){
    if(game == null){
        getGames();
    }
    else{
        if(game.id == gameId) {
            updateGame(gameId);
        }
    }

});


function openGame(id){
    if(!opening) {
        opening = true;
        $.get(basicUrl + 'games/' + id + token, function (data) {
            toggleMenu(true);
            game = new Game(data);
            opening = false;
        });
    }
}

function updateGame(id){
    $.get(basicUrl + 'games/' + id + token, function(data){
        if(game != null) {
            game.board.update(data);
        }
    });
}

function deleteGame(){
    if(game != null) {
        clearTimeout(game.board.interval);
        game.destroy();
    }
    game = null;
    toggleMenu(false);
}

function requestGamePlayer(){
    $.get(basicUrl + 'games' + token, function(data){
        getGames();
    });
}

function requestGameAI(){
    $.get(basicUrl + 'games/AI' + token, function(data){
        getGames();
    });
}

function prepareShips(){
    $.get(basicUrl + 'ships' + token, function(data){
        ships = data;
    });
}

function getShips(){
    return ships;
}

function sentGameBoard(ships, id){
    $.post(basicUrl + 'games/' + id + '/gameboards' + token, ships, function(result){
        if(game != null) {
            game.board.getShipsPlaced(result);
        }
    });
}

function sentOwnShot(shot, id){
    $.post(basicUrl + 'games/' + id + '/shots' + token, shot, function(result){
        if(game != null) {
            game.board.getOwnShot(result);
        }
    });
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