var express = require('express');
var shell = require('python-shell');
var fs = require('fs');
var multer = require('multer');
var upload = multer().single('file');
var app = express();
var uuid = require('node-uuid');
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.ACCOUNT_TOKEN); 

app.set('port', (process.env.PORT || 8080))
app.use(express.static('uploads'))

app.get('/', function(req, res) {
    res.send("This still works");
});

var latestImage = '';

app.post('/upload', function(req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var name = uuid.v1();
        f = fs.createWriteStream('./uploads/' + name + '.png');

        f.write(req.file.buffer, function(err, info) {
            if(err) { 
                console.log(err); 
                return;
            }
            var options = {
                args: ['./uploads/' + name + '.png']
            };  

            latestImage = name + '.png';
            console.log(options);
            shell.run('script.py', options, function(err, analysis) {
                console.log(analysis);
                var isCorrect = (parseInt(analysis[0]) === 32);
                console.log(isCorrect);
                if (!isCorrect) {
                    sendTwilioText();
                }
                res.send(isCorrect);
            });
        });      
    }); 
});

function sendTwilioText() {
    var date = new Date();
    date.setTime(Date.now());
    var dateStr = date.toUTCString();
    var str = "Hey Matt, someone just tried to log in to your browser on " + dateStr;
    client.messages.create({ 
        to: "+14016449821", 
        from: process.env.TWILIO_PHONE,
        body: str,
        mediaUrl: 'http://fd82060c.ngrok.io/' + latestImage
    }, function(err, message) { 
        console.log(err);
        console.log(message); 
    });
}

app.use(function(err, req, res, next) {
    res.status(500);
    console.log(err);
    res.end("Error handling your request");
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})
