$(function() {

    var form = $('.voice'),
        player = $('.player');

    form.on('submit', function() {
        $.get('/say', form.serialize(), function(data) {
            console.log(data);
            player.html('<source src=' +data+ ' type="audio/mpeg">');
        })
        return false;
    });

});
