function initialize() {
	mapOptions = {
		center: new google.maps.LatLng(42.3581, -71.0636), //center in Boston
		zoom: 15
   };
	map = new google.maps.Map(document.getElementById("mapcanvas"),mapOptions);
	getLocation();
}

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your subpar browser. Sucks to suck!");
	}
}

function renderMap() {
	console.log(lat + ' ' + lng);
	myLoc = new google.maps.LatLng(lat, lng);
	map.panTo(myLoc);
	marker = new google.maps.Marker({
		position: myLoc,
		animation: google.maps.Animation.DROP,
		title: "Current Location"
	});
	marker.setMap(map)
	console.log(marker.title);
	var infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(marker.title);
		infoWindow.open(map, marker);
	});

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
