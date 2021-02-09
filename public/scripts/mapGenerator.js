function initMap() {
  const id = window.location.pathname.split('/')
  $.ajax({
    method: "GET",
    url: `/api/maps/data/${id[3]}`
  })
  .done((addresses)=> {
          const newArr = [];
          addresses.forEach(row => newArr.push(row.address))
          const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: { lat: 43.651070, lng: -79.347015 },
        });
        const geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map, newArr);

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
      alert(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}));
}




