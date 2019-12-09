	const canvas = document.getElementById("defaultCanvas0")

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
		console.log("init ran...entering loop");
		window.requestAnimationFrame(loop);
	}



	async function loop() {
		await predict();
		window.requestAnimationFrame(loop);
	}

	async function predict() {
		// predict can take in an image, video or canvas html element
		const prediction = await model.predict(canvas, false);
		for (let i = 0; i < maxPredictions; i++) {
			const classPrediction =
				prediction[i].className + ": " + prediction[i].probability.toFixed(
					2);
			labelContainer.childNodes[i].innerHTML = classPrediction;
			console.log(classPrediction);
		}
	}