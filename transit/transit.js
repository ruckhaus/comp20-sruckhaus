function initialize() {}

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
		});
	}
	else {
		alert("Geolocation is not supported by your crappy browser. Sucks to suck!");
	}
}
