//amadeus API: https://sandbox.amadeus.com/travel-innovation-sandbox/apis/get/flights/inspiration-search

$("form").submit(function(event){
event.preventDefault();

var $priceMax = $("input:radio[name=priceMax]:checked").val();
console.log($priceMax);

var $origin = $("#origin").val();
console.log($origin);

var $departureDate = $("#departureDate").val(); //not required
console.log($departureDate);

var $duration = $("#duration").val();
console.log($duration);


// 
// var $urlCityCode = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=fYkwnCzOIJUJnyVRNlUMDDQXNGjqWIGL" + "&term=" + $origin;
// var $originIATA = $.get($urlCityCode).then(function(data){
//   return $.get(data[0]["value"]);
// });


var $url = "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?" + "origin=" + $origin + "&departure_date=" + $departureDate + "&duration=" + $duration + "&max_price=" + $priceMax + "&apikey=fYkwnCzOIJUJnyVRNlUMDDQXNGjqWIGL";

  $.get($url).then(function(data){

    for(var i=0; i<15; i++){

      var $results = $("<div />", {
        "class": "col s12 m3",
        "style": "padding: 2vw",
      });
      $results.text("Destination: " + data["results"][i]["destination"] + " "+ "Price: $"+
      data["results"][i]["price"]  + " ");

      $("#results").append($results);
    }
  });
});





//IATA CODES GENERATION
//documentation: https://sandbox.amadeus.com/travel-innovation-sandbox/apis/get/airports/autocomplete
//urlBase: https://api.sandbox.amadeus.com/v1.2/airports/autocomplete

//EXAMPLE URL https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=fYkwnCzOIJUJnyVRNlUMDDQXNGjqWIGL&term=Ban"




//flickr API urlBase http://api.flickr.com/services/rest/
//helper page: http://kylerush.net/blog/flickr-api/
