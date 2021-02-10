$(document).ready(function(){
    $(".remove-favourite").on('click', function() {
      const name = $(this).closest(".each-map").find("a")
      let url = name[0].href;
      const id = url.substring(url.lastIndexOf('/') + 1);
      console.log(id)
      const map_name = name.text()
      $.ajax({
        method: "POST",
        url: `/api/users/favourites/delete`,
        data: id,
        success: function() {
          window.location.reload();
        }
      })
    });
  })


