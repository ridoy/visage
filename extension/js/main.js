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
    navigator.getUserMedia({video: true}, handleVideo, videoError);

    var text = document.createElement('p');
	function handleVideo(stream) {
		console.log('dat boi boiii');
	    video.src = window.URL.createObjectURL(stream);
	    console.log(popUp);

    	popUp.appendChild(video);
        popUp.appendChild(captureButton);
        popUp.appendChild(text);
		document.body.appendChild(popUp);
	}

	function videoError(e) {
	    console.log('error lol ' + e);
	}

	$(video).css({
		"height": '300px',
		"width": '300px'
	});


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
                $(popUp).remove();
                text.innerText = response;
				console.log(response);
				callbackFunc(response);
			}
		})
	});

}

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
	console.log('yooo');

	showPopup(function(response) {
		sendResponse(response);
	});
	return true;
});
