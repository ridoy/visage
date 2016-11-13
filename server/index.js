var express = require('express');
var shell = require('python-shell');
var fs = require('fs');
var multer = require('multer');
var upload = multer().single('file');
var app = express();
var uuid = require('node-uuid');

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
        f = fs.createWriteStream('uploads/' + name + '.png');

        f.write(req.file.buffer, function(err, info) {
            if(err) { 
                console.log(err); 
                return;
            }
            var options = {
                args: [name]
            };  
            shell.run('script.py', options, function(err, analysis) {
                console.log(parseInt(analysis[0]));
                res.send(analysis[0] === 35);
            });
        });      
    }); 
});

app.use(function(err, req, res, next) {
    res.status(500);
    console.log(err);
    res.end("Error handling your request");
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})
