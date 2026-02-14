const display = document.querySelector('.display');
const buttons = document.querySelectorAll("button");

let lastOperation = null;
let lastOperand = null;
let justPressedEquals = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (button.classList.contains("clear")) {
            display.innerText = "0";
            lastOperation = null;
            lastOperand = null;
            justPressedEquals = false;

        } else if (button.classList.contains("backspace")) {
            if (justPressedEquals) {
                display.innerText = "0";
            } else {
                display.innerText = display.innerText.slice(0, -1);
                if (display.innerText === "") {
                    display.innerText = "0";
                }
            }
            justPressedEquals = false;

        } else if (button.classList.contains("equals")) {
            try {
                if (justPressedEquals && lastOperation && lastOperand) {
                    const repeatExpression = `${display.innerText} ${lastOperation} ${lastOperand}`;
                    const sanitized = repeatExpression.replace(/×/g, '*').replace(/÷/g, '/');
                    display.innerText = eval(sanitized);

                } else {
                    const expression = display.innerText;
                    const match = expression.match(/([-\+×÷])([^-\+×÷]+)$/);
                    if (match) {
                        lastOperation = match[1];
                        lastOperand = match[2];  
                    } else {
                        lastOperation = null;
                        lastOperand = null;
                    }
                    const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
                    display.innerText = eval(sanitized);
                    justPressedEquals = true;
                }
            } catch (error) {
                display.innerText = "Error";
                justPressedEquals = false;
            }

        } else { 
            if (display.innerText === "0" || display.innerText === "Error" || justPressedEquals) {
                display.innerText = value;
            } else {
                display.innerText += value;
            }
            justPressedEquals = false; 
        }
    });
});
