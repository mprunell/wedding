
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
app.set('port', process.env.PORT || 80);
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

app.get('/*', function(req, res, next) {
    var fakeIPPattern = /^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/;
    if (req.headers.host.match(fakeIPPattern) !== null) {
        next();
    } else if (req.headers.host.match(/^www/) === null ) {
        res.redirect('http://www.' + req.headers.host + req.url);
    } else {
        next();
    }
})

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

function generate_xml_sitemap() {
    var root_path = 'http://www.lorenayandres.com/';
    urls = [''];
    var priority = 0.5;
    var freq = 'monthly';
    var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for (var i in urls) {
        xml += '<url>';
        xml += '<loc>'+ root_path + urls[i] + '</loc>';
        xml += '<changefreq>'+ freq +'</changefreq>';
        xml += '<priority>'+ priority +'</priority>';
        xml += '</url>';
        i++;
    }
    xml += '</urlset>';
    return xml;
}
app.get('/sitemap.xml', function(req, res) {
    var sitemap = generate_xml_sitemap();
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
