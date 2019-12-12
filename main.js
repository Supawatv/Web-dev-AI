// Supawat Vitoorapakorn
// Teachable Machine Back End + GUI

cur_predict = [];
update_focus("off");


// Teachable Machine Backend --- 
const canvas = document.getElementById("defaultCanvas0");

setTimeout(function() {
	setConstant();
}, 500);

// Delay teachleable machine from connecting
// with p5js to prevent error
function setConstant() {
	init();
}

// Initialize teachable machine backend
async function init() {
	const video = document.getElementById("debugger")
	console.log("running init...")
	const ModelURL = "model.json";
	const metadataURL = "metadata.json";
	update_modal("Loading AI please wait...")

	// Wait for Model to load
	Model = await tmImage.load(ModelURL, metadataURL);
	maxPredictions = Model.getTotalClasses();

	// Make a prediction and update modal
	check_ai();
	update_modal(
		"AI is loaded. Click and drag to draw in the: ");
	// Turn off splash loading screen
	update_overlay("off");
}



// Check Teachable machine for prediction; return prediction
async function check_ai() {
	// Predict visually from HTML element
	results = await Model.predict(document.getElementById(
		"defaultCanvas0"))
	// Sort Results by probability
	byProb = results;
	byProb.sort(function(a, b) {
		return b.probability.toFixed(2) - a.probability.toFixed(2);
	});
	cur_predict = byProb;
	return byProb;
}

// FrontEnd ---

// Main Update after mouse released
async function update_prediction() {
	modal_class = document.getElementById("predict_class");
	await check_ai();
	result = cur_predict;
	top_result = result[0].className;
	// Update UI
	modal_class.innerHTML = "I see " + top_result;
	update_code(top_result);
	update_mini(top_result);
}

// General function to change Model
function update_modal(Str) {
	modal_class = document.getElementById("predict_class");
	modal_class.innerHTML = Str;

}

// Updates corresponding HTML and CSS
// based on the top prediction
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


// Initial splash screen to load AI
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

// Black overlay when user exceeds 4 rectangle
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

// Update prediction icon on the bottom modal
function update_mini(top_predict) {
	Str = "icons/" + top_predict + ".png"
	$(document).ready(function() {
		$("#mini").attr("src", Str);
	});
}

// Add mini map onto top bar
function update_suggest_add() {
	// Don't show anything if empty
	if (cur_predict[0].className == "empty") {
		return
	}

	// If mobile shorten list to 4 predictions
	if (is_mobile() == true) {
		cur_predict.length = 5;
	}

	for (i in cur_predict) {
		className = cur_predict[i].className;

		// Skip if prediction is empty
		if (className == "empty") {
			continue;
		}
		img_path = "icons/" + className + ".png";
		index = "s" + i;
		elem = '<img class="suggest" id="_ID_" src="_SRC_" />';
		elem = elem.replace("_ID_", index);
		elem = elem.replace("_SRC_", img_path);
		$(document).each(function(i) {
			$("#bar").append(elem);
		});
	}
	// Delete first suggest as to not repeat
	$(document).ready(function() {
		$("#s0").remove();
	});
}


function update_suggest_remove() {
	$(document).ready(function() {
		$(".suggest").remove();
	});
}

// Cleans up top bar
function update_suggest() {
	update_suggest_add();
	update_suggest_remove();
}

// General funciton for updating UI
function update_UI(id, Str) {
	document.getElementById(id).innerHTML = Str;
}

// Bind even listener to reset text
$("#modal2").on("click", function() {
	setup();
	update_suggest_remove();
	update_prediction();
});