
$("form").submit(function(event){
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

  console.log($url);
    $.get($url).then(function(data){

      for(var i=0; i<4; i++){
        var $results = $("<div />", {
          "class": "col s12 m3",
          "style": "padding: 2vw",
        });
console.log(data);
        var $destination = data.Quotes[i]["InboundLeg"].DestinationId;
        //var $destination = //get request for the name of the destination ID
        var $minPrice = data.Quotes[i].MinPrice;
        $results.text("Destination: " + $destination + " "+ "Price: $"+
        $minPrice  + " ");
        $("#results").append($results);
        console.log(data.Quotes[i]);
      }
  });
});
//see snippet in dev tools for making a sorted array of prices
//ask about the branch
//the redirect link question - can I just load that get request into a "book" link
