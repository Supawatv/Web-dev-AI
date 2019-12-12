// Supawat Vitoorapakorn
// Main P5js code for draw

children = [];
create_X = 0;
create_Y = 0;
max_child = 4; //determines max rectanges drawn

// Check if mobile device
function is_mobile() {
	if (windowWidth < 750) {
		return true;
	} else {
		return false;
	}
}

// Setup canvas
function setup() {
	children = [];

	// Responsive design for mobile
	if (is_mobile() == true) {
		display_ratio = .85;
		update_UI("modal2", "Tap here to reset.")
	} else {
		display_ratio = .31;
	}
	var myCanvas = createCanvas(windowWidth * display_ratio, windowWidth *
		display_ratio);
	myCanvas.parent('draw'); //attach canvas
	draw_div();
	print("setup")
}

// Ensure Responsiveness to screen size change
function windowResized() {
	setup();
	update_prediction();
}

// Update MVC view
function draw() {
	render();

}

// Controller 
function mousePressed() {
	// Records where mouse is pressed
	create_X = mouseX;
	create_Y = mouseY;
}

// Controller rectangular item
function mouseDragged() {
	if (children.length < max_child) {
		draw_div();
		rect(create_X, create_Y, mouseX - create_X, mouseY - create_Y)
	} else {
		Str =
			'Sorry. No more than 4 rectanges for now. Please reset ("R").'
		update_modal(Str);
		update_focus("on");
		return
	}
}

async function mouseReleased() {
	draw_div();
	if (children.length < max_child) {
		create_child(create_X, create_Y, mouseX - create_X, mouseY -
			create_Y)
		render();
		update_suggest_remove();
		await update_prediction();
		update_suggest_add();
	} else {
		update_focus("off");
	}

}

// inputs coordinates
// outputs objects in global array
function create_child(x, y, w, h) {
	var child = {
		x: x,
		y: y,
		w: w,
		h: h
	}
	children.push(child);
}

// View rectangle from stored array
function render() {
	draw_lightgray();
	for (i in children) {
		rect(children[i].x, children[i].y, children[i].w, children[i].h);
	}
}

// Helper function to change p5js draw
function draw_lightgray() {
	noStroke();
	c = color("lightgray");
	fill(c);
	noStroke();
}

// Draw the background
function draw_div() {
	rectMode(RADIUS);
	background("#d3d3d3");
	//   Shadow
	noStroke();
	c = color(255 * .75);
	fill(c);
	offsetX = 10;
	offsetY = 10;
	rect((width / 2) + offsetX, (height / 2) + offsetY, width * .47,
		height * .47, 5);
	// Container  
	stroke(0);
	c = color(255, 255);
	fill(c);
	rect(width / 2, height / 2, width * .47, height * .47, 5);
	rectMode(CORNER);
}

// Control
function keyTyped() {
	if (key === 'r') {
		setup();
		update_suggest_remove();
		update_prediction();
	} else if (key === 's') {
		save();
		update_prediction();
	}
}