
const fromQuery = "<%= newArr  %>"
      function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: { lat: 43.651070, lng: -79.347015 },
        });
        const geocoder = new google.maps.Geocoder();
        // document.getElementById("submit").addEventListener("click", () => {
        //   geocodeAddress(geocoder, map);
        // });
        window.onload = function() {
          geocodeAddress(geocoder, map);
        };
      }
        function geocodeAddress(geocoder, resultsMap) {
        // const address = document.getElementById("address").value;
        // const addressesArr =
        // ["5100 yonge street", "5200 yonge street",
        // "5300 yonge street", "5400 yonge street",
        // "5500 yonge street", "5600 yonge street"]
        const addressesArr = fromQuery.split(',');
        console.log(addressesArr[0]);
        addressesArr.forEach((address => {
          geocoder.geocode({ address: address}, (results, status) => {
          if (status === "OK"){
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
            });
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
        }));
      }
