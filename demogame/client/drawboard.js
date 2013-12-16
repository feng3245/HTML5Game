drawGameBoard = function() {
 var ctx = getContext();

ctx.beginPath();

 ctx.moveTo(200,0);
 ctx.lineTo(200,600);

ctx.moveTo(400,0);
ctx.lineTo(400,600);

ctx.moveTo(0,200);
 ctx.lineTo(600,200);

 ctx.moveTo(0,400);
  ctx.lineTo(600,400);

 ctx.stroke();
 ctx.restore();
} 


