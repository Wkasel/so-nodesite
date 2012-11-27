var express = require('express')
	, http = require('http')
	, path = require('path')
	, less = require("less")
	, lessMiddleware = require('less-middleware');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(lessMiddleware({
    dest: __dirname + '/public/css',
    src: __dirname + '/public/css/less',
    prefix: '/css',
    compress: true
  }));

});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var server = http.createServer(app).listen(app.get('port'), function(){
  
  console.log("Express server listening on port " + app.get('port'));
});

server.listen(3000);