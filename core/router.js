var fs = require('vow-fs'),
    getVoice = require('get-voice');

function Router() {}

Router.prototype.index = function(req, res) {
    res.render('index');
}

Router.prototype.say = function(req, res) {
    var q = req.query,
        file = '/posts/'+q.title+'.mp3';

    console.log('\n[say]', q.title+':', q.text);

    getVoice(q.text, function(err, buf){
        if(err) {
            console.log('ERROR', err);
        } else {
            // write audio to mp3
            fs.write('.'+file, buf)
                .then(function() {
                    console.log('   ===> saved to', file);
                    // open file in browser
                    res.redirect(file);
                });
        }
    });
}

module.exports = new Router();
