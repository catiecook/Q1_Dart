

//start on click

$("#getResults").click(function(event){
event.preventDefault();


var $origin= $("#origin").val();
$origin = $origin.replace(/\(|\)/g,'').split("");
var $realOrigin=[];
for(let i=$origin.length-3; i<$origin.length; i++){
  $realOrigin.push($origin[i])
}
$realOrigin = $realOrigin.join('');
console.log($realOrigin)
// console.log($origin);

var $departureDate = $("#departureDate").val();
console.log($departureDate);
var $returnDate = $("#returnDate").val();
console.log($returnDate);


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'yyyy-mm-dd'
  });

  if ($departureDate > $returnDate) {
    console.log("the dates are not valid");
  }


var $url = "https://galvanize-cors-proxy.herokuapp.com/http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-GB/" + $realOrigin + "/anywhere/" + $departureDate + "/" + $returnDate + "?apiKey=ga774761977863345132258418049742&format=json";
console.log($url)
//link for the booking refferal - so far its not working
var $link = "http://partners.api.skyscanner.net/apiservices/referral/v1.0/US/USD/en-GB/" + $realOrigin + "/anywhere/" + $departureDate + "/" + $returnDate + "?apiKey=ga77476197786334&format=json";

    $.get($url).then(function(data){
      console.log(data);
        data.Quotes.sort(function(a, b){
          // console.log(a.MinPrice, b.MinPrice);
        return a.MinPrice - b.MinPrice;
        })

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

        var $destinationID = data.Quotes[i].OutboundLeg.DestinationId;
        var $destinationName = getIdName(data.Places, $destinationID);
        var $flightPrice = data.Quotes[i].MinPrice;

        $destination.text($destinationName).css({'padding-top': '1.2vw', 'font-size': '1.5em', 'background-color': 'rgba(255, 255, 255, 0.8)', 'margin-right':'5%'});

        $minPrice.text("$"+$flightPrice);

        $(".image").hide();
        $("#results").append($destination.append($minPrice.append(
            $("<div/>", {"class": "row s12 m3"})).append($("<a>", {"class": "btn waves-effect waves-effect waves-light blue-grey", "href": $link, "target": '_blank', "text": ">>>"}))
          )
        )
      } //end of for loop

      $("#departureDate").focus(function(){
      $('#results').empty();
    });

  });
});


function getIdName(place, id){
  for(let i=0; i<place.length; i++){
    let currentPlace = place[i]
    if( currentPlace.PlaceId === id) {
      return currentPlace.Name;
    }
  }
};
