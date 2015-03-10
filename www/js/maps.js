
// google.maps.event.addListener(window, "load",function(){

//   var map = new google.maps.Map(document.getElementById('map_canvas'), { 
//         mapTypeId: google.maps.MapTypeId.TERRAIN,
//         center: new google.maps.LatLng(-23.6824124,-46.5952992),
//         zoom: 10
//      });


//      var geocoder = new google.maps.Geocoder();
//      var marker=new google.maps.Marker();
//       function geocode () {
        
//         geocoder.geocode({
//            'address': document.getElementById('search').value
//         }, 
//         function(results, status) {
            
//            if(status == google.maps.GeocoderStatus.OK) {
               
//                marker.setMap(null); // para tirar o marcador da tela
//               marker= new google.maps.Marker({
                  
//                  position: results[0].geometry.location,
//                  map: map,
//                  animation: google.maps.Animation.DROP
//               });
              
//               map.setCenter(results[0].geometry.location);
              
//               google.maps.event.addListener(marker, "click", function() {
//                   alert("adcionado");
// });
//            }
//         });
//      }  


// }

