drawOSprite = function(x, y) {
var ctx = getContext();
 // Save the canvas state and translate
ctx.save();
ctx.translate(x,y);

ctx.lineWidth = 2;
ctx.beginPath();

 ctx.arc(100,100, 90, 0, 2*Math.PI);
ctx.stroke();

 // Restore canvas state
 ctx.restore();
}
drawXSprite = function(x,y)
{
	var ctx = getContext();
	ctx.save();
	ctx.translate(x,y);

	ctx.lineWidth = 2;
	ctx.beginPath();

	ctx.moveTo(10,10);
	ctx.lineTo(190,190);
	ctx.moveTo(190,10);
	ctx.lineTo(10,190);
	ctx.stroke();
ctx.restore();
}
