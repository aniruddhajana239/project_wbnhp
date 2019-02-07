(function($){
	$(document).ready(function(){

		// Google Maps
		//-----------------------------------------------
		if ($("#map-canvas").length>0) {
			var map, myLatlng, myZoom, marker;
			// Set the coordinates of your location

			myLatlng = new google.maps.LatLng(22.593263, 88.416751);
			myZoom = 15;
			function initialize() {
				var mapOptions = {
					zoom: myZoom,
					zoomControlOptions: {
						position: google.maps.ControlPosition.LEFT_TOP
					},
					streetViewControlOptions: {
						position: google.maps.ControlPosition.LEFT_TOP
					},
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: myLatlng,
					scrollwheel: false
				};
				map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
				infowindow = new google.maps.InfoWindow();

				marker = new google.maps.Marker({
					map:map,
					draggable:true,
					animation: google.maps.Animation.DROP,
					position: myLatlng
				});

			var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">W.B.N.H.P.C.</h1>'+
            '<div id="bodyContent">'+
            '<p>11A, Mirza Ghalib Street,<br>'+'Kolkata, West Bengal 700087<br>'+'</p>'+
            '<p>Email:info@geomaticx.com, '+
            'Phone:9876543210</p>'+
            '</div>'+
            '</div>';

 var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
   marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

				google.maps.event.addDomListener(window, "resize", function() {
					map.setCenter(myLatlng);
				});
			}
			google.maps.event.addDomListener(window, "load", initialize);
		}
	}); // End document ready

})(this.jQuery);