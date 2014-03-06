/*var lat=0;
var lng=0;*/
var myLoc = [];

function initialize() {
	getLocation();
	console.log(myLoc);
	mapOptions = {
		center: new google.maps.LatLng(myLoc[0],myLoc[1]),//42.4069, -71.1198),
		zoom: 15
   };
	map = new google.maps.Map(document.getElementById("mapcanvas"),mapOptions);

	/*xhr = new XMLHttpRequest();
	xh.open("get","http://mbtamap.herokuapp.com/mapper/rodeo.json",true);
	xhr.onreadystatechange = dataReady;
	xhr.send(null);*/
}

function dataReady() {
	if(xhr.readyState==4 && xhr.status==200) {
		scheduleData = JSON.parse(xhr.responseText);
		console.log(scheduleData["line"]);
		//Do more stuff (get line, map stations, etc.)
	}
	else if (xhr.readyState==4 && xhr.status==500) {
		alert("Unable to load train data.\nThis is entirely Ming's fault. Sorry.");
	}
}

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLoc[0] = position.coords.latitude;
			myLoc[1] = position.coords.longitude;
			return myLoc;
			/*console.log(lat + " " + lng);
			return [lat, lng];*/
		});
	}
	else {
		alert("Geolocation is not supported by your subpar browser. Sucks to suck!");
	}
}
