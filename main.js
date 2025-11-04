import { clearCanvas, drawRectangle } from "./draw.js";
import { generateRandomArray, operationsStore, Swap, clearOperationsStore } from "./sortinghelper.js";
import { bubbleSort, callQuicksort, insertionSort, callSelectionSort } from "./sortingmethods.js";

// slider for array size
const sliderElement = document.getElementById('array-size-slider');
// text output for slider
const sliderElementOutput = document.getElementById('array-size-output');

// play button
const playButtonElement = document.getElementById('play-button');
// next operation button
const nextOperationElement = document.getElementById('next-button');
const prevOperationElement = document.getElementById('prev-button');

const operationsDescriptionElement = document.getElementById('operations-description');

const animationSpeedSlider = document.getElementById('animation-speed-slider');

const scrubberElement = document.getElementById('scrubber');

// canvas
const canvas = document.getElementById('canvas');

const hideOnPlayElements = document.getElementsByClassName('hide-on-play');

const sortingMethodSelectionElement = document.getElementById('sorting-method');

// initialize array and current operation index
let array = generateRandomArray(parseInt(sliderElement.value));
let currentSwapOperationIndex = 0;

let lastFrameTime = 0;
// TODO: adjust with a slider later
let updateInterval = 20; // milliseconds

let sortingMethodName = "bubble";

const sortingMethods = {
    "bubble": bubbleSort,
    "insertion": insertionSort,
    "quick": callQuicksort,
    "selection": callSelectionSort
};

function resetSort() {
    lastFrameTime = 0;
    clearOperationsStore();
    sortingMethods[sortingMethodName](array);
    scrubberElement.max = operationsStore.length - 1;
    currentSwapOperationIndex = 0;
    scrubberElement.value = 0;
}

sortingMethodSelectionElement.addEventListener('change', () => {
    sortingMethodName = sortingMethodSelectionElement.value;

    for (let i = scrubberElement.value; i > 0; i--) {
        performOperation(operationsStore[i]);
    }

    resetSort();
});

// clear operations store to avoid any previous operations
clearOperationsStore();

// fixes the canvas size
function fixCanvasSize() {
    // sets canvas size to half the window size
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.5;
    // draw the array
    drawArray(array);
}

// fix canvas size on load and resize
window.addEventListener('load', fixCanvasSize);
window.addEventListener('resize', fixCanvasSize);

// set value of the slider output to the slider's value
sliderElement.oninput = () => {
    // clear previous operations (new array has to be generated)

    // get slider value
    const sliderVal = parseInt(sliderElement.value);

    // add 0 if needed so that the centering of the slider and the selection menu stays constant
    if (sliderVal < 10) {
        sliderElementOutput.innerHTML = "0" + sliderVal;
    } else {
        sliderElementOutput.innerHTML = sliderVal;
    }

    // generate new array and draw it
    array = generateRandomArray(parseInt(sliderElement.value));
    drawArray(array);

    resetSort();
}

// change value of play button when clicked
playButtonElement.onclick = () => {
    // value of the slider
    const sliderVal = parseInt(sliderElement.value);

    // if change icon of play button (pause/play)
    if (playButtonElement.innerHTML === "▶") {
        playButtonElement.innerHTML = "⏸";

        for (let element of hideOnPlayElements) {
            element.classList.add('deactivated');
        }

    } else {
        playButtonElement.innerHTML = "▶";
        for (let element of hideOnPlayElements) {
            element.classList.remove('deactivated');
        }
    }
}

function drawArray(arr, a, aColor, b, bColor, aOutlineColor, bOutlineColor) {
    // clear canvas
    clearCanvas();

    // get canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // width of each bar is so it takes up entire canvas width
    const barWidth = canvasWidth / arr.length;

    // iterate through array and draw each bar
    for (let i = 0; i < arr.length; i++) {
        const barHeight = arr[i] * canvasHeight;
        
        if (i === a) {
            drawRectangle(
                i * barWidth, // value of each bar multiplied by canvas height
                canvasHeight - barHeight, // position from bottom so bars grow upwards
                barWidth,
                barHeight,
                aOutlineColor, 
                aColor 
            );
        } else if (i === b) {
            drawRectangle(
                i * barWidth, // value of each bar multiplied by canvas height
                canvasHeight - barHeight, // position from bottom so bars grow upwards
                barWidth,
                barHeight,
                bOutlineColor, 
                bColor 
            );
        } else {
            drawRectangle(
                i * barWidth, // value of each bar multiplied by canvas height
                canvasHeight - barHeight, // position from bottom so bars grow upwards
                barWidth,
                barHeight,
                '#2E5F7A', // outline color
                '#4281A4' // bar color
            );
        }

        // add a toggle to show the bar heights
        // ctx.font = "10px serif";
        // ctx.fillText(arr[i], i * barWidth, canvasHeight - barHeight);
    }
}

function updateScrubberValue() {
    scrubberElement.value = currentSwapOperationIndex;
}

scrubberElement.oninput = () => {
    playButtonElement.innerHTML = "▶";
    const scrubberValue = parseInt(scrubberElement.value);

    while (currentSwapOperationIndex < scrubberValue) {
        performOperation(operationsStore[currentSwapOperationIndex]);
        currentSwapOperationIndex++;
    }

    while (currentSwapOperationIndex > scrubberValue) {
        currentSwapOperationIndex--;
        performOperation(operationsStore[currentSwapOperationIndex], true);
    }

    for (let element of hideOnPlayElements) {
        element.classList.remove('deactivated');
    }
}

// performs a swap operation
function performOperation(operation) {
    if (operation instanceof Swap) {
        let temp = array[operation.a];
        array[operation.a] = array[operation.b];
        array[operation.b] = temp;
    }

    let msg = "";

    for (let coloredText of operation.message) {
        msg += `<span style="color:${coloredText.color}">${coloredText.text}</span>`;
    }

    operationsDescriptionElement.innerHTML = msg;

    // perform swap on array
    drawArray(array, operation.a, operation.aColor, operation.b, operation.bColor, operation.aOutlineColor, operation.bOutlineColor);
}

nextOperationElement.onclick = () => {
    // code goes here
    performOperation(operationsStore[currentSwapOperationIndex]);
    if (currentSwapOperationIndex < operationsStore.length - 1) currentSwapOperationIndex++;
    updateScrubberValue();
}

prevOperationElement.onclick = () => {
    // code goes here
    if (currentSwapOperationIndex > 0) currentSwapOperationIndex--;
    performOperation(operationsStore[currentSwapOperationIndex], true);
    updateScrubberValue();
}

animationSpeedSlider.oninput = () => {
    updateInterval = 100 - parseInt(animationSpeedSlider.value);
}

function playSort(currentTime) {
  if (playButtonElement.innerHTML !== "▶") {
    if (lastFrameTime === 0) lastFrameTime = currentTime;

    if ((currentTime - lastFrameTime) >= updateInterval) {

      if (currentSwapOperationIndex < operationsStore.length) {
        performOperation(operationsStore[currentSwapOperationIndex]);
        currentSwapOperationIndex++;
        updateScrubberValue();
      }

      lastFrameTime = currentTime;

      if (currentSwapOperationIndex >= operationsStore.length) {
        playButtonElement.innerHTML = "▶";
        for (let el of hideOnPlayElements) el.classList.remove('deactivated');
      }
    }
  }

  requestAnimationFrame(playSort);
}

resetSort();
requestAnimationFrame(playSort);