
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
              // alert('asdf')
              console.log('move')
              moveMarker(map, marker, end);
            }else{
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
    if (this.getZoom() > 15) {
      console.log("in")
      this.setZoom(current_zoom);
      map.panTo(location);
    }
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
