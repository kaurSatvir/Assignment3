//first create array of images
var images = {};
images.array = ['ikOnkar', 'ikOnkar','kangha', 'kangha','kara', 'kara','khanda', 'khanda','kirpan', 'kirpan','dastar', 'dastar', 'goldenTemple', 'goldenTemple','kataar', 'kataar','soldier', 'soldier'];

var numberOfMoves;
var cardsmatched;
var faceValue;
var flipped;
var statusTab = $("#statusTab");
var moves = $("#moves");
var movesMade = $(".movesMade");
var resetButton = $(".gameReset");

var gameStart = $("#gameStart");
var startButton = $("#start");

var gameEnd = $("#gameEnd");
var board= $("#board");

$(function(){
	  Init();
});

//Let's initialize the game
function Init() {
    
    playGame = false;

    statusTab.hide();
    board.hide();
    gameEnd.hide();
    
    startButton.click(function(event) {
        event.preventDefault();
        StartPlaying();
    });

    resetButton.click(function(event) {
        event.preventDefault();
        RestartGame();
    });
};

//start game and create cards from deck array
function StartPlaying(){
    
    gameStart.hide();
    gameEnd.hide();    
    
    moves.show();
    statusTab.show();
    board.show();
    
    numberOfMoves = 0;
    cardsmatched = 0;
    
    movesMade.html(numberOfMoves);
    
    if (playGame == false) {
            
        playGame = true;
            images.array.sort(Shuffle);
            
            for(var i = 0; i < images.array.length - 1; i++){
                $(".card:first-child").clone().appendTo("#board");
            }

            board.children().each(function(index) {
                $(this).css({"left" : ($(this).width() + 20) * (index % 6),
                            "top" : ($(this).height() + 20) * Math.floor(index / 6)});
                
                faceValue = images.array.pop();
                $(this).find(".back").addClass(faceValue);
                $(this).attr("data-pattern",faceValue);
                $(this).click(SelectCard);
            });											 
    }			   
  };

function SelectCard() {
    
	if ($(".card-flipped").size() > 1) {
	   return;
	}
	
    flipped = $(this).addClass("card-flipped");
    movesMade.html(++numberOfMoves);
    
    if ($(".card-flipped").size() == 2) {
        setTimeout(CheckValue,700);
	}
};

function CheckValue() {
	if (MatchValue()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
			if(document.webkitTransitionEnd){
				$(".card-removed").bind("webkitTransitionEnd",	RemoveCards);
			}else{
				RemoveCards();
			}
		} else {
		$(".card-flipped").removeClass("card-flipped");
	}
};

function MatchValue() {
	var cards = $(".card-flipped");
	var card1 = $(cards[0]).data("pattern");
	var card2 = $(cards[1]).data("pattern");
	return (card1 == card2);
};

function RemoveCards(currentface) {
	if (cardsmatched < 8){
		cardsmatched++;
		$(".card-removed").remove();
	}else{
		$(".card-removed").remove();
		board.hide();
        statusTab.hide();
		gameEnd.show();
	}	
};

function RestartGame(){
    playGame = false;
    images.array = ['ikOnkar', 'ikOnkar','kangha', 'kangha','kara', 'kara','khanda', 'khanda','kirpan', 'kirpan','dastar', 'dastar', 'goldenTemple', 'goldenTemple','kataar', 'kataar','soldier', 'soldier'];		
    board.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
    StartPlaying();
};

function Shuffle() {
	return 0.5 - Math.random();
};