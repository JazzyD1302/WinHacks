var map; 
var infowindow;
var test;
var strings;


var myStorage = window.sessionStorage;

var lat = myStorage.getItem("Lat");
var lng = myStorage.getItem("Lng");
var radius= myStorage.getItem("rad");

function create_info(name, rating, hours,price,distance){

    var Rest = document.createElement('div');
    Rest.id = "Rest";
    Rest.className ="r";

    var rName = document.createElement('div');
    rName.id = "rName";
    rName.className ="r";

    var rRating = document.createElement('div');
    rRating.id = "rRating";
    rRating.className ="r";

    var rTime = document.createElement('div');
    rTime.id = "rTime";
    rTime.className ="r";

    var rPrice = document.createElement('div');
    rPrice.id = "rPrice";
    rPrice.className ="r";

    var rDist = document.createElement('div');
    rDist.id = "rDist";
    rDist.className ="r";

    document.getElementById("test").appendChild(Rest);
    document.getElementById("test").appendChild(document.createElement('br'));

    Rest.appendChild(rName);
    Rest.appendChild(rRating);
    Rest.appendChild(rTime);
    Rest.appendChild(rPrice);
    Rest.appendChild(rDist);

    rName.innerHTML= name;
    rRating.innerHTML= rating;
    rTime.innerHTML= hours;
    rPrice.innerHTML= price;
    rDist.innerHTML= distance;
}



function initMap() {
    const myLatLng = { lat: lat, lng: lng };
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: myLatLng,
    });
    var request = {
        location: myLatLng,
        radius: radius.toString(),
        type: ['restaurant']
    };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i],i);
          }
        }
      });
  }

  function createMarker(place,i) {
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    test=place;
    get_data(i);
    console.log(place);
    if(place.business_status == "OPERATIONAL"){
      create_info(place.name, place.rating,place.opening_hours.isOpen(),place.price_level,0);
    }else if(place.business_status != "OPERATIONAL"){
      create_info(place.name, place.rating,"Unknown",place.price_level,0);
    }
    // if(strings.indexOf(place.name) !== -1){
    //   create_info(place.name, place.rating);
    //   google.maps.event.addListener(marker, "click", () => {
    //     infowindow.setContent(place.name || "");
    //     infowindow.open(map);
    //     console.log(place.name);
    //   });
    // // }else{
    //   console.log("big pog")
    // }
  }


function get_data(i){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      strings= this.responseText.split('""');
      
      // console.log(typeof this.responseText);
      console.log(strings[0]);
      // console.log(this.responseText);
    }
  }
  xhttp.open("GET", "search.php", true);
  xhttp.send();
}
