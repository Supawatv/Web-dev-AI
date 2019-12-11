cur_predict = [];
update_focus("off");

// Teachable Machine Backend
const canvas = document.getElementById("defaultCanvas0");

setTimeout(function() {
	setConstant();
}, 500);

function setConstant() {
	init();
}



async function init() {
	const video = document.getElementById("debugger")
	console.log("running init...")
	const modelURL = "model.json";
	const metadataURL = "metadata.json";

	update_modal("Loading AI please wait...")
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();
	check_ai();
	update_modal(
		"AI is loaded. Click and drag to draw in the: ");
	update_overlay("off");
}



async function loop() {
	console.log("loop entered...");
	await predict();
	window.requestAnimationFrame(loop);
}


// Check Teachable machine for prediction; return prediction
async function check_ai() {
	results = await model.predict(document.getElementById(
		"defaultCanvas0"))

	// Sort Results
	byProb = results;
	byProb.sort(function(a, b) {
		return b.probability.toFixed(2) - a.probability.toFixed(2);
	});
	cur_predict = byProb;
	return byProb;
}

// FrontEnd

// Main Update after mouse released
async function update_prediction() {
	modal_class = document.getElementById("predict_class");
	await check_ai();
	result = cur_predict;

	top_result = result[0].className;
	// Update UI
	modal_class.innerHTML = top_result;
	update_code(top_result);
	update_mini(top_result);
}


function update_modal(str) {
	modal_class = document.getElementById("predict_class");
	modal_class.innerHTML = str;

}


function update_code(top_predict) {
	// Select element
	HTML_code = "codes/" + top_predict + "_html.txt";
	CSS_code = "codes/" + top_predict + "_css.txt";

	// Assign the right code
	$(document).ready(function() {
		$("#HTML_code").load(HTML_code);
		$("#CSS_code").load(CSS_code);
	});
}


function update_overlay(state) {
	if (state == "on") {
		$(document).ready(function() {
			$("#overlay").fadeIn();
		});
	} else if (state == "off") {
		$(document).ready(function() {
			$("#overlay").fadeOut();
		});
	}
}

function update_focus(state) {
	if (state == "on") {
		$(document).ready(function() {
			$("#overlay2").fadeIn();
		});
	} else if (state == "off") {
		$(document).ready(function() {
			$("#overlay2").fadeOut();
		});
	}
}


function update_mini(top_predict) {
	str = "icons/" + top_predict + ".png"
	$(document).ready(function() {
		$("#mini").attr("src", str);
	});

}