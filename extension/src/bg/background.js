chrome.browserAction.onClicked.addListener(function(tab) {
	if (tab) {
        sendDatMessage(tab);
	}
});

var isVerified = false;

chrome.runtime.onMessage.addListener(function(req, sender, response) {
    response(isVerified);
});

function sendDatMessage(tab) {
    var facebook = "https://www.facebook.com/";
    var gmail = "https://gmail.com/";
    chrome.tabs.sendMessage(tab.id, {}, function(serverResponse) {
        if (serverResponse === true) { // face recognized
            isVerified = true;

            chrome.tabs.create({ url: facebook }, function(tab) {
            })

            chrome.tabs.create({ url: gmail }, function(tab) {
            })
        } else {
            sendDatMessage(tab);
        }
    })
}
