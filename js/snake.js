var grid = {
	width: 40,
	height: 40,
	draw: function() {
		for (y=0; y < grid.height; y++) {
			var row = $('<div class="row"></div>').appendTo($("#board"));
			for (x=0; x < grid.width; x++) {
				$(row).append('<div class="cell" data-coord="'+x+'-'+y+'"></div>');
			}
		}
	}
};

var snake = {
	facing: "e",
	body: [[19,19]],
	speed: 1000,
	render: function() {
		for (i=0; i<this.body.length; i++) {
			var x = this.body[i][0];
			var y = this.body[i][1];
			var segment = (i == 0) ? 'head' : 'tail';
			$('.cell[data-coord="'+x+'-'+y+'"]').html('<div class="snake '+segment+'"></div>');
		}
	},
	move: function() {
		$('.snake').remove();
		switch(this.facing) {
			case "n":
				for (i=0; i<this.body.length; i++) {
					this.body[i][1]--;
				};
				break;
			case "s":
				for (i=0; i<this.body.length; i++) {
					this.body[i][1]++;
				};
				break;
			case "e":
				for (i=0; i<this.body.length; i++) {
					this.body[i][0]++;
				};
				break;
			case "w":
				for (i=0; i<this.body.length; i++) {
					this.body[i][0]--;
				};
				break;
		}
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

