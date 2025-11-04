// list of all operation swaps performed
let operationsStore = [];

function clearOperationsStore() {
    operationsStore = [];
}

function getOperationsStore() {
    return operationsStore;
}

class Message {
    // a and b are indices being compared/swapped
    // aColor and bColor are the respective colors to show them in
    // message is an array of ColoredText objects (describes the operation)
    constructor(a, b, aColor, bColor, aOutlineColor, bOutlineColor, message) {
        this.a = a;
        this.b = b;
        this.aColor = aColor;
        this.bColor = bColor;
        this.message = message;
    }
}

// swap object to record swap operations -- makes it easier to identify swaps vs. messages
class Swap extends Message {
    constructor(i, j, iColor, jColor, iOutlineColor, jOutlineColor, swapMessage) {
        super(i, j, iColor, jColor, iOutlineColor, jOutlineColor, swapMessage);
    }
}

// generates an array of random integers of a given size
function generateRandomArray(size) {
    let arr = [];

    // element size should be as a percentage of 100
    for (let i = 0; i < size; i++) {
        arr.push(
            (1 + Math.floor(Math.random() * 75)) / 100
        );
    }

    // return array
    return arr;
}

// swaps 2 array elements
function swapNote(a, b, aColor, bColor, aOutlineColor, bOutlineColor, message, swap, arr) {
    if (swap) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;

        // record the swap operation
        operationsStore.push(new Swap(a, b, aColor, bColor, aOutlineColor, bOutlineColor, message));
    } else {
        operationsStore.push(new Message(a, b, aColor, bColor, aOutlineColor, bOutlineColor, message));
    }
}


export { generateRandomArray, clearOperationsStore, getOperationsStore, operationsStore, Swap, Message, swapNote };