// autofill
$("#origin").keyup(function(){
  $(function() {
      var apcm = new apc('multi', {key : '4baada867f', limit: 7});

      var autocompleteObj = {
          source: function( request, response ) {
              // make the request
              apcm.request( $("#origin").val() );

              apcm.onSuccess = function (data) {
                console.log(data);
                  if (data.status) { // success
                      response( $.map( data.airports, function(item) {

                          return {
                              label: item.name + ' (' + item.iata + ')',
                              value: item.name + ' (' + item.iata + ')',
                              code: item.iata
                          }
                      }));

                  } else { // no results
                      response();
                  }
              };
              apcm.onError = function (data) {

                  console.log(data.message);
              };
          },
          select: function( event, ui ) {
              // do something for click event
              console.log(ui.item.code);
          }
      }
      $("#origin").autocomplete(autocompleteObj);
  });
})
