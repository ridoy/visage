// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


chrome.browserAction.onClicked.addListener(function(tab) {
	if (tab) {
		var facebook = "https://www.facebook.com/";
		//var twitter = "https://twitter.com/login/";
		var gmail = "https://gmail.com/";
		chrome.tabs.sendMessage(tab.id, {}, function() {

			chrome.tabs.create({ url: facebook }, function(tab) {
			})

			//var openTwitter = chrome.tabs.create({ url: twitter }, function(tab) {
			//})

			chrome.tabs.create({ url: gmail }, function(tab) {
			})
		})
	}
});