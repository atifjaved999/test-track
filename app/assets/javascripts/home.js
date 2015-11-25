// setTimeout(function(){ calcRoute(start, end) }, 5000);

var i =0
var max_seconds = 10
// var myVar = setTimeout(function(){ showTimer() }, 7000);


function showTimer() {
  // get_last_location();
    $('#counter').html(++i);
    if (i == max_seconds) {
      i = 0
      get_last_location();
    }
}

function get_last_location(){
  $.ajax({
        url: '/locations/get_last_location',
        method: 'POST',
        success: function(data) {
          dd = data
           last_point =new google.maps.LatLng(data.lat, data.lng);
           moveMarker(map, marker, last_point)
           draw_polyline(start, last_point)
           // calcRoute(start, last_point)

        }
      });
}

function calcRoute(start, end) {

    // var bounds = new google.maps.LatLngBounds();
    // bounds.extend(start);
    // bounds.extend(end);
    // map.fitBounds(bounds);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
            if (marker) {
              console.log('move')
              moveMarker(map, marker, end);
            }else{
              console.log('place')
              placeMarker(end);
            }
        } else {
            alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
        }
    });
}

function moveMarker(map, marker, location){
var current_zoom = map.getZoom();
  google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
    // if (this.getZoom() > 15) {
      console.log("moveMarker")
      this.setZoom(current_zoom);
      map.panTo(location);
    // }
  });
marker.setPosition(location);
// map.panTo(location);
// map.setCenter(location);
// map.setZoom(current_zoom);
infowindow.close(); //  Closing the Old window
  infowindow = new google.maps.InfoWindow({
    content: 'Latitude2: ' + location.lat() + '<br>Longitude: ' + location.lng()
  });

  infowindow.open(map,marker);
  google.maps.event.addDomListener(window, 'load', initialize);
}

function placeMarker(location) {
  console.log("placeMarker")
  marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);
  // google.maps.event.addDomListener(window, 'load', initialize);
}

function draw_polyline(startPoint, endPoint){
  var arr = [startPoint, endPoint]
  var poly = new google.maps.Polyline({
      path: arr,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map    
    });
}
