
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

//link for the booking refferal
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

        $destination.text("Destination: " + data.Quotes[i]["OutboundLeg"].DestinationId).css('padding-top', '2vw');
        //var $destination = //get request for the name of the destination ID
        $minPrice.text("Price: $" + data.Quotes[i].MinPrice);

        // $results.text("Destination: " + $destination + " " + "Price: $"+
        // $minPrice  + " ");

        $("#results").append($destination).append($minPrice.append(
          $("<div/>", {"class": "row s12 m3"})).append($("<button>", {"class": "btn", "href": $link, "text": "Book It"}))
        )
      }
    });
});
