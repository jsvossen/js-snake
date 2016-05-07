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
	}
};

var snake = {
	facing: "e",
	body: [[19,19],[18,19],[17,19]],
	speed: 200,
	render: function() {
		for (i=0; i<this.body.length; i++) {
			var x = this.body[i][0];
			var y = this.body[i][1];
			var segment = (i == 0) ? 'head' : 'tail';
			$('.cell[data-coord="'+x+'-'+y+'"]').html('<div class="snake '+segment+'"></div>');
		}
	},
	move: function() {
		var head = this.body[0];
		var vacated = [head[0],head[1]]
		switch(this.facing) {
			case "n":
				if (head[1] > 0) {
					head[1]--;
				}
				break;
			case "s":
				if (head[1] < grid.height-1) {
					head[1]++;
				}
				break;
			case "e":
				if (head[0] < grid.width-1) {
					head[0]++;
				}
				break;
			case "w":
				if (head[0] > 0) {
					head[0]--;
				}
				break;
		}
		for (i=1; i<this.body.length; i++) {
			var current = [this.body[i][0],this.body[i][1]];
			this.body[i] = vacated;
			vacated = current;
		}
		$('.snake').remove();
		this.render();
	}
};

$(document).keydown(function(event){
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

var playTimer = setInterval(snake.move.bind(snake), snake.speed);