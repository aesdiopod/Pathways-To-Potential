// See http://dev.socrata.com/consumers/getting-started.html for more info and examples
    // Insert your Socrata endpoint URL, SoQL query to filter by column, and Socrata API token 

    $(window).load(function() {
    url = 'http://opendata.socrata.com/resource/fprk-sxpi.json';
    var center = new google.maps.LatLng(44.314844300000000000,-85.602364299999970000);
    
    var mapOptions = {
      zoom: 8,
      center: center
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var infowindow = new google.maps.InfoWindow();
      
    
    // Get Socrata data in JSON format using jQuery AJAX call http://api.jquery.com/jquery.getjson/
    // Then iterate through records one by one using $.each jQuery function, and create new marker for each
    // In this example, "location_1" is the column name for geocoded data in Socrata
    $.getJSON(url, function(data, textstatus) {
          console.log(data);
          $.each(data, function(i, entry) {
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.location_1.latitude, 
                                                   entry.location_1.longitude),
                  
                  map: map,
                  title: location.name
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(entry.resource);
          infowindow.open(map, marker);
        }
      })(marker, i));
              
          });
    });
});