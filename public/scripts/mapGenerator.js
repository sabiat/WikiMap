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
            console.log(pin);
            const pinInfo = `<tr><th>${pin.name}</th><th>${pin.address}</th><th>${pin.description}</th><th><img src="${pin['image_url']}" width="100px" class="pin-picture"></th><th><button onclick="deletePin('${pin.address}', '${pins[0].map_id}')" class="delete-button btn btn-inverse"> <span class="glyphicon glyphicon-remove"></span></button></th></tr>`
            $('.table').append(pinInfo);
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
        const infowindow = new google.maps.InfoWindow({
          content: address,
        });
        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        marker.addListener("click", () => {
          infowindow.open(resultsMap, marker);
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }));
  }



const deletePin = function(pinAdd, mapId) {
  $.ajax({
    method: "GET",
    url: "/api/maps/data"
  })
  .done((data) => {
    user = data.id
    console.log(user);
    if (user) {
      const info = {
        pinAdd,
        mapId
      }
      $.ajax({
        method: "POST",
        url: "/api/maps/pins/delete",
        data: info,
        success: function() {
          window.location.reload();
        }
      })
    } else {
      $.ajax({
        method: "GET",
        url: "/api/users/login",
        success: function() {
          window.location.assign("/api/users/login")
        }
      })
    }
  }
  )
}









