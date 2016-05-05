var grid = {
	width: 40,
	height: 40,
	draw: function() {
		for (y=0; y < grid.height; y++) {
			var row = $('<div class="row"></div>').appendTo($("#board"));
			for (x=0; x < grid.width; x++) {
				$(row).append('<div class="cell" data-x="'+x+'" data-y="'+y+'"></div>');
			}
		}
	}
};

