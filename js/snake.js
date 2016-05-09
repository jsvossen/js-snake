var snakeGame = {
	init: function() {
		grid.draw();
		snake.render();
		food.render();
		game = this;
		$(document).keydown(function(event){
			if (!game.inProgress) { game.start(); game.inProgress = true; }
			switch(event.which) {
		        case 37: // left
		        	if (snake.facing != "e") { snake.facing = "w"; }
		        	break;
		        case 38: // up
		        	if (snake.facing != "s") { snake.facing = "n"; }
		        	break;
		        case 39: // right
		        	if (snake.facing != "w") { snake.facing = "e"; }
		        	break;
		        case 40: // down
		        	if (snake.facing != "n") { snake.facing = "s"; }
		        	break;
		        default: return; // exit this handler for other keys
		    }
		    event.preventDefault(); // prevent the default action (scroll / move caret)
		});
		$('.reset a').click(function(event){
			game.reset();
			event.preventDefault();
		});
	},
	reset: function() {
		this.inProgress = false;
		grid.clear();
		$('header p').toggle();
		snake.body = [[19,19],[18,19],[17,19]];
		snake.render();
		food.render();
	},
	start: function() {
		var playTimer = setInterval(function() {
			if (snake.alive()) {
				snake.move();
				if ($('.cell .food').length == 0) { food.render(); }
			} else {
				$('header p').toggle();
				clearInterval(playTimer);
			}
		}, snake.speed);
	},
	inProgress: false
};

var grid = {
	width: 40,
	height: 40,
	draw: function() {
		for (y=0; y < this.height; y++) {
			var row = $('<div class="row"></div>').appendTo($("#board"));
			for (x=0; x < this.width; x++) {
				$(row).append('<div class="cell" data-coord="'+x+'-'+y+'"></div>');
			}
		}
	},
	cellHas: function(coord,childClass) {
		return $('.cell[data-coord="'+coord[0]+'-'+coord[1]+'"]').children(childClass).length;
	},
	fillCell: function(coord,html) {
		$('.cell[data-coord="'+coord[0]+'-'+coord[1]+'"]').html(html);
	},
	clear: function() {
		$('.cell').html('');
	}
};

var snake = {
	facing: "e",
	body: [[19,19],[18,19],[17,19]],
	speed: 150,
	render: function() {
		for (i=0; i<this.body.length; i++) {
			var segment = (i == 0) ? 'head' : 'tail';
			grid.fillCell(this.body[i],'<div class="snake '+segment+'"></div>');
		}
	},
	move: function() {
		var head = this.body[0];
		var vacated = [head[0],head[1]]
		switch(this.facing) {
			case "n":
				head[1]--;
				break;
			case "s":
				head[1]++;
				break;
			case "e":
				head[0]++;
				break;
			case "w":
				head[0]--;
				break;
		}
		if (grid.cellHas(head,'.food')>0) {
			this.body.splice(1, 0, vacated);
		} else {
			for (i=1; i<this.body.length; i++) {
				var current = [this.body[i][0],this.body[i][1]];
				this.body[i] = vacated;
				vacated = current;
			}
		}
		if (this.alive()) {
			$('.snake').remove();
			this.render();
		}
	},
	alive: function() {
		var head = this.body[0];
		return !( (head[0] < 0 || head[0] > grid.width-1) || (head[1] < 0 || head[1] > grid.height-1) || grid.cellHas(head,'.snake.tail')>0 );
	}
};


var food = {
	render: function() {
		var coord = this.randomCoord();
		while (grid.cellHas(coord,$('.snake'))) {
			coord = this.randomCoord();
		}
		grid.fillCell(coord,'<div class="food"></div>');
	},
	randomCoord: function() {
		var x = Math.floor((Math.random() * grid.width));
		var y = Math.floor((Math.random() * grid.height));
		return [x,y];
	}
};