var config = require('../.config.json'),
    CronJob = require('cron').CronJob;

// remove temorary audio files by cron
new CronJob({
    cronTime: config.clearCronTime,
    onTick: function() {
        fs.remove('posts/*.mp3');
    }
});
