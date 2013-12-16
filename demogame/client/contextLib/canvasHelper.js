 getMousePos = function(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      getXTranslation = function(x)
      {
      	
      	return Math.floor((x/200))*200;
      }
      getYTranslation = function(y)
      {

      	return Math.floor((y/200))*200;
      }