var a;
var serverURL = 'https://fd82060c.ngrok.io';
function showPopup(callbackFunc) {
	var popUp = document.createElement('div');
	console.log(popUp);

	popUp.setAttribute('id', 'datboi');

	//$(popUp).appendTo('body');
	$(popUp).css({
		"height": '300px',
		"width": '300px',
		"background-color": 'white'
	});

	var captureButton = document.createElement('button');
	captureButton.innerHTML = "Capture";


	var video = document.createElement("video");
	video.setAttribute('autoplay', 'true');
	console.log('yooooooo');
    navigator.getUserMedia({video: true}, handleVideo, videoError);
    console.log('sup');

	function handleVideo(stream) {
		console.log('dat boi boiii');
	    video.src = window.URL.createObjectURL(stream);
	    console.log(popUp);

    	popUp.appendChild(video);
		document.body.appendChild(popUp);
		a = popUp;

	}

	function videoError(e) {
	    console.log('error lol ' + e);
	}

	$(video).css({
		"height": '300px',
		"width": '300px'
	});

	popUp.appendChild(captureButton);

	function dataURItoBlob(dataURI) {
	    var binary = atob(dataURI.split(',')[1]);
	    var array = [];
	    for(var i = 0; i < binary.length; i++) {
	        array.push(binary.charCodeAt(i));
	    }
	    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
	}

	$(captureButton).on('click', function() {
		var canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		var img = new Image();
		img.src = canvas.toDataURL();
		var formData = new FormData();
		var blob = dataURItoBlob(img.src);
		formData.append('file', blob);

		$.ajax({
			url: serverURL + '/upload',
			data: formData,
			type: 'POST',
			contentType: false,
			processData: false,
			success: function(response) {
				console.log('my dude its lit');
				callbackFunc(response);
			}
		})
	});

	// Draw popup
	// show camera window and capture button
	// Save picture when capture button is pressed
	// Sned picture (xhr request) to whichever ngrok link i give you /upload
	// Wait for response, if true, then open tabs, otherwise say
	// Don't call this yet ;)

}

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
	console.log('yooo');

	showPopup(function() {
		console.log('doggity dog!');
		sendResponse();
	});
	return true;
});
