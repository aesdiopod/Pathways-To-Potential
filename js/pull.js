 (function ($) {
    $('button').on('click', function () {
        // remove resultset if this has already been run
        $('.container ul').remove();
        // add spinner to indicate something is happening
        $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
        
        // get selected zip code from selectbox
        var county_name = $('select option:selected').text();
        // console.log("County Name: " + county_name);
        
         url = 'http://opendata.socrata.com/resource/fprk-sxpi.json?county_name=' + county_name;
    var center = new google.maps.LatLng(44.314844300000000000,-85.602364299999970000);
    
    var mapOptions = {
      zoom: 8,
      center: center,
      
      
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

            // Infowindow
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(entry.school_name, entry.school_name, entry.zip_code);
          infowindow.open(map, marker);
        }
      })(marker, i));
              
          });

          
      


    });

        // make AJAX call
        $.getJSON('http://opendata.socrata.com/resource/fprk-sxpi.json?county_name=' + county_name, function (data) {
            alert(data);
            // do all this on success       
            var items = [],
            

                $ul;


            
            $.each(data, function (key, val) {
                //iterate through the returned data and build a list
                items.push('<br><li class="list-group-item" id="' + key + '"><span class="school name">' + val.school_name + '</span><br><br><span class="zip_code">' + val.zip_code + '</span><br><br><span class="success_coach"> '   + (val.success_coach).split(" ")[0] +'</span></li>');
            });
            // if no items were returned then add a message to that effect
            if (items.length < 1) {
                items.push('<li>No results for this County, try again!</li>');
            }

            // remove spinner
            $('.fa-spin').remove();
            
            // append list to page
            $ul = $('<ul />').addClass('list-group').appendTo('.container.results');
            
            //append list items to list
            $ul.append(items);
        });
    });
}(jQuery));