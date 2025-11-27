document.addEventListener('DOMContentLoaded', () => {
    // Keypad Logic (for index.html)
    const keypadInput = document.getElementById('keypad-input');
    if (keypadInput) {
        const keys = document.querySelectorAll('.key-btn');
        const backspaceBtn = document.querySelector('.backspace-btn');

        keys.forEach(key => {
            key.addEventListener('click', () => {
                const value = key.getAttribute('data-value');
                if (keypadInput.value.length < 20) {
                    keypadInput.value += value;
                }
            });
        });

        if (backspaceBtn) {
            backspaceBtn.addEventListener('click', () => {
                keypadInput.value = keypadInput.value.slice(0, -1);
            });
        }
    }

    // OTP Logic (for opaha.html)
    const otpInputs = document.querySelectorAll('.otp-input');
    if (otpInputs.length > 0) {
        otpInputs.forEach((input, index) => {
            // Handle typing
            input.addEventListener('input', (e) => {
                const value = e.target.value;

                // Allow only numbers
                if (!/^\d*$/.test(value)) {
                    e.target.value = value.replace(/\D/g, '');
                }

                if (e.target.value.length === 1) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });

            // Handle backspace
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    if (input.value.length === 0 && index > 0) {
                        otpInputs[index - 1].focus();
                    }
                }
            });

            // Handle paste
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').slice(0, otpInputs.length);

                if (/^\d+$/.test(pastedData)) {
                    pastedData.split('').forEach((char, i) => {
                        if (otpInputs[i]) {
                            otpInputs[i].value = char;
                        }
                    });
                    // Focus the next empty input or the last one
                    const nextEmptyIndex = pastedData.length < otpInputs.length ? pastedData.length : otpInputs.length - 1;
                    otpInputs[nextEmptyIndex].focus();
                }
            });
        });
    }
});
