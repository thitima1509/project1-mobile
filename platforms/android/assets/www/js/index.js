
ons.ready(function() {
  // deviceready event is fired
  // Call whatever Cordova APIs

  $("#hello").click(function(){        
      navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
          destinationType: Camera.DestinationType.FILE_URI });
      
      function onSuccess(imageURI) {
          var image = document.getElementById('preview');
          image.src = imageURI;
      }
      
      function onFail(message) {
          alert('Failed because: ' + message);
      }
  });    
  $("#location").click(function(){        
      var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
      };
  
      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }
  
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });   
});

function initTimeline(event) {
  
      var url = "http://psupin.azurewebsites.net/pins";
      $.get(url, function (data) {
          $("#timetab").attr("badge", data.length);
          $.each(data, function (index, item) {
              $.get('card.html', function (template) {
                  var rendered = Mustache.render(template, item);
                  $("#pins").append(rendered);
              });
          });
      });
  }
  window.fn = {};
  
  window.fn.open = function() {
    var menu = document.getElementById('menu');
    menu.open();
  };
  
  window.fn.load = function(page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
      .then(menu.close.bind(menu));
  };
  
  function goBack() {
      history.go(0);
  }