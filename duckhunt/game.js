// Sarah Ruckhaus's game.js

function draw () {
    var canvas = document.getElementById('game');
    if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	ctx.fillStyle="#C96A1B";
	ctx.fillRect(0,500,800,100);
	var img = new Image();
	img.addEventListener("load",function() {
	    ctx.drawImage(img,0,270,90,130,30,210,225,325); // tree
	    ctx.drawImage(img,0,700,900,200,0,400,800,200); // dirt road and bushes
	    ctx.drawImage(img,0,0,60,50,10,450,150,125); // dog
	    /*ctx.drawImage(); // bird1
	    ctx.drawImage(); // bird2
	    ctx.drawImage(); // bird3
	    ctx.drawImage(); // bird4
	    ctx.drawImage(); // bird5*/
	}, false);
	img.src = "assets/duckhunt.png";
    }
}