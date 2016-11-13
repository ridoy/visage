var serverURL = 'https://fd82060c.ngrok.io';
function showPopup(callbackFunc) {
    $('#datboiContainer').remove()
    $('#datboi').remove();
    $('#browserLockButton').remove();
    $('#browserLockVid').remove();

    var datboiContainer = document.createElement('div')
	var popUp = document.createElement('div');
    var header = document.createElement('h1');
    var hr = document.createElement('hr');

    $(header).css({
        'padding': '30px 0 0',
        'margin-bottom': '15px',
        'text-align': 'center'
    });

    $(hr).css({
        'border': '0',
        'border-top': '1px solid #e2e2e2',
        'height': '0',
        'margin-left': '40px',
        'margin-right': '40px',
        'padding': '10px'
    });

    header.innerText = 'Sign In With Your Face';

	datboiContainer.setAttribute('id', 'datboiContainer');
	popUp.setAttribute('id', 'datboi');

	//$(popUp).appendTo('body');
	$(popUp).css({
		"width": '540px',
		"height": '540px',
        "border-radius": '8px',
        "margin-left": 'auto',
        "margin-right": 'auto',
        "margin-top": "40px",
		"background-color": 'rgb(251, 251, 251)'
	});

	var captureButton = document.createElement('button');
	captureButton.setAttribute('id', 'browserLockButton');
	captureButton.innerHTML = "Capture";
    $(captureButton).css({
        'border-radius': '8px',
        'background-color': '#7bb9ef',
        'padding': '15px',
        'margin-top': '15px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'width': '100px',
        'display': 'block',
        'color': 'white',
        'font-size': '15px',
        'font-weight':'900'
    });

	var video = document.createElement("video");
	video.setAttribute('id', 'browserLockVid');
	video.setAttribute('autoplay', 'true');
    navigator.getUserMedia({video: true}, handleVideo, videoError);

    var text = document.createElement('p');
	function handleVideo(stream) {
		console.log('dat boi boiii');
	    video.src = window.URL.createObjectURL(stream);

        popUp.appendChild(header);
        popUp.appendChild(hr);
    	popUp.appendChild(video);
        popUp.appendChild(captureButton);
        popUp.appendChild(text);
        datboiContainer.appendChild(popUp);
        $(datboiContainer).css({
            'width': '100%',
            'height': '100%',
            'background-color': 'rgba(0,0,0,0.5)',
            'z-index': '137193',
            'position': 'fixed'
        });
        firstChild = document.body.childNodes[0]
		document.body.insertBefore(datboiContainer, firstChild);
	}

	function videoError(e) {
	    console.log('error lol ' + e);
	}

	$(video).css({
        "width": '480',
		"height": '360',
        'display': 'block',
        'margin-left': 'auto',
        'margin-right': 'auto',
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
