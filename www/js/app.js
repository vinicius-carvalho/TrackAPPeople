// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var pr = angular.module('starter', ['ionic', 'ngCordova'])

  ultimascoord="";

pr.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

      db = $cordovaSQLite.openDB("my.db");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS endereco (id integer primary key, cidade text)");
    

        

  });
})



pr.controller('MapController', function($scope, $ionicLoading, $cordovaSQLite) {

$scope.ultimascoord=ultimascoord;
$scope.teste="d";






    var map = new google.maps.Map(document.getElementById('map'), { 
      mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(-23.6824124,-46.5952992),
        zoom: 15
   });


$scope.addressSearch="";
     var geocoder = new google.maps.Geocoder();
     var marker=new google.maps.Marker();
     var input = document.getElementById('search');

    
     var btn = document.getElementById('btn');

  
  
     var searchBox = new google.maps.places.SearchBox(input, map);

     //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
     //map.controls[google.maps.ControlPosition.TOP_LEFT].push(btn);
    

     var autocomplete= new google.maps.places.Autocomplete(input,map);


   $scope.geocode=function geocode () {
      $scope.checked=false;


// //Tirar os checkboxes das ultimas coordenadas
// function checkAll(frm, checkedOn) {

//   // have we been passed an ID
//   if (typeof frm == "check_boxes") {
//     frm = document.getElementById(frm);
//   }
   
//   // Get all of the inputs that are in this form
//   var inputs = frm.getElementsByTagName("input");

//   // for each input in the form, check if it is a checkbox
//   for (var i = 0; i < inputs.length; i++) {
//     if (inputs[i].type == "checkbox") {
//       inputs[i].checked = checkedOn;
//     }
//   }
// }

//         // executa a função para tirar os checkboxes
//       checkAll(check_boxes,false)

    
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


            $scope.addressSearch=results[0].formatted_address;
             $scope.addressSearch=results[0].formatted_address.split(',');

            $scope.$digest();

            





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

     
console.log($scope.addressSearch);

  $scope.$digest();

            $scope.insert = function(cidade) {
              $cordovaSQLite.deleteDB("my.db");

                 db = $cordovaSQLite.openDB("my.db");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS endereco (id integer primary key, cidade text)");
    
         

        var query = "INSERT INTO endereco (id,cidade) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [1,cidade]).then(function(res) {
            alert("INSERT ID -> " + res.insertId);
        }, function (err) {
            alert(err);
        });
    }

$scope.insert($scope.addressSearch);

    /* $scope.select = function(id) {
        var query = "SELECT cidade FROM endereco WHERE id = ?";

        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
            if(res.rows.length > 0) {
                
                ultimascoord=res.rows.item(0).cidade;
                
            } else {
                alert("No results found");
            }
        }, function (err) {
            alert(err);
        });

    }

     

$scope.select(1);*/

    


 
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
         
         
    $scope.map=map;


  setInterval(function () {


        $scope.$apply(function () {

        var query = "SELECT cidade FROM endereco WHERE id = ?";
        $cordovaSQLite.execute(db, query, [1]).then(function(res) {
            if(res.rows.length > 0) {
                
                ultimascoord=res.rows.item(0).cidade;
                
            } else {
                alert("No results found");
            }
        }, function (err) {
            alert(err);
        });
    

    
$scope.ultimascoord=ultimascoord;
//$scope.select(ultimascoord);
           
           
        });
    }, 7000);


});


pr.controller('main', function($scope, $cordovaSQLite,$cordovaSms) {



var nextItem = 4;
$scope.coordenadaslist = {1:"1234"};
$scope.coord="";

$scope.sendSMSbtn=function(num,text){
 $cordovaSms
      .send(num, text)
      .then(function() {
        alert("mensagem enviada");
      }, function(error) {
        alert(error);
      });
}



//   $scope.insert = function(cidade) {
//         var query = "INSERT INTO endereco (cidade) VALUES (?)";
//         $cordovaSQLite.execute(db, query, [cidade]).then(function(res) {
//             alert("INSERT ID -> " + res.insertId);
//         }, function (err) {
//             alert(err);
//         });
//     }


//        $scope.select = function(cidade) {
//         var query = "SELECT cidade FROM endereco WHERE cidade = ?";
//         $cordovaSQLite.execute(db, query, [cidade]).then(function(res) {
//             if(res.rows.length > 0) {
//                 alert("SELECTED -> " + res.rows.item(0).cidade);
//             } else {
//                 alert("No results found");
//             }
//         }, function (err) {
//             alert(err);
//         });
//     }

 $scope.deletebd=function(){
 $cordovaSQLite.deleteDB("my.db");

    }

$scope.mostrarMsgButton=false;
    $scope.esconder="Esconder Mapa"
    //$("#map_canvas").hide();
    
    $scope.hideMap =function(){
        
        $scope.mostrarMsgButton =! $scope.mostrarMsgButton;
      
         if ($scope.mostrarMsgButton){
        $scope.esconder="Mostrar Mapa";
        $("#map").toggle();
    }
    
    if (!$scope.mostrarMsgButton){
        $scope.esconder="Esconder Mapa"; 
        $("#map").toggle();
    }
    
    };

    
});

