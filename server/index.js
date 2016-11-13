var express = require('express');
var shell = require('python-shell');
var fs = require('fs');
var multer = require('multer');
var upload = multer().single('file');
var app = express();
var uuid = require('node-uuid');
var dotenv = require('dotenv');
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.ACCOUNT_TOKEN); 

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
                var isCorrect = parseInt(analysis[0]) === 34;
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
    client.messages.create({ 
        to: "+14016449821", 
        from: "+16318886152", 
        body: "Hey Matt – someone just tried to log in to your browser on " +  dateStr, 
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
