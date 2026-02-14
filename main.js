const display = document.querySelector('.display');
const buttons = document.querySelectorAll("button");

// Add these state variables at the top
let lastOperation = null;
let lastOperand = null;
let justPressedEquals = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (button.classList.contains("clear")) {
            display.innerText = "0";
            // Reset state
            lastOperation = null;
            lastOperand = null;
            justPressedEquals = false;

        } else if (button.classList.contains("backspace")) {
            // After pressing equals, backspace should clear to 0
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
                    // --- REPEAT OPERATION LOGIC ---
                    // If equals is pressed again, repeat the last operation
                    const repeatExpression = `${display.innerText} ${lastOperation} ${lastOperand}`;
                    const sanitized = repeatExpression.replace(/×/g, '*').replace(/÷/g, '/');
                    display.innerText = eval(sanitized);

                } else {
                    // --- FIRST-TIME-EQUAL LOGIC ---
                    const expression = display.innerText;

                    // Find and save the last operator and operand for future repeats
                    const match = expression.match(/([-\+×÷])([^-\+×÷]+)$/);
                    if (match) {
                        lastOperation = match[1]; // e.g., '+'
                        lastOperand = match[2];   // e.g., '5'
                    } else {
                        lastOperation = null;
                        lastOperand = null;
                    }

                    // Perform the initial calculation
                    const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
                    display.innerText = eval(sanitized);
                    justPressedEquals = true; // Set the flag that equals was just pressed
                }
            } catch (error) {
                display.innerText = "Error";
                justPressedEquals = false;
            }

        } else { // This handles number and operator buttons
            if (display.innerText === "0" || display.innerText === "Error" || justPressedEquals) {
                // If starting a new calculation after pressing equals, replace the display
                display.innerText = value;
            } else {
                display.innerText += value;
            }
            justPressedEquals = false; // Reset the flag since another button was pressed
        }
    });
});
