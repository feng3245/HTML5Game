
window.onload = function(){
var gamestate = new GameState();
drawGameBoard();
$('#test').click(function(event){
	
	if(!gamestate.haveWon())
	{
	var coords = getMousePos($(this)[0], event); 
	var xtranslation = getXTranslation(coords.x);
	var ytranslation = getYTranslation(coords.y);
	gamestate.drawSprite(xtranslation,ytranslation);
	if(gamestate.haveWon())
		alert(gamestate.lastDrawn+" Have won");
	}
});
};

