// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

console.log('hey');

chrome.browserAction.onClicked.addListener(function(tab) {
    var newURL = "https://www.facebook.com/";
    chrome.tabs.create({ url: newURL });    
});
