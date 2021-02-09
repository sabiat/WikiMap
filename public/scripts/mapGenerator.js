function initMap() {
  const id = window.location.pathname.split('/')
  $.ajax({
    method: "GET",
    url: `/api/maps/data/${id[3]}`
  })
  .done((pins)=> {
          const newArr = [];
          pins.forEach(row => newArr.push(row.address))
          const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: { lat: 43.651070, lng: -79.347015 },
        });
        const geocoder = new google.maps.Geocoder();
        if (newArr[0]) {
          geocodeAddress(geocoder, map, newArr);
          for (pin of pins) {
            $('.table').append(`<tr><th>${pin.name}</th><th>${pin.address}</th></tr>`);
          }
        }
        $("h3").text(`${pins[0].map_name}`)
        $(".map-id").val(`${pins[0].map_id}`)
  })
}
function geocodeAddress(geocoder, resultsMap, addresses) {
const addressesArr = addresses
addressesArr.forEach((address => {
  geocoder.geocode({ address: address}, (results, status) => {
    if (status === "OK"){
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}));
}





