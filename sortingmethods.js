import { swapNote } from "./sortinghelper.js";

// color codes for different text colors
export const colorCodes = {
    "c0": "#2A2A2A",
    "c1": "#6A994E",
    "c2": "#C1666B",
    "c3": "#6B5B95",
    "c4": "#557B3E",
    "c5": "#9E5057",
    "c6": "#4281A4",
    "c7": "#2E5F7A",
    "c8": "#594b7bff",
}

// class to hold text with color information
class ColoredText {
    constructor(text, color) {
        this.text = text;
        this.color = color;
    }
}

function bubbleSort(arr) {
    // create a copy of the array to avoid mutating the original array
    let arrCopy = [...arr]

    for (let i = 0; i < arrCopy.length - 1; i++) {
        for (let j = 0; j < arrCopy.length - i - 1; j++) {
            if (arrCopy[j] > arrCopy[j + 1]) {
                swapNote(j, 
                    j + 1,
                    colorCodes["c1"],
                    colorCodes["c2"],
                    colorCodes["c4"],
                    colorCodes["c5"],
                    [new ColoredText(`Swapped `, colorCodes["c0"]),
                    new ColoredText(`index ${j} (value of ${Math.round(arrCopy[j + 1] * 100)})`, colorCodes["c1"]),
                    new ColoredText(` and `, colorCodes["c0"]),
                    new ColoredText(`index ${j + 1} (value of ${Math.round(arrCopy[j] * 100)})`, colorCodes["c2"]),
                    new ColoredText(`.`, colorCodes["c0"])
                    ],
                    true, arrCopy);
            } else {
                swapNote(j,
                    j + 1,
                    colorCodes["c1"],
                    colorCodes["c2"],
                    colorCodes["c4"],
                    colorCodes["c5"],
                    [new ColoredText(`No swap between `, colorCodes["c0"]),
                    new ColoredText(`index ${j} (value of ${Math.round(arrCopy[j] * 100)})`, colorCodes["c1"]),
                    new ColoredText(` and `, colorCodes["c0"]),
                    new ColoredText(`index ${j + 1} (value of ${Math.round(arrCopy[j + 1] * 100)})`, colorCodes["c2"]),
                    new ColoredText(`.`, colorCodes["c0"])
                    ],
                    false, null);
            }
        }
    }
}

function insertionSort(arr) {
    let arrCopy = [...arr];

    let i = 0;
    let j = 0;
    let k = 1;
    
    while (i < arrCopy.length - 1) {
        while (j >= 0 && arrCopy[k] < arrCopy[j]) {
            swapNote(
                j, 
                k,
                colorCodes["c1"],
                colorCodes["c2"],
                colorCodes["c4"],
                colorCodes["c5"],
                [
                    new ColoredText("Swapped ", colorCodes["c0"]),
                    new ColoredText(`index ${j} (value of ${Math.round(arrCopy[k] * 100)})`, colorCodes["c1"]),
                    new ColoredText(" and ", colorCodes["c0"]),
                    new ColoredText(`index ${k} (value of ${Math.round(arrCopy[j] * 100)})`, colorCodes["c2"]),
                    new ColoredText(".", colorCodes["c0"])
                ],
                true,
                arrCopy
            );
            j--;
            k--;
        } 

        if (j >= 0 && arrCopy[k] >= arrCopy[j]) {
            swapNote(
                j,
                k,
                colorCodes["c1"],
                colorCodes["c2"],
                colorCodes["c4"],
                colorCodes["c5"],
                [
                    new ColoredText("No swap between ", colorCodes["c0"]),
                    new ColoredText(`index ${j} (value of ${Math.round(arrCopy[j] * 100)})`, colorCodes["c1"]),
                    new ColoredText(" and ", colorCodes["c0"]),
                    new ColoredText(`index ${k} (value of ${Math.round(arrCopy[k] * 100)})`, colorCodes["c2"]),
                    new ColoredText(".", colorCodes["c0"])
                ],
                false,
                null
            );
        }
        
        i++;
        j = i;
        k = i + 1;
    }
}

function findPivotIndex(arr, start, end) {
    let pivot = arr[end];

    // 🔹 Announce pivot selection (no swap)
    swapNote(
        end,
        null, // no second index
        colorCodes["c3"],
        null,
        colorCodes["c8"],
        null,
        [
            new ColoredText("Selected pivot ", colorCodes["c0"]),
            new ColoredText(`index ${end} (value of ${Math.round(pivot * 100)})`, colorCodes["c3"]),
            new ColoredText(".", colorCodes["c0"])
        ],
        false, // visualization only, no actual swap
        arr
    );

    let i = start - 1;
    
    for (let j = start; j <= end - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            // 🔹 Perform swap via visual method
            swapNote(
                i,
                j,
                colorCodes["c1"],
                colorCodes["c2"],
                colorCodes["c4"],
                colorCodes["c5"],
                [
                    new ColoredText("Swapped ", colorCodes["c0"]),
                    new ColoredText(`index ${i} (value of ${Math.round(arr[j] * 100)})`, colorCodes["c1"]),
                    new ColoredText(" and ", colorCodes["c0"]),
                    new ColoredText(`index ${j} (value of ${Math.round(arr[i] * 100)})`, colorCodes["c2"]),
                    new ColoredText(".", colorCodes["c0"])
                ],
                true, // swapNote handles the actual swap
                arr
            );
        } else {
            // 🔹 Visualization for non-swap comparison
            swapNote(
                i + 1,
                j,
                colorCodes["c1"],
                colorCodes["c2"],
                colorCodes["c4"],
                colorCodes["c5"],
                [
                    new ColoredText("No swap between ", colorCodes["c0"]),
                    new ColoredText(`index ${i} (value of ${Math.round(arr[i] * 100)})`, colorCodes["c1"]),
                    new ColoredText(" and ", colorCodes["c0"]),
                    new ColoredText(`index ${j} (value of ${Math.round(arr[j] * 100)})`, colorCodes["c2"]),
                    new ColoredText(" (value >= pivot).", colorCodes["c0"])
                ],
                false,
                arr
            );
        }
    }

    // 🔹 Move pivot into correct position
    swapNote(
        i + 1,
        end,
        colorCodes["c1"],
        colorCodes["c3"],
        colorCodes["c4"],
        colorCodes["c8"],
        [
            new ColoredText("Moved pivot to final position ", colorCodes["c0"]),
            new ColoredText(`${i + 1}`, colorCodes["c1"]),
            new ColoredText(".", colorCodes["c0"])
        ],
        true, // performs the actual pivot swap
        arr
    );

    return i + 1;
}

function quicksort(arr, start, end) {
    if (start < end) {
        let pivotIndex = findPivotIndex(arr, start, end)
        
        quicksort(arr, start, pivotIndex - 1);
        quicksort(arr, pivotIndex + 1, end);
    }
}

function callQuicksort(arr) {
    let arrCopy = [...arr];
    quicksort(arrCopy, 0, arrCopy.length - 1);
}

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) { 
        let k = i; 
        
        for (let j = i; j < arr.length; j++) { 
            if (arr[j] < arr[k]) {
                 k = j; 

                 swapNote(j, null, colorCodes["c3"], null, colorCodes["c8"], null, 
                    [
                        new ColoredText("New minimum found at ", colorCodes["c0"]),
                        new ColoredText(`index ${j} (value of ${Math.round(arr[j] * 100)})`, colorCodes["c3"]),
                        new ColoredText(".", colorCodes["c0"])
                    ],
                false, null);
            } 
        } 
        
        swapNote(i, k, colorCodes["c1"], colorCodes["c2"], colorCodes["c4"], colorCodes["c5"],
            [
                new ColoredText("Swapped ", colorCodes["c0"]),
                new ColoredText(`index ${i} (value of ${Math.round(arr[k] * 100)})`, colorCodes["c1"]),
                new ColoredText(" and ", colorCodes["c0"]),
                new ColoredText(`index ${k} (value of ${Math.round(arr[i] * 100)})`, colorCodes["c2"]),
                new ColoredText(".", colorCodes["c0"])
            ],
            true, arr);

    } 
}

function callSelectionSort(arr) {
    let arrCopy = [...arr];
    selectionSort(arrCopy);
}

export { bubbleSort, insertionSort, callQuicksort, callSelectionSort, ColoredText };