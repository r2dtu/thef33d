function getChannelId() {
  var createData = {"action": "getCid"};

  var request = $.ajax({
      url: "youtube_api/YouTube_API.php",
      type: "POST",
      data: createData
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
      alert("Finished authorizing YouTube account and updating user Channel ID.");
  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
    alert("You need to reauthorize your YouTube access. Please quit Chrome and retry again.");
  });
}

function getVideos() {
  var createData = {"action": "getVids"};

  var request = $.ajax({
      url: "youtube_api/YouTube_API.php",
      type: "POST",
      data: createData
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR) {

      var embed_videos = JSON.parse(response);
      for (var title in embed_videos) {
          console.log(embed_videos[title]);
      }
  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
    alert("You need to reauthorize your YouTube access. Please quit Chrome and retry again.");
  });

  // JUST TEST! NEED TO ADD TO CORRESPONDING PARALLAX
  var $mainparallax1 = $('.mainparallax1');

}
