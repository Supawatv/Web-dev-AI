//setup = intro: Click and drag to add an item in your container
// error1 = You may only add 4 items to your container

children = [];
create_X = 0;
create_Y = 0;
max_child = 4;

function setup() {
	children = [];
	var myCanvas = createCanvas(450, 450);
	myCanvas.parent('draw');
	draw_div();
	print("setup")
}

function draw() {
	render();
}

function mousePressed() {
	create_X = mouseX;
	create_Y = mouseY;


}

function mouseDragged() {
	if (children.length < max_child) {
		draw_div();
		rect(create_X, create_Y, mouseX - create_X, mouseY - create_Y)
	} else {
		print("error1")
	}
}

function mouseReleased() {
	draw_div();
	if (children.length < max_child) {
		create_child(create_X, create_Y, mouseX - create_X, mouseY -
			create_Y)
		render();
	}



}



function create_child(x, y, w, h) {
	var child = {
		x: x,
		y: y,
		w: w,
		h: h
	}

	children.push(child);
}



function render() {
	draw_lightgray();
	for (i in children) {
		rect(children[i].x, children[i].y, children[i].w, children[i].h);
	}
}


function draw_lightgray() {
	noStroke();
	c = color("lightgray");
	fill(c);
	noStroke();
}


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


function keyTyped() {
	if (key === 'r') {
		setup();
	} else if (key === 's') {
		save();
	}
}