var config = require('../.config.json'),
    router = require('./router.js'),
    http = require('http'),
    express = require('express'),
    app = express();

exports.app = app;

exports.start = function() {
    console.log(__dirname + '/../static');
    app
        .configure(function() {
            app
                .set('port', config.port)
                .set('views', __dirname + '/../views')
                .set('view engine', 'jade')
                .use(express.cookieParser())
                .use(express.methodOverride())
                .use(app.router)
                .use(express.static(__dirname + '/../static/'));
        });


    app.get('/', router.index);
    app.get('/say', router.say);
    app.get('*', function(req, res) {
        console.log(req.path);
    });

    // start server
    http.createServer(app).listen(config.port, function() {
        console.log('Server listening on port', config.port);
    });
};
