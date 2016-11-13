chrome.browserAction.onClicked.addListener(function(tab) {
	if (tab) {
        sendDatMessage(true, tab);
	}
});

var isVerified = false;

chrome.runtime.onMessage.addListener(function(req, sender, response) {
    response(isVerified);
});

function sendDatMessage(isFirstAttempt, tab) {
    var facebook = "https://www.facebook.com/";
    var gmail = "https://accounts.google.com/";
    console.log('is verified', isVerified);
    chrome.tabs.sendMessage(tab.id, { isVerified: isVerified, isFirstAttempt: isFirstAttempt }, function(response) {
        if (response.recognized !== null) {
            if (response.recognized === true) { // face recognized
                isVerified = true;

                chrome.tabs.create({ url: facebook }, function(tab) {
                })

                chrome.tabs.create({ url: gmail }, function(tab) {
                })
            } else {
                sendDatMessage(false, tab);
            }
        }
        if (response.signedOut !== null) {
            if (response.signedOut === true) {
                isVerified = false;
            }
        }
    })
}
