(function ($) {
    $('button').on('click', function () {
        // remove resultset if this has already been run
        $('.container ul').remove();
        // add spinner to indicate something is happening
        $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
        
        // get selected zip code from selectbox
        var city = $('select option:selected').text();
        
         url = 'http://data.michigan.gov/resource/7f94-hriw.json?city=' + city;
    var center = new google.maps.LatLng(44.314844300000000000,-85.602364299999970000);
    
    var mapOptions = {
      zoom: 8,
      center: center
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scroll:{x:$(window).scrollLeft(),y:$(window).scrollTop()}
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
          infowindow.setContent(entry.resource, entry.);
          infowindow.open(map, marker);
        }
      })(marker, i));
              
          });

          // Scrolly Time!!
        
        var offset=$(map.getDiv()).offset();
        map.panBy(((mapOptions.scroll.x-offset.left)/3),((mapOptions.scroll.y-offset.top)/3));
      google.maps.event.addDomListener(window, 'scroll', function(){
      var scrollY=$(window).scrollTop(),
          scrollX=$(window).scrollLeft(),
          scroll=map.get('scroll');
      if(scroll){
        map.panBy(-((scroll.x-scrollX)/3),-((scroll.y-scrollY)/3));
      }
      map.set('scroll',{x:scrollX,y:scrollY})
      
      });
      


    });

        // make AJAX call
        $.getJSON('http://data.michigan.gov/resource/ekha-b43f.json?city=' + city, function (data) {
            // alert(data);
            // do all this on success       
            var items = [],
                $ul;
            
            $.each(data, function (key, val) {
                //iterate through the returned data and build a list
                items.push('<br><li class="list-group-item" id="' + key + '"><span class="county">' + val.county + '</span><br><br><span class="resource">' + val.resource + '</span><br><br><span class="resourcetype">' + val.resourcetype + '</span><br><br><span class="location_1">' + val.location_1.longitude + '</span></li>');
            });
            // if no items were returned then add a message to that effect
            if (items.length < 1) {
                items.push('<li>No results for this City, try again!</li>');
            }

            // remove spinner
            $('.fa-spin').remove();
            
            // append list to page
            $ul = $('<ul />').addClass('list-group').appendTo('.container');
            
            //append list items to list
            $ul.append(items);
        });
    });
}(jQuery));