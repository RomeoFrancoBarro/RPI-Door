
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.overlay = document.createElement("div"); // Create overlay
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
    
        // Apply styles for the overlay
        this.elements.overlay.style.backgroundColor = "white";
        this.elements.overlay.style.position = "fixed";
        this.elements.overlay.style.top = "0";
        this.elements.overlay.style.left = "0";
        this.elements.overlay.style.width = "100vw";
        this.elements.overlay.style.height = "100vh";
        this.elements.overlay.style.zIndex = "1000"; // Make sure the overlay is on top
        this.elements.overlay.classList.add("keyboard--hidden"); // Initially hide overlay
    
        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
    
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
        // Add input box on top of the keyboard, inside the overlay
        this.elements.inputBox = document.createElement("input");
        this.elements.inputBox.setAttribute("type", "text");
        this.elements.inputBox.setAttribute("class", "keyboard-input use-keyboard-input");
        this.elements.inputBox.setAttribute("placeholder", "Click to type");
        this.elements.overlay.appendChild(this.elements.inputBox);

        // Apply styles for the input box
        this.elements.inputBox.style.position = "absolute";
        this.elements.inputBox.style.top = "20%";
        this.elements.inputBox.style.left = "50%";
        this.elements.inputBox.style.transform = "translate(-50%, -50%)";
        this.elements.inputBox.style.width = "80%";
        this.elements.inputBox.style.padding = "10px";
        this.elements.inputBox.style.fontSize = "22px";
        this.elements.inputBox.style.border = "1px solid #ccc";
        this.elements.inputBox.style.zIndex = "1002"; // Place the input box above the overlay
    
        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.overlay); // Append overlay to body
        document.body.appendChild(this.elements.main); // Append the keyboard to the body
    
        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },


    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "?",
            "-", "z", "x", "c", "v", "b", "n", "m", ",", ".", "done",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");

                        // Update the input box value
                        if (this.elements.inputBox) {
                            this.elements.inputBox.value = this.properties.value;
                        }
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        const clickedKey = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.properties.value += clickedKey;
                        this._triggerEvent("oninput");

                        // Update the input box value
                        if (this.elements.inputBox) {
                            this.elements.inputBox.value = this.properties.value;
                        }
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;

        // Update the input box value before removing "keyboard--hidden" class
        if (this.elements.inputBox) {
            this.elements.inputBox.value = this.properties.value;
        }
        
        this.elements.main.classList.remove("keyboard--hidden");
        this.elements.overlay.classList.remove("keyboard--hidden"); // Show overlay
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = null;
        this.eventHandlers.onclose = null;
        this.elements.main.classList.add("keyboard--hidden");
        this.elements.overlay.classList.add("keyboard--hidden"); // Hide overlay

        // Clear the value of the overlay input box
        if (this.elements.inputBox) {
            this.elements.inputBox.value = "";
        }
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

