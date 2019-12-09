setTimeout(function() {
	// alert("Hello");
	setConstant();
}, 500);

function setConstant() {
	const canvas = document.getElementById("defaultCanvas0")
	const video = document.getElementById("debugger")
	console.log(canvas)

	const stream = canvas.captureStream();
	video.srcObject = stream;
}