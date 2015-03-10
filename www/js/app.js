// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


app.controller('MainController', function($scope, $ionicSideMenuDelegate, $ionicPopup){

   $scope.toggleLeft=function(){
    $ionicSideMenuDelegate.toggleLeft()
  }
  $scope.teste=function()
  {
    alert("olá");
  }

  google.maps.event.addDomListener(window, "load", function(){

    var map = new google.maps.Map(document.getElementById('map_canvas'), { 
      mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(-23.6824124,-46.5952992),
        zoom: 15
     });

     var geocoder = new google.maps.Geocoder();
     var marker=new google.maps.Marker();
     var input = document.getElementById('search');
     var btn = document.getElementById('btn');



     var searchBox = new google.maps.places.SearchBox(input, map);

     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
     map.controls[google.maps.ControlPosition.TOP_LEFT].push(btn);
    

     var autocomplete= new google.maps.places.Autocomplete(input,map);


      
      $scope.geocode=function geocode () {
        $scope.checked=false;



function checkAll(frm, checkedOn) {

  // have we been passed an ID
  if (typeof frm == "check_boxes") {
    frm = document.getElementById(frm);
  }
  
  // Get all of the inputs that are in this form
  var inputs = frm.getElementsByTagName("input");

  // for each input in the form, check if it is a checkbox
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox") {
      inputs[i].checked = checkedOn;
    }
  }
}

      checkAll(check_boxes,false)






        geocoder.geocode({
           'address': document.getElementById('search').value
        },
         function(results, status) {
            
           if(status == google.maps.GeocoderStatus.OK) {
               
               marker.setMap(null); // para tirar o marcador da tela
              marker= new google.maps.Marker({
                  
                 position: results[0].geometry.location,
                 map: map,
                 animation: google.maps.Animation.DROP
              });
              
              map.setCenter(results[0].geometry.location);
              
              google.maps.event.addListener(marker, "click", function() {
                  alert("adcionado");
});

                   google.maps.event.addListener(autocomplete, "place_changed", function() {
                  geocode()
});
           }

        $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

 
        });

}
        $scope.checked=false;
         
         $scope.MostrarMarcador=function(){
              $scope.checked=!$scope.checked;
              if($scope.checked){
                  pos = new google.maps.LatLng(-23.6824124,-46.5952992); // colocar a laitude e longitude da linha que for clicada em uma variavel
                  marker= new google.maps.Marker({
                  
                 position:pos,
                 map: map,
                 animation: google.maps.Animation.DROP
              });
              map.setCenter(pos);
          }
              
              if(!$scope.checked){
                  marker.setMap(null);
              }
                  
                  
       google.maps.event.addListener(marker, "click", function() {
                  alert("adcionado");
              });
              
              
             
         };
         
         
    $scope.map_canvas=map;



  });


    $scope.mostrarMsgButton=false;
    $scope.esconder="Esconder Mapa"
    
    $scope.mostrarEsconderMapa =function(){
        
        $scope.mostrarMsgButton =! $scope.mostrarMsgButton;
      
         if ($scope.mostrarMsgButton){
        $scope.esconder="Mostrar Mapa";
        $("#map_canvas").toggle();
    }
    
    if (!$scope.mostrarMsgButton){
        $scope.esconder="Esconder Mapa"; 
        $("#map_canvas").toggle();
    }
    
    };


  
         
         
         
    
})






// function MainCtrl($scope, $ionicSideMenuDelegate){

//   $scope.toggleLeft()=function(){
//     ionicSideMenuDelegate.toggleLeft();
//   }

// }
