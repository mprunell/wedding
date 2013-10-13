
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/images', function(req, res) {
    var p = "./public/images"
    fs.readdir(p, function (err, files) {
        if (err) {
            throw err;
        }
        files.map(function(file) {
            console.log(path.join(p, file));
            return path.join(p, file);
        }).filter(function(file) {
            return fs.statSync(file).isFile();
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(files));
        res.end();
    });

});
app.get('/map', routes.map);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
