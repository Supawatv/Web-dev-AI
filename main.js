cur_predict = [];

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

	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();
	check_ai()
	console.log("init ran...entering loop");
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
	console.log('by p:');
	console.log(byProb);

	cur_predict = byProb;
	return byProb;
}

// FrontEnd
function update_prediction() {
	modal_class = document.getElementById("predict_class")
	console.log("using new method")
	check_ai();
	result = cur_predict;
	modal_class.innerHTML = result[0].className;
}