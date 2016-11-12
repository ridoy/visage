// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

function fillFields() {
	setTimeout(function() {
		var emailBox = document.getElementById('email');
	    emailBox.value = "mjv359@aol.com";
	}, 2000);
}

function handleError() {
	console.log('uh oh');
}

chrome.browserAction.onClicked.addListener(function(tab) {
    var newURL = "https://www.facebook.com/";
    var creating = chrome.tabs.create({ url: newURL }, function(tab) {
    	fillFields();
    })
});

