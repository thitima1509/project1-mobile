///geolocation plugIn/camera
ons.ready(function() {
    // deviceready event is fired
    // Call whatever Cordova APIs

    $("#takephoto").click(function(){        
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
   

    $("#scan").click(function(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera : true, // iOS and Android 
                showFlipCameraButton : true, // iOS and Android 
                showTorchButton : true, // iOS and Android 
                torchOn: true, // Android, launch with the torch switched on (if available) 
                saveHistory: true, // Android, save scan history (default false) 
                prompt : "Place a barcode inside the scan area", // Android 
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
                formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
                orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
                disableAnimations : true, // iOS 
                disableSuccessBeep: false // iOS 
            }
         );
    });
});

//Register ---
function handSignUp(){
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    if(email.length<4){
    alert("กรุณาป้อน Email ให้ถูกต้อง");
    return;
    }
    if(password.length<4){
    alert("กรุณาป้อน Password มากกว่า 4 ตัว");
    return;
    }
    
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){alert('Registration Successfully'); location="index.html" })
    .catch(function(error) {
    
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
     
  

        
        if(errorCode == 'auth/weak-password'){ //this condition not working
            alert("The password is too weak");
          }else {
            alert(errorMessage);
            
        }
        console.log(error);
      });
    
    }
    //End Register ---
    
    //login with facebook
    

function loginWithEmail(){
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
               //login with email


              firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
               
        if(errorCode == 'auth/weak-password'){ //this condition not working
            alert("The password is too weak");
          }else {
            alert(errorMessage);
            
        }
        console.log(error);
      });
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          alert(isAnonymous);
          alert(uid);
          // ...
        } else {
          // User is signed out.
          alert("By!!")
          // ...
        }
        // ...
      });
}
    ////--------$(function () {

    firebase.initializeApp({
      apiKey: "AIzaSyBvbVfCeSUHx4Nag-D5tTMlRjKoh0lWzxU",
      authDomain: "repairman-d41d3.firebaseapp.com",
      projectId: "repairman-d41d3",

   
  });

  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

  $('#save').click(function () {

      var username = $('#username').val();
      var fullname = $('#fullname').val();
      var mobileno = $('#mobileno').val();

      db.collection("users").add({
          username: username,
          fullname: fullname,
          mobileno: mobileno
      })
          .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);                

              $('#tablebody').empty();

              db.collection("users").get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {

                      console.log(doc.id, " => ", doc.data());
                      var username = doc.username;
                      var fullname = doc.fullname;
                      var mobileno = doc.mobileno;

                      var row = "<tr>" +
                      "<th scope='row'>" + doc.id + "</th>" +
                      "<td>" + doc.data().username + "</td>" +
                      "<td>" + doc.data().fullname + "</td>" +
                      "<td>" + doc.data().mobileno + "</td>" +
                      "</tr>"

                      $('#tablebody').append(row);

                  });
              });
          
          })
          .catch(function (error) {
              console.error("Error adding document: ", error);
          });

  });
  




  document.addEventListener('init', function(event) {
    var page = event.target;
    if (page.id == "home-page") {
      var stories = page.querySelector('#stories');
      generateStoryBubbles(stories);
    }
  });
  //The show event listener does the same thing as the one above but on the search page when it's shown.
  document.addEventListener('show', function(event) {
    var page = event.target;
    if (page.id == "search-page") {
      var channels = page.querySelector('#channels');
      generateStoryBubbles(channels);
    }
  });
  /*
  * This function is used to toggle the grid/list display of the posts in the profile page as well as
  * change the color of the buttons to show which is the current view.
  */
  function display(id) {
    document.getElementById("list").style.color="#1f1f21";
    document.getElementById("grid").style.color="#1f1f21";
    document.getElementById(id).style.color="#5fb4f4";
    document.getElementById("list_view").style.display="none";
    document.getElementById("grid_view").style.display="none";
    document.getElementById(id+"_view").style.display="block";
  }
  //The generateStoryBubbles function is used to create the carousel items be used as stories by the upper two events.
  function generateStoryBubbles(element) {
    for(var i=0; i<9; i++) {
      element.appendChild(ons.createElement(
        '<ons-carousel-item>' +
          '<div class="story">' +
          '<div class="story-thumbnail-wraper unread"><img class="story-thumbnail" src="assets/img/profile-image-0' + (i+1) + '.png" onclick="readStory(this)"></div>' +
          '<p>david_graham</p>' +
          '</div>' +
        '</ons-carousel-item>'
      ));
    }
  }
  //The Like function is used to make the white heart appear in front of the picture as well as make the like button into a red heart and vice versa.
  var like = function(num) {
    if (document.getElementById("button-post-like-"+num).classList.contains("like")) {
      document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart","like");
      document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart-outline");
    } else {
      document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart-outline");
      document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart","like");
      document.getElementById("post-like-"+num).style.opacity = 1;
      setTimeout(function(){
        document.getElementById("post-like-"+num).style.opacity = 0;
      }, 600);
    }
  }
  //The readStory function is used to change the red circle around a new story into grey after tapping on the new storry (thus reading it)
  var readStory = function(event) {
    event.parentNode.classList.remove("unread");
    event.parentNode.classList.add("read");
  }

  var provider = new firebase.auth.FacebookAuthProvider();
  function loginFacebook(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result);
      //Do something when login complete
    }).catch(function(error) {
      //Do something when error
      console.log(error);
    });
}