str = '[{"line":"Blue","station":"Wonderland","lat":42.41342,"lng":-70.991648},{"line":"Blue","station":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"line":"Blue","station":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"line":"Blue","station":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"line":"Blue","station":"Orient Heights","lat":42.386867,"lng":-71.00473599999999},{"line":"Blue","station":"Wood Island","lat":42.3796403,"lng":-71.02286539000001},{"line":"Blue","station":"Airport","lat":42.374262,"lng":-71.030395},{"line":"Blue","station":"Maverick","lat":42.36911856,"lng":-71.03952958000001},{"line":"Blue","station":"Aquarium","lat":42.359784,"lng":-71.051652},{"line":"Blue","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"Blue","station":"Government Center","lat":42.359705,"lng":-71.05921499999999},{"line":"Blue","station":"Bowdoin","lat":42.361365,"lng":-71.062037},{"line":"Orange","station":"Oak Grove","lat":42.43668,"lng":-71.07109699999999},{"line":"Orange","station":"Malden Center","lat":42.426632,"lng":-71.07411},{"line":"Orange","station":"Wellington","lat":42.40237,"lng":-71.077082},{"line":"Orange","station":"Sullivan","lat":42.383975,"lng":-71.076994},{"line":"Orange","station":"Community College","lat":42.373622,"lng":-71.06953300000001},{"line":"Orange","station":"North Station","lat":42.365577,"lng":-71.06129},{"line":"Orange","station":"Haymarket","lat":42.363021,"lng":-71.05829},{"line":"Orange","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"Orange","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"line":"Orange","station":"Chinatown","lat":42.352547,"lng":-71.062752},{"line":"Orange","station":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"line":"Orange","station":"Back Bay","lat":42.34735,"lng":-71.075727},{"line":"Orange","station":"Mass Ave","lat":42.341512,"lng":-71.083423},{"line":"Orange","station":"Ruggles","lat":42.336377,"lng":-71.088961},{"line":"Orange","station":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"line":"Orange","station":"Jackson Square","lat":42.323132,"lng":-71.099592},{"line":"Orange","station":"Stony Brook","lat":42.317062,"lng":-71.104248},{"line":"Orange","station":"Green Street","lat":42.310525,"lng":-71.10741400000001},{"line":"Orange","station":"Forest Hills","lat":42.300523,"lng":-71.113686},{"line":"Red","station":"Alewife","lat":42.395428,"lng":-71.142483},{"line":"Red","station":"Davis","lat":42.39674,"lng":-71.121815},{"line":"Red","station":"Porter Square","lat":42.3884,"lng":-71.11914899999999},{"line":"Red","station":"Harvard Square","lat":42.373362,"lng":-71.118956},{"line":"Red","station":"Central Square","lat":42.365486,"lng":-71.103802},{"line":"Red","station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},{"line":"Red","station":"Charles/MGH","lat":42.361166,"lng":-71.070628},{"line":"Red","station":"Park Street","lat":42.35639457,"lng":-71.0624242},{"line":"Red","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"line":"Red","station":"South Station","lat":42.352271,"lng":-71.05524200000001},{"line":"Red","station":"Broadway","lat":42.342622,"lng":-71.056967},{"line":"Red","station":"Andrew","lat":42.330154,"lng":-71.057655},{"line":"Red","station":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"line":"Red","station":"Savin Hill","lat":42.31129,"lng":-71.053331},{"line":"Red","station":"Fields Corner","lat":42.300093,"lng":-71.061667},{"line":"Red","station":"Shawmut","lat":42.29312583,"lng":-71.06573796000001},{"line":"Red","station":"Ashmont","lat":42.284652,"lng":-71.06448899999999},{"line":"Red","station":"North Quincy","lat":42.275275,"lng":-71.029583},{"line":"Red","station":"Wollaston","lat":42.2665139,"lng":-71.0203369},{"line":"Red","station":"Quincy Center","lat":42.251809,"lng":-71.005409},{"line":"Red","station":"Quincy Adams","lat":42.233391,"lng":-71.007153},{"line":"Red","station":"Braintree","lat":42.2078543,"lng":-71.0011385}]';

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
	myLoc = new google.maps.LatLng(lat, lng);
	map.panTo(myLoc);
	marker = new google.maps.Marker({
		position: myLoc,
		animation: google.maps.Animation.DROP,
		title: "Current Location"
	});
	marker.setMap(map)
	initInfoContent = '<h3>You are here:</h3>' + '<p>' + lat.round(5) + ', ' + lng.round(5) + '</p>';
	//FIGURE OUT HOW TO GET ADDRESS FROM LATLNG
	infoWindow = new google.maps.InfoWindow();
	infoWindow.setContent(initInfoContent);
	infoWindow.open(map, marker);
	google.maps.event.addListener(marker, 'click', function() {
		stopWindow.close();
		infoWindow.open(map,marker);
	});

	xhr = new XMLHttpRequest();
	xhr.open("get","http://mbtamap.herokuapp.com/mapper/rodeo.json",true);
	xhr.onreadystatechange = dataReady;
	xhr.send(null);
}

function dataReady() {
	if(xhr.readyState==4 && xhr.status==200) {
		scheduleData = JSON.parse(xhr.responseText);
		console.log('Line given: ' + scheduleData["line"]);//DELETE ME
		stations = JSON.parse(str);
		drawLine();
	}
	else if (xhr.readyState==4 && xhr.status==500) {
		alert("Unable to load train data.\nRefresh and try again.");
	}
}

function drawLine() {
	switch(scheduleData['line']) {
			case 'red':
				lineName = 'Red';
				lineColor = '#AA0000';
				sign = '../transit/assets/redt.png';
				break;
			case 'orange':
				lineName = 'Orange';
				lineColor = '#D45500';
				sign = '../transit/assets/oranget.png';
				break;
			case 'blue':
				lineName = 'Blue';
				lineColor = '#0044AA';
				sign = '../transit/assets/bluet.png';
				break;
			default:
				alert("Houston, we have a problem.");
	}
	document.title = 'Nearest ' + lineName + ' Line station';
	stationMark = {
		url: sign,
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(8,32)
	};
	j=0; //counter for path and name arrays
	linePath=[];
	stopName = [];
	for (var i = 0; i < stations.length; i++) {
		if (stations[i]['line'] == lineName) {
			tStop = new google.maps.LatLng(stations[i]['lat'],stations[i]['lng']);
			stopMarker = new google.maps.Marker ({
				position: tStop,
				map: map,
				title: stations[i]['station'],
				icon: stationMark 
			});
			linePath[j] = tStop;
			stopName[j] = stopMarker.title;
			stopWindow = new google.maps.InfoWindow();
			google.maps.event.addListener(stopMarker, 'click', function() {
				stopWindow.close();
				infoWindow.close();
				schedule = getSchedule(this.title);
				stopContent = '<h3>' + this.title + '</h3><table><thead><tr><td>Destination</td><td>Arriving in (min)</td></tr></thead>';
				for (var k=0; k<schedule.length; k++) {
					stopContent += '<tr><td>' + schedule[k].dest + '</td><td>' + schedule[k].time.round(0) + '</td></tr>';
				}
				stopContent += '</table>';
				stopWindow.setContent(stopContent);
				stopWindow.open(map, this);
			});
			j++;
		}
	}
	if(lineName == 'Red') {
			ashLine = [];
			brtLine = [];
			brtLine[0] = linePath[12]; //start Braintree line at JFK/Umass
			b = 0;
			for (var i = 0; i < linePath.length; i++) {
				if(i <= 16) {
					ashLine[i] = linePath[i]; //Ashmont branch
				}
				else {
					b++;
					brtLine[b] = linePath[i];
				}
			}
			aLine = new google.maps.Polyline ({
				path: ashLine,
				geodesic: true,
				strokeColor: lineColor,
				strokeOpacity: 1.0,
				strokeWeight: 3,
				map: map
			});
			bLine = new google.maps.Polyline ({
				path: brtLine,
				geodesic: true,
				strokeColor: lineColor,
				strokeOpacity: 1.0,
				strokeWeight: 3,
				map: map
			});
	}
	else {
		tLine = new google.maps.Polyline({
			path: linePath,
			geodesic: true,
			strokeColor: lineColor,
			strokeOpacity: 1.0,
			strokeWeight: 3,
			map: map
		});
	}
	findNearest();
}

function getSchedule(stationStop) {
	console.log(stationStop);
	var tableData = [];
	k=0; //length of tableData array
	for (var i=0; i<scheduleData.schedule.length; i++) {
		for (var j=0; j<scheduleData.schedule[i].Predictions.length; j++) {
			if(scheduleData.schedule[i].Predictions[j].Stop == stationStop) {
				tableData[k] = {
					"dest": scheduleData.schedule[i].Destination,
					"time": scheduleData.schedule[i].Predictions[j].Seconds/60
				}
				k++;
			}
		}
	}
	return tableData;
}

function findNearest() {
	nearest = 25000; // Earth's circumference is 24,901 miles
	nStop = 'a';     // nearest stop
	nIndex = 50;     // no line has 50 stops (arbitrary)
	for (var i = 0; i<linePath.length; i++) {
		dist = haversine(myLoc.k,myLoc.A,linePath[i].k,linePath[i].A);
		if (dist < nearest) {
			nearest = dist;
			nStop = stopName[i];
			nIndex = i;
		}
	}
	nearest = nearest.round(3);
	nearestContent = '<p>The nearest station is <strong>' + nStop + '</strong>, which is ' + nearest + ' miles away.</p>';
	infoWindow.setContent(initInfoContent + nearestContent);
	infoWindow.open(map, marker);

	dLine = [myLoc, linePath[nIndex]];
	distLine = new google.maps.Polyline ({
		path: dLine,
		geodesic: true,
		strokeColor: '#404040',
		strokeOpacity: 0.6,
		strokeWeight: 6,
		map: map
	});
}

function haversine(lat1, lon1, lat2, lon2) {
	// Haversine formula from movable-type.co.uk
	var R = 3963.1676; // miles
	var dLat = (lat2-lat1);
	dLat = toRad(dLat)
	var dLon = (lon2-lon1);
	dLon = toRad(dLon);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

function toRad(num) {
	return num * Math.PI/180;
}

Number.prototype.round = function(places) {
	return +(Math.round(this + "e+" + places)  + "e-" + places);
}
