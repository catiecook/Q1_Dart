
$("#getResults").click(function(event){
event.preventDefault();

var $priceMax = $("input:radio[name=priceMax]:checked").val();
console.log($priceMax);
var $origin = $("#origin").val();
console.log($origin);
var $departureDate = $("#departureDate").val();
console.log($departureDate);
var $returnDate = $("#returnDate").val();
console.log($returnDate);

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'yyyy/mm/dd'
  });

var $url = "https://galvanize-cors-proxy.herokuapp.com/http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-GB/" + $origin + "/anywhere/" + $departureDate + "/" + $returnDate + "?apiKey=ga774761977863345132258418049742&format=json";
console.log($url)
//link for the booking refferal - so far its not working
var $link = "http://partners.api.skyscanner.net/apiservices/referral/v1.0/US/USD/en-GB/" + $origin + "/anywhere/" + $departureDate + "/" + $returnDate + "?apiKey=ga77476197786334&format=json";



    $.get($url).then(function(data){
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

        var $destinationID = data.Quotes[i]["OutboundLeg"].DestinationId;
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
      $("#origin").focus(function(){
      $('#results').empty();
      });

    });

    //reset the search on focus, remove stuff from #results div and set iamge div to $(".image").show();
});



function getIdName(place, id){
  for(let i=0; i<place.length; i++){
    let currentPlace = place[i]
    if( currentPlace.PlaceId === id) {
      return currentPlace.Name;
    }
  }
};
