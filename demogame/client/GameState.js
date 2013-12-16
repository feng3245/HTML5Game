isDiagonal = function(coord)
{
	var winCount = 3;
	var blocksOnBoard = 3;
	var boardPixels = 200;
	var bound = (winCount-1) * boardPixels;
	var boardsize = (blocksOnBoard-1) * boardPixels;
	var difference = Math.abs(coord.x - coord.y);
	var temp = getleftMostCoordinates(coord);
	var tempInverse = getrightMostCoordinates(coord);
	

	if(difference == 0 || difference == bound)
		return true;
	
		if((temp.x+bound)<=boardsize)
			return true;
	
		if(tempInverse.x<=boardsize&&tempInverse.x>=bound)
			return true;
	return false;

}
getleftMostCoordinates = function(coord)
{
	//because size of board is 3 we can check if there is one on each side
	if(coord.x>coord.y)
	{
		difference = coord.x - coord.y;
		return {x: difference, y: 0 };
		
	}
	else
	{
		difference = coord.y - coord.x;
		return {x: difference, y: 0 };
		
	}

}
getrightMostCoordinates = function(coord)
{
	if(coord.x>coord.y)
	{
		difference = coord.x - coord.y;
		
		return tempInverse = {x: coord.x + coord.y, y:  0};
	}
	else
	{
		difference = coord.y - coord.x;
		
		return tempInverse = {x: coord.x + coord.y, y:  0};	
	}
}
GameState = function(){
this.drawnCords = new Array();	
this.drawSpriteFunct = drawXSprite;
this.lastDrawn = '';
this.drawSprite= function(xtranslation,ytranslation)
{	
	if(!this.haveDrawn(xtranslation,ytranslation))
	{
		this.drawSpriteFunct(xtranslation,ytranslation);
		if(this.drawSpriteFunct == drawXSprite)
		{
			this.trackSprite(xtranslation, ytranslation, 'x');
			this.drawSpriteFunct = drawOSprite;
			
		}
		else
		{
			this.trackSprite(xtranslation, ytranslation, 'y');
			this.drawSpriteFunct = drawXSprite;

		}	
	}
}
this.haveWon = function()
{
	if(this.drawnCords.length==0)
		return false;
	return this.haveDiagnalWin() || this.haveVerticalWin() || this.haveHorizontalWin();
}
this.haveDiagnalWin = function()
{
	var winCount = 3;
	var blocksOnBoard = 3;
	var boardPixels = 200;
	var bound = (winCount-1) * boardPixels;
	var boardsize = (blocksOnBoard-1) * boardPixels;
	var lastdrawncord = this.drawnCords[this.drawnCords.length-1];
	if(isDiagonal(lastdrawncord))
	{
		var leftmostcoord = getleftMostCoordinates(lastdrawncord);
		var x = leftmostcoord.x;
		var y = leftmostcoord.y;
		var diagonals = 0;
		if(leftmostcoord!=null)
		{


		}
		var nextCoordinate = leftmostcoord;
		while(x<=boardsize&&y<=boardsize)
		{
		nextCoordinate = jQuery.grep(this.drawnCords, function(element, index){return element.x == (x)&& element.y == (y);})[0];
		if(nextCoordinate!=null&&nextCoordinate!=undefined)
		{
			if(nextCoordinate.type == this.lastDrawn)
			diagonals++;
			else
			{
			diagonals = 0;
			}
		}
		else
		{
			diagonals = 0;
		}		
		if(diagonals==winCount)
		{
			return true;
		}
		x+=200;
		y+=200;
		}
		var rightmostcoord = getleftMostCoordinates(lastdrawncord);
		x = rightmostcoord.x;
		y = rightmostcoord.y;
		diagonals = 0;
		nextCoordinate = rightmostcoord;
		while(x<=boardsize&&y<=boardsize)
		{
		nextCoordinate = jQuery.grep(this.drawnCords, function(element, index){return element.x == (x)&& element.y == (y);})[0];
		if(nextCoordinate!=null&&nextCoordinate!=undefined)
		{
			if(nextCoordinate.type == this.lastDrawn)
			diagonals++;
			else
			{
			diagonals = 0;
			}
		}
		else
		{
			diagonals = 0;
		}
		if(diagonals==winCount)
		{
			return true;
		}
		x+=200;
		y+=200;
		}
	}
	return false;
}

this.haveVerticalWin = function()
{
	var winCount = 3;
	var blocksOnBoard = 3;
	var boardPixels = 200;
	var bound = (winCount-1) * boardPixels;
	var boardsize = (blocksOnBoard-1) * boardPixels;
	var verticalWin = 0;
	var lastdrawncord = this.drawnCords[this.drawnCords.length-1];
	
	var y = 0;
	while(y<=boardsize)
	{
		var nextCoordinate = jQuery.grep(this.drawnCords, function(element, index){return element.x == lastdrawncord.x && element.y == y;})[0];
		if(nextCoordinate!=null&&nextCoordinate!=undefined)
		{
			if(nextCoordinate.type == this.lastDrawn)
			{
				verticalWin++;
			}
			else
			{
				verticalWin =0;
			}
		}
		else
		{
			horizontalWin = 0;
		}
		if(verticalWin==winCount)
			return true;
		y+=200;

	}

	return false;
}
this.haveHorizontalWin = function()
{
	var winCount = 3;
	var blocksOnBoard = 3;
	var boardPixels = 200;
	var bound = (winCount-1) * boardPixels;
	var boardsize = (blocksOnBoard-1) * boardPixels;
	var horizontalWin = 0;
	var lastdrawncord = this.drawnCords[this.drawnCords.length-1];
	
	var x = 0;
	while(x<=boardsize)
	{
		var nextCoordinate = jQuery.grep(this.drawnCords, function(element, index){return element.x == x && element.y == lastdrawncord.y;})[0];
		if(nextCoordinate!=null&&nextCoordinate!=undefined)
		{
			if(nextCoordinate.type == this.lastDrawn)
			{
				horizontalWin++;
			}
			else
			{
				horizontalWin =0;
			}
		}
		else
		{
			horizontalWin = 0;
		}
		if(horizontalWin==winCount)
			return true;
		x+=200;

	}

	return false;
}
this.trackSprite = function(x,y,type)
{
	this.drawnCords.push({x: x, y: y, type: type});
	this.lastDrawn = type;
}
this.haveDrawn = function(x,y)
{

	return this.drawnCords.some(function(element,index,array){return element.x == x&&element.y == y;});
}	
}
