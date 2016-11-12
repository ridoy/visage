// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });






chrome.browserAction.onClicked.addListener(function(tab) {
    var facebook = "https://www.facebook.com/";
    //var twitter = "https://twitter.com/login/";
    var gmail = "https://gmail.com/";

    /*navigator.getUserMedia({ audio: false, video: { width: 1280, height: 720 } },
      function(stream) {
         var video = document.querySelector('video');
         video.src = window.URL.createObjectURL(stream);
         video.onloadedmetadata = function(e) {
           video.play();
         };
      },
      function(err) {
         console.log("The following error occurred: " + err.name);
      }
   );
    var openFacebook = chrome.tabs.create({ url: facebook }, function(tab) {
    })

    //var openTwitter = chrome.tabs.create({ url: twitter }, function(tab) {
    //})

    var openGmail = chrome.tabs.create({ url: gmail }, function(tab) {
    })*/
});

