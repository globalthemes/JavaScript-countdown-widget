(function() {

		//calculate remaining time
		function getTimeRemaining(endtime){
		  var t = Date.parse(endtime) - Date.parse(new Date());
		  var seconds = Math.floor( (t/1000) % 60 );
		  var minutes = Math.floor( (t/1000/60) % 60 );
		  var hours = Math.floor( (t/(1000*60*60)) % 24 );
		  var days = Math.floor( t/(1000*60*60*24) );
		  return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		  };
		}
		//count down and change elements of the counter DIV
		function countDown (id, endtime){
		  var clock = document.getElementById(id);
		  var daysBox = clock.querySelector('.days');
		  var hoursBox = clock.querySelector('.hours');
		  var minutesBox = clock.querySelector('.minutes');
		  var secondsBox = clock.querySelector('.seconds');		  
		  var timeinterval = setInterval(function(){
		  var t = getTimeRemaining(endtime);
		  
			daysBox.innerHTML = t.days;
			hoursBox.innerHTML = t.hours;
			minutesBox.innerHTML = ('0' + t.minutes).slice(-2);
			secondsBox.innerHTML = ('0' + t.seconds).slice(-2);
			
			//display if counter ready
			clock.style.display = 'block';

			if(t.total<=0){
			  clearInterval(timeinterval);
			  alert('Finished');

			}
		  },1000);
		}
		//add styles to header 
		function initializeStyle(background, color, i) {
			var x = document.createElement("STYLE");
			var t = document.createTextNode(".countdown-" + i + " {margin:auto;max-width:570px;color:" + color + ";}" + 
											".countdown-header-" + i + " {font-size:18px;font-weight:900; margin:0px;padding-left:10px;}" + 
											".countdown-container-" + i + " {float:left;}" + 
											".countdown-box-" + i + " {float:left;margin:20px 10px 20px 10px;padding:10px;text-align:center;width:100px;background-color:" + background + ";border:1px solid " + color + ";}" + 
											".countdown-box-" + i + " .countdown-value-" + i + " {font-size:32px;font-weight:900;padding-top:10%;margin: 0px;}" + 
											".countdown-box-" + i + " .countdown-text-" + i + " {font-size:18px;margin: 0px;padding:10px 0px 10px 0px;}" + 
											"@media screen and (max-width: 590px) {.countdown{max-width: 290px;}");
			x.appendChild(t);
			document.head.appendChild(x);
		}
		//create html content 
		function initializeClock(id, deadline, i){
		   
		   var clock = document.getElementById(id);
			clock.innerHTML ='<div class="countdown-' + i + '">' + '<p class="countdown-header-' + i + '">Days to: ' + deadline + '</p> <div class="countdown-container-' + i + '">' + 
							'<div class="countdown-box-' + i + '"><p class="countdown-value-' + i + ' days"></p><p class="countdown-text-' + i + '">Days</p></div>' + 
							'<div class="countdown-box-' + i + '"><p class="countdown-value-' + i + ' hours"></p><p class="countdown-text-' + i + '">Hours</p></div>' + 
							'</div><div class="countdown-container-' + i + '">' + 
							'<div class="countdown-box-' + i + '"><p class="countdown-value-' + i + ' minutes"></p><p class="countdown-text-' + i + '">Minutes</p></div>' + 
							'<div class="countdown-box-' + i + '"><p class="countdown-value-' + i + ' seconds"></p><p class="countdown-text-' + i + '">Seconds</p></div>' +
							'</div></div>';
			clock.style.display = 'none';				
		}
	//run if document is loaded	
	document.addEventListener('DOMContentLoaded', function() {
		
		var widget = document.querySelectorAll('.ness-countdown');
		var widgetid;
		var deadline;
		var background;
		var color;
		
		for (i = 0; i < widget.length; i++) {
			widgetid= widget[i].id;
			//pick deadline from element	
			deadline = document.getElementById(widgetid).getAttribute("count-to");
			if(!deadline || !Date.parse(deadline)) {
				deadline = "Please set correct deadline in format 'YYYY-MM-DD' OR 'YYYY/MM/DD'";
				}
			//pick background color from element	
			background = document.getElementById(widgetid).getAttribute("counter-background");
			if(!background) {
				background = "transparent";
				}
				else {background = background.replace("#", "");	
					  background = "#" + background;}
			//pick color from element	
			color = document.getElementById(widgetid).getAttribute("counter-color");
			if(!color) {
				color = "#000000";
				}	
				else {color = color.replace("#", "");
					  color = "#" + color;
					  }
			//push styles to header	
			initializeStyle(background, color, i);	
			//print out counter HTML
			initializeClock(widgetid, deadline, i);
			//counting down...
			countDown(widgetid, deadline);			
		}
		
	}, false);


})();


