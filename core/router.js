var fs = require('vow-fs'),
    config = require('../.config.json'),
    getVoice = require('get-voice');

function Router() {}

Router.prototype.index = function(req, res) {
    res.render('index');
}

Router.prototype.say = function(req, res) {
    var q = req.query,
        file = q.title + '.mp3';

    console.log('\n[say]', q.title + ':', q.text);

    getVoice(q.text, q.l || 'ru', function(err, buf){
        if(err) {
            console.log('ERROR', err);
        } else {
            console.log('write to', file);
            // write audio to mp3
            fs.write('./' + config.staticDir + '/posts/' + file, buf)
                .then(function() {
                    console.log('   ===> saved to', file);
                    // open file in browser
                    res.send(/posts/ + file);
                });
        }
    });
}

module.exports = new Router();
