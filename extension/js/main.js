// UPDATE THIS STRING to the URL on which your server is hosted
var serverURL = 'https://84b63c19.ngrok.io';

function showPopup(isVerified, isFirstAttempt, callbackFunc) {
    $('#datboiContainer').remove()
    $('#datboi').remove();
    $('#browserLockButton').remove();
    $('#browserLockVid').remove();

    if (!isVerified) {
        var datboiContainer = document.createElement('div')
        var popUp = document.createElement('div');
        var header = document.createElement('h1');
        var text = document.createElement('p');

        $(header).css({
            'padding': '30px 0 0',
            'font-size': '24px',
            'margin-bottom': '15px',
            'text-align': 'center',
            'font-family': 'Helvetica'
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
            'border-width': '0px',
            'background-color': 'rgb(129, 196, 255)',
            'padding': '15px',
            'font-family': 'Helvetica',
            'margin-top': '20px',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'width': '100px',
            'display': 'block',
            'color': 'white',
            'font-size': '15px',
            'font-weight':'900'
        });
        $(captureButton).mouseover(function() {
            $(captureButton).css('background-color', 'rgb(123, 185, 239)' );
        });
        $(captureButton).mouseout(function() {
            $(captureButton).css('background-color', 'rgb(129, 196, 255)');
        });

        var video = document.createElement("video");
        video.setAttribute('id', 'browserLockVid');
        video.setAttribute('autoplay', 'true');
        navigator.getUserMedia({video: true}, handleVideo, videoError);

        var text = document.createElement('p');
        function handleVideo(stream) {
            console.log('dat boi boiii');
            video.src = window.URL.createObjectURL(stream);
            if (!isFirstAttempt) {
                header.innerText = 'Login failed! Please try again.';
                $(header).css({
                    'color': 'rgb(255, 92, 119)',
                    'text-align': 'center'
                });
            }
            popUp.appendChild(header);
            popUp.appendChild(video);
            popUp.appendChild(captureButton);

            
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
            video.pause();
            captureButton.innerText = 'Analyzing Face...';
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
                    callbackFunc(response, null);
                }
            })
        });
    } else {
        var datboiContainer = document.createElement('div')
        var popUp = document.createElement('div');
        var header = document.createElement('h1');
        header.innerText = 'Sign out of your browser?';
        var signOutButton = document.createElement('button');
        signOutButton.setAttribute('id', 'browserLockButton');
        signOutButton.innerHTML = "Yes, Sign Me Out";
        $(signOutButton).css({
            'border-radius': '8px',
            'border-width': '0px',
            'background-color': 'rgb(129, 196, 255)',
            'font-family': 'Helvetica',
            'padding': '15px',
            'margin-top': '20px',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'width': '100px',
            'display': 'block',
            'color': 'white',
            'font-size': '15px',
            'font-weight':'900'
        });
        $(signOutButton).mouseover(function() {
            $(signOutButton).css('background-color', 'rgb(123, 185, 239)' );
        });
        $(signOutButton).mouseout(function() {
            $(signOutButton).css('background-color', 'rgb(129, 196, 255)');
        });
        $(signOutButton).on('click', function() {
            callbackFunc(null, true);
        });
    }

}

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {

	showPopup(req.isVerified, req.isFirstAttempt, function(recognized, signedOut) {
		sendResponse({
            recognized: recognized,
            signedOut: signedOut
        });
	});
	return true;
});
