// Sarah Ruckhaus's game.js

function draw () {
    var canvas = document.getElementById('game');
    if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.addEventListener("load",function() {
	    ctx.drawImage(img,0,270,90,130,30,210,225,325); // tree
	    ctx.drawImage(img,0,700,900,200,0,410,800,200); // dirt road and bushes
	    ctx.drawImage(img,0,0,60,50,10,465,150,125); // dog
	    ctx.drawImage(img,75,115,40,40,200,150,75,75); // bird1
	    ctx.drawImage(img,125,115,40,40,300,300,75,75); // bird2
	    ctx.drawImage(img,290,150,40,40,425,200,75,75); // bird3
	    ctx.drawImage(img,75,150,40,40,550,75,75,75); // bird4
	    ctx.drawImage(img,295,115,40,40,50,50,75,75); // bird5
	}, false);
	img.src = "assets/duckhunt.png";
    }
}