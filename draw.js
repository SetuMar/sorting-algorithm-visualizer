// canvas element (HTML element)
const canvas = document.getElementById('canvas');
// canvas context (what is being drawn onto)
const ctx = canvas.getContext('2d');

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRectangle(x, y, width, height, strokeColor, fillColor) {
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
}

export { clearCanvas, drawRectangle };