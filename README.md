timerjs
=======

## usage

    var t = timer(function() { console.log('waited 10 seconds') });
    t.interval(10000);
    $('a').eq(0).click(function() { t.pause(); });
    $('a').eq(1).click(function() { t.resume(); });
    $('a').eq(2).click(function() {
        if (t.isPaused())
            console.log('t is paused');
        else if (t.isRunning()) {
            if (t.type() === 'interval')
                console.log('t is running on an interval');
            else if (t.type() === 'timeout')
                console.log('t is running on a timeout');
        }
    });
    var t2 = timer(function() { console.log('will wait for 6 seconds'); }).timeout(6000);
