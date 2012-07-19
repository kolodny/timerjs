<!DOCTYPE HTML>
<html>
	<head>
		<title>timerjs</title>
		<script type="text/javascript" src="js/timer.js"></script>
		<style type="text/css">div pre { position: relative; display: inline; left: 10px; }</style>
	</head>
	<body>
		<div id="status" style="position: relative; float: right; height: 200px; width: 200px; border: 1px solid black; right: 100px;">
			<div><span>t1.remaining()</span><pre></pre></div>
			<div><span>t1.elapsed()</span><pre></pre></div>
			<div><span>t1.type()</span><pre></pre></div>
			<div><span>t1.isRunning()</span><pre></pre></div>
			<div><span>t1.isPaused()</span><pre></pre></div>
			<div><span>t1.isFinished()</span><pre></pre></div>
		</div>
		<a href="#"><pre>window.t1 = timer(function() { console.log('t1 in 3 seconds') }).timeout(3000);</pre></a>
		<a href="#"><pre>window.t1 = timer(function() { console.log('t1 in 3 seconds') }).interval(3000);</pre></a>
		<a href="#"><pre>t1.pause();</pre></a>
		<a href="#"><pre>t1.resume();</pre></a>
		
		
		
		
		
		<script type="text/javascript">
			var links = document.getElementsByTagName('a'), length = links.length, i = 0,
				divs = document.getElementById('status').getElementsByTagName('div');
			
			for (; i < length; i++) {
				(function(i) {
					links[i].onclick = function() { 
						eval(links[i].firstChild.innerHTML);
						return false;
					}
				})(i);
			}
			
			setInterval( function() {
				if (typeof t1 === 'undefined') return;
				for (i = 0; i < divs.length; i++) {
					divs[i].firstChild.nextSibling.innerHTML = eval(divs[i].firstChild.innerHTML);
				}
			}, 13);
		</script>
	</body>
</html>