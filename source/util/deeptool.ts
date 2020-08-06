var ConsoleManager = {
    onOpen() {
        alert("Console is opened")
    },
    onClose() {
        alert("Console is closed")
    },
    init() {

    }
}

ConsoleManager.onOpen = function () {
    alert("Console is opened!!!!!")
}
ConsoleManager.onClose = function () {
    alert("Console is closed!!!!!")
}
ConsoleManager.init();


class Deeptool {
    constructor() {

    }
    init() {
        let x = document.createElement('div'), isOpening = false, isOpened = false;
        Object.defineProperty(x, 'id', {
            get: () => {
                if (!isOpening) {
                    // this.onOpen();
                    isOpening = true;
                }
                isOpened = true;
            }
        });
        setInterval(() => {
            isOpened = false;
            console.info(x);
            console.clear();
            if (!isOpened && isOpening) {
                // this.onClose();
                isOpening = false;
            }
        }, 200)
    }
}

export default new Deeptool()
// Deeptool.watch(() => {
// })