var gameDiv = $("#memoryGame");
var startPage = $("#startPage");
var endpage = $("#endPage");
var cardsDiv = $("#cards");
var play = $("#play");
var timeTaken = $("#timeTaken");
var time;
var matchedCards;

$(function(){
	  init();
});

function init() {
    endpage.hide();
    cardsDiv.hide();
    playGame = false;
    
    play.click(function(event){
               event.preventDefault();
                startPage.hide();
                startPlaying();
               });
    
}

function startPlaying(){
    cardsDiv.show();
    time = 0;
    matchedCards = 0;
    if(playGame == false){
        playGame = true;
        
    }
}