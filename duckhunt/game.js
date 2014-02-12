// Sarah Ruckhaus's game.js

function draw () {
    var canvas = document.getElementById('game');
    if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	ctx.fillStyle="#C96A1B";
	ctx.fillRect(0,500,800,100);
	var img = new Image();
	img.addEventListener("load",function() {
	    //Do drawImage stuff here?
	}, false);
	img.src = "/assets/duckhunt.png";
    }
}