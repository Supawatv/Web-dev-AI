console.log("fuck this shit");
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
	const ModelURL = "model.json";
	const metadataURL = "metadata.json";

	Model = await tmImage.load(ModelURL, metadataURL);
	maxPredictions = Model.getTotalClasses();
	console.log("init ran...entering loop");
	window.requestAnimationFrame(loop);


	labelContainer = document.getElementById("label-container");
	for (let i = 0; i < maxPredictions; i++) { // and class labels
		labelContainer.appendChild(document.createElement("div"))
	};
}



async function loop() {
	console.log("loop entered...");
	await predict();
	window.requestAnimationFrame(loop);
}

async function predict() {
	// predict can take in an image, video or canvas html element
	const prediction = await Model.predict(canvas, false);
	for (let i = 0; i < maxPredictions; i++) {
		const classPrediction =
			prediction[i].className + ": " + prediction[i].probability.toFixed(
				2);
		labelContainer.childNodes[i].innerHTML = classPrediction;
		console.log(classPrediction);
	}
}


// function mouseUp() {
// 	console.log("mouseup")
// 	a = Model.predict(document.getElementById("defaultCanvas0"))
// 	console.log(a);
// }