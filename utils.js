/* -- utils.js  --  
----- this file contains utility functions --- */

var utils = {};

//This function checks if the user's browser can use 'requestAnimationFrame' for rendering
//the next frame and if not, runs through the common browser alternatives, finally settling
//on the original JavaScript timer to draw the frame if none can be found
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame || 
									window.mozRequestAnimationFrame ||
									window.oRequestAnimationFrame ||
									window.msRequestAnimationFrame ||
									function (callback) {
										return window.setTimeout(callback, 1000/60);
									});
}

/* This function gets the mouse position on the screen and then calculates its position on the
	canvas by subtracting it from the top left corner of the canvas to give us the x, y coordinates
	of the mouse on the canvas where the top left of the canvas is (0,0)  				*/
utils.captureMouse = function (element) {
	var mouse = {x: 0, y: 0};
	
	element.addEventListener('mousemove', function (event) {
		var x, y;
		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + 
				document.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;
	
		mouse.x = x;
		mouse.y = y;
	}, false);

return mouse;
};

// returns a random float between min and max
utils.getRandomFloat = function(min, max) {
	return Math.random() * (max - min) + min;
};

// returns a random integer between min and max (inclusive)
utils.getRandomInt = function(min, max) {
	return Math.floor( Math.random() * (max - min + 1) ) + min;
};

utils.getDirection = function(x1, y1, x2, y2)
{
	var dx = x2 - x1;
	var dy = y2 - y1;
	
	var magnitude = Math.sqrt(dx * dx + dy * dy);
	
	return {
		x : dx / magnitude,
		y : dy / magnitude,
	}
}
								