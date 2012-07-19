(function() {
	var timer = function(func, d) {
		var timerId, start, end, _type, timeLeft = 0, delay, resumed, _finished;
		
		return {
			timeout: function(_delay) {
				delay = _delay || d;
				
				_finished = false;
				start = new Date();
				end = +start + delay;
				_type = 'timeout';
				
				timerId = setTimeout(function() {
					func();
					timerId = 0;
					_finished = true;
				}, d || delay);
				return this;
			},
			interval: function(_delay) {
				delay = _delay || d;
				
				_finished = false;
				start = new Date();
				end = +start + delay;
				_type = 'interval';
				
				timerId = setInterval(func, delay);
				return this;
			},
			pause: function () {
				if (this.isRunning()) {
					(_type === 'interval' ? clearInterval : clearTimeout)(timerId);
					timerId = 0;
					
					timeLeft = (end - new Date() % delay + delay)  % delay;
				}
				return this;
			},
			resume: function() {
//				debugger
				if (this.isPaused()) {
					if (_type === 'timeout') {
						timerId = setTimeout(function() {
							func();
							timerId = 0;
							_finished = true;
						}, timeLeft);
						start = new Date();
						end = +start + timeLeft;
					} else {
						timerId = setTimeout(function() {
							func();
							timerId = setInterval(func, delay);
							_type = 'interval';
						}, timeLeft);
						_type = 'intervalFragment';
						start = new Date();
						end = +start + timeLeft;
					}				}
				return this;
			},
//			add: function(ms) {
//				if (this.isRunning()) {
//					this.pause();
//					timerId = (_type === 'interval' ? setInterval : setTimeout)(func, timeLeft + ms);
//				} else {
//					timeLeft += ms;
//				}
//				return this;
//			},
			remaining: function() {
				return (timerId) ?
					(end - new Date() % delay + delay)  % delay :
					_finished ? 
						undefined : 
						timeLeft ;
			},
			elapsed: function() { 
				return timerId ?
					delay - ((end - new Date() % delay + delay)  % delay) :
					_finished ?
						undefined :
						delay - timeLeft ;
				},
			type: function() {return _type === 'timeout' ? 'timeout' : 'interval'},
			isRunning: function() {return !!timerId;},
			isPaused: function() {return !timerId && !!timeLeft;},
			isFinished: function() {return !!_finished;}
		}
	};
	window.timer = timer;
})();