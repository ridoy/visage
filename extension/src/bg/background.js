chrome.browserAction.onClicked.addListener(function(tab) {
	if (tab) {
        sendDatMessage(tab);
	}
});

function sendDatMessage(tab) {
    var facebook = "https://www.facebook.com/";
    var gmail = "https://gmail.com/";
    chrome.tabs.sendMessage(tab.id, {}, function(serverResponse) {
        if (serverResponse === true) { // face recognized

            chrome.tabs.create({ url: facebook }, function(tab) {
            })

            chrome.tabs.create({ url: gmail }, function(tab) {
            })
        } else {
            sendDatMessage(tab);
        }
    })
}
