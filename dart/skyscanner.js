
$("#getResults").click(function(event){
event.preventDefault();

var $priceMax = $("input:radio[name=priceMax]:checked").val();
console.log($priceMax);
var $origin = $("#origin").val();
console.log($origin);
var $departureDate = $("#departureDate").val(); //not required
console.log($departureDate);
var $returnDate = $("#returnDate").val(); //not required
console.log($returnDate);

var $url = "https://galvanize-cors-proxy.herokuapp.com/http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-GB/" + $origin + "/anywhere/" + $departureDate + "/" + $returnDate + "?apiKey=ga774761977863345132258418049742&format=json";
console.log($url)
//link for the booking refferal - so far its not working
var $link = "http://partners.api.skyscanner.net/apiservices/referral/v1.0/US/USD/en-GB/" + $origin + "/anywhere/" + $departureDate + "/" + $returnDate + "?apiKey=ga77476197786334&format=json";

    $.get($url).then(function(data){

      for(var i=0; i<3; i++){
        //create new div with styles
        var $results = $("<div />", {
          "class": "row s12 m3 center",
        });

        var $destination = $("<div />", {
          "class": "row s12 m3 center"
        });

        var $minPrice = $("<div />", {
          "class": "row s12 m3 center"
        });

        var $destinationID = data.Quotes[i]["OutboundLeg"].DestinationId;
        var $destinationName = getIdName(data.Places, $destinationID);
        var $flightPrice = data.Quotes[i].MinPrice;

        $destination.text($destinationName).css({'padding-top': '2vw', 'font-size': '2em'});

        $minPrice.text("$"+$flightPrice).css({'font-size': '1em'});

        $("#results").append($destination.append($minPrice.append(
          $("<div/>", {"class": "row s12 m3"})).append($("<a>", {"class": "btn", "href": $link, "text": "Book It"}))
        )
      )
      }
    });
});


// create funciton placeID(data, ID)

//compare the data.Places[i].placeId and the ID i already found and returning when they are equal

function getIdName(place, id){
  for(let i=0; i<place.length; i++){

    let currentPlace = place[i]
    if( currentPlace.PlaceId === id) {
      return currentPlace.Name;
    }
  }
};

//create variable = getIdName(data.Places, Id)
