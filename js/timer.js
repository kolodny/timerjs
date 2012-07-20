(function() {
	var allTimers = [];
	var timer = function(func, d) {
		var timerId, end, _type, timeLeft = 0, delay, resumed, _finished;
		
		debugger
		
		var ret = {
			timeout: function(_delay) {
				delay = _delay || d;
				
				_finished = false;
				end = now() + delay;
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
				end = now() + delay;
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
						end = now() + timeLeft;
					} else {
						timerId = setTimeout(function() {
							func();
							timerId = setInterval(func, delay);
							_type = 'interval';
						}, timeLeft);
						_type = 'intervalFragment';
						end = now() + timeLeft;
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
			now: function(randomly) {
				if (randomly) {
					func();
				} else if (!timerId && timeLeft) {
					// paused
					func();
					timeLeft = _type === 'timeout' ? 0 : delay;
				} else if (timerId) {
					// running
					func();
					(_type === 'interval' ? clearInterval : clearTimeout)(timerId);
					if (_type !== 'timeout') {
						timerId = setInterval(func, delay);
						end = now() + delay;
					} else {
						_finished = true;
						timerId = 0;
					}
				} else {
					// it's already finished
				}
				return this;
			},
			reset: function() {
				if (this.isFinished())
					return this;
				
				var wasPaused = this.isPaused();
				
				this.pause();
				timeLeft = delay;
				if (wasPaused)
					this.resume();
				
				return this;
			},
			stop: function() {
				this.pause().reset();
			},
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
		};
		
		allTimers.push(ret);
		return ret;
		
		function now() { return +new Date(); }
	};
	timer.all = {
		pause: function() {
			for (var i = 0; i < allTimers.length; i++)
				allTimers[i].pause();
		},
		stop: function() {
			for (var i = 0; i < allTimers.length; i++)
				allTimers[i].stop();
		},
		reset: function() {
			for (var i = 0; i < allTimers.length; i++)
				allTimers[i].reset();
		}
	}
	window.timer = timer;
})();