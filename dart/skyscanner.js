
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
var $link = "http://partners.api.skyscanner.net/apiservices/referral/v1.0/US/USD/en-GB/" + $origin + "/anywhere/" + $departureDate + "/" + $returnDate + "?apiKey=ga77476197786334";

// console.log($url);
// console.log($link);

    $.get($url).then(function(data){

      for(var i=0; i<3; i++){
        //create new div with styles
        var $results = $("<div />", {
          "class": "col s12 m3",
          "style": "padding: 2vw",
          //add event handler attr.data-url: 'link address'
        });

        var $destination = data.Quotes[i]["OutboundLeg"].DestinationId;
        //var $destination = //get request for the name of the destination ID
        var $minPrice = data.Quotes[i].MinPrice;

        $results.text("Destination: " + $destination + " " + "Price: $"+
        $minPrice  + " ");
        $("#results").append($results);
console.log($link);

        
          // console.log(data);
          // $("#results").append($("<p>")).append($("<a>")).attr("href", $link).html("Book it") //in div created in loop, append a link to a new paragraph with the text "book it"


        }
  });
});
//see snippet in dev tools for making a sorted array of prices
//ask about the branch
//the redirect link question - can I just load that get request into a "book" link
