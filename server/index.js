var express = require('express');
var shell = require('python-shell');
var fs = require('fs');
var multer = require('multer');
var upload = multer().single('file');
var app = express();
var uuid = require('node-uuid');
var dotenv = require('dotenv');
if (process.env.accountSid && process.env.authToken) {
    var client = require('twilio')(accountSid, authToken); 
}

app.set('port', (process.env.PORT || 8080))

app.get('/', function(req, res) {
    res.send("This still works");
});

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
            console.log(options);
            shell.run('script.py', options, function(err, analysis) {
                console.log(err);
                console.log(parseInt(analysis[0]));
                res.send(parseInt(analysis[0]) === 34);
            });
        });      
    }); 
});

function sendTwilioText() {
    cliient.messages.create({ 
        to: "+14016449821", 
        from: "+15017250604", 
        body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
        mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",  
    }, function(err, message) { 
            console.log(message.sid); 
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
