;(function(){
	var canvas = document.querySelector( 'canvas' )
		, ctx = canvas.getContext( '2d' );

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	var howManyCircles = 10, circles = [];

	var scenario = {
		populateCircles : function(){
			for ( var i = 0; i < howManyCircles; i++ )  {
				circles.push( [Math.random() * canvas.width, Math.random() * canvas.height, 
					Math.random() * 100, Math.random() / 2] );
			}
		}, 

		moveCircles : function(deltaY){
			for ( var i = 0; i < howManyCircles; i++ ) {
				if ( circles[i][1] - circles[i][2] > canvas.height ) {
					circles[i][0] = Math.random() * canvas.width;
       				circles[i][2] = Math.random() * 100;
       				circles[i][1] = 0 - circles[i][2];
       				circles[i][3] = Math.random() / 2;
				} else {
					circles[i][1] += deltaY;
	    		}
	    	}
		},

		drawCircles : function(){
			for ( var i = 0; i < howManyCircles; i++ ) {
				ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
				ctx.beginPath();
				ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
			}
		},

		clear : function(){
			canvas.width = canvas.width;
		}
	}

	img = {
		load : function(src){
			var img = new Image();
			img.src = src || 'img/goku_243x386.png';

			return img;
		},

		draw : function(img) {
			ctx.drawImage(img, 480, canvas.height - 388)
		},
	}

	function Sphere(){
		this.x = 605;
		this.y = (canvas.height - 300);
		this.radius = 20;
	}

	Sphere.prototype.update = function(){
		this.radius += 1;
	}

	Sphere.prototype.draw = function(){
		var r = Math.round(Math.random()*255)
			, g = Math.round(Math.random()*255)
			, b = Math.round(Math.random()*255);

		ctx.globalCompositeOperation = "lighter";
		var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
		gradient.addColorStop(0, 'rgba('+r+','+g+','+b+',.1)');
		gradient.addColorStop(0.5, 'rgba('+r+','+g+','+b+',.9)');
		gradient.addColorStop(1, 'rgba('+r+','+g+','+b+',.1)');

		ctx.fillStyle = gradient;

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}

	// Goku's strongest power :)
	var genkidama = new Sphere();
	
	// fullfill the array with circles displayed
	// on the background
	scenario.populateCircles();
	
	setInterval(function(){
		scenario.clear();
		scenario.moveCircles(5);
		scenario.drawCircles();
		img.draw(img.load());
		genkidama.draw();
	}, 1000 / 60);
	
})();