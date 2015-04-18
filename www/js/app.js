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

var nextItem = 4;
$scope.coordenadaslist = {1:"1234"};
$scope.coord="";

// adicionar uma nova con
$scope.addItem = function() {
    $scope.coordenadaslist.unshift(nextItem++);
  }


 // Esconder o mapa
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
    $scope.endereco="";
     var geocoder = new google.maps.Geocoder();
     var marker=new google.maps.Marker();
     var input = document.getElementById('search');

    
     var btn = document.getElementById('btn');

     
     
     



     var searchBox = new google.maps.places.SearchBox(input, map);

     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
     map.controls[google.maps.ControlPosition.TOP_LEFT].push(btn);
    

     var autocomplete= new google.maps.places.Autocomplete(input,map);


      // função para a busca
      $scope.geocode=function geocode () {
      $scope.checked=false;


//Tirar os checkboxes das ultimas coordenadas
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

        // executa a função para tirar os checkboxes
      checkAll(check_boxes,false)

    
var input = document.getElementById('search').value;
  var latlngStr = input.split(',', 2);
  var lat = parseFloat(latlngStr[0]);
  var lng = parseFloat(latlngStr[1]);
  var latlng = new google.maps.LatLng(lat, lng);

       //função para colocar os marcadores e fazer a busca

        geocoder.geocode({
           'address': input
        },



         function(results, status) {

           if(status == google.maps.GeocoderStatus.OK) {


        

            $scope.endereco=results[0].formatted_address;
            $scope.$digest();

            console.log(results[0].formatted_address);
           


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
                  geocode() // executa a busca
});
           }


            //pergunta se quer colocar nas ultimas coordenadas
           if (confirm('Você quer salvar a busca como últimas coordenadas?')) {
    alert("Salvou!");

    //addItem(); adicionar na lista de coordenadas

  
 


} else {
    // Do nothing!
}

     

 
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



    
//       $scope.enviar={

//       smsSend :function(){
//         alert("tá aqui");
//         var number=012981625268;
//         var message = "receber";
        
//         var options = {
//             replaceLineBreaks: false, // true to replace \n by a new line, false by default
//             android: {
//                 //intent: 'INTENT'  // send SMS with the native android SMS messaging
//                 intent: '' // send SMS without open any other app
//             }
//       };


//       var success = function () { alert('Aguarde alguns minutos para receber as coordenadas'); };
//         var error = function (e) { alert('Ops, a mensagem falhou:' + e); };
//         sms.send(number, message, options, success, error);



//     }

// };


// var messageInfo = {
//     phoneNumber: "xxxxxxxxxx",
//     textMessage: "This is a test message"
// };

// $scope.enviar=function (){
//   sms.sendMessage(messageInfo, function(message) {
//     console.log("success: " + message);
// }, function(error) {
//     console.log("code: " + error.code + ", message: " + error.message);
// });
  
//    };   




         
    
})
