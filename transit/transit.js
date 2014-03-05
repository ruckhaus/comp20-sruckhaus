function initialize() {
	xhr = new XMLHttpRequest();
	xh.open("get","http://mbtamap.herokuapp.com/mapper/rodeo.json",true);
	xhr.onreadystatechange = dataReady;
	xhr.send(null);
}

function dataReady() {
	if(xhr.readyState==4 && xhr.status==200) {
		scheduleData = JSON.parse(xhr.responseText);
		//Do more stuff (get line, map stations, etc.)
	}
	else if (xhr.readyState==4 && xhr.status==500) {
		//Output something
	}
}

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
		});
	}
	else {
		alert("Geolocation is not supported by your subpar browser. Sucks to suck!");
	}
}
