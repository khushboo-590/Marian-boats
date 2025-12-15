document.addEventListener('DOMContentLoaded', function () {
    console.log('App loaded');

    function updateBackgroundAndButtons(inputElement) {
        const value = parseInt(inputElement.value) || 0;
        const percentData = inputElement.closest('.percent-data');

        if (!percentData) return;

        if (percentData.classList.contains('bg-dark-gray')) {
            inputElement.classList.add('input-blue-text');
            return;
        }

        const plusButton = percentData.querySelector('img[src*="plus-icon"]')?.closest('.common-box');
        const minusButton = percentData.querySelector('img[src*="minus-icon"]')?.closest('.common-box');

        if (!plusButton || !minusButton) return;

        percentData.classList.remove('bg-blue', 'bg-blue-12');
        percentData.style.background = '';
        inputElement.style.backgroundColor = 'transparent';
        inputElement.classList.remove('input-blue-text');
        plusButton.classList.remove('btn-active', 'btn-inactive', 'btn-white');
        minusButton.classList.remove('btn-active', 'btn-inactive', 'btn-white');

        minusButton.classList.add('btn-white');

        const percentage = Math.max(0, Math.min(100, value));

        if (value <= 0) {
            percentData.style.background = 'linear-gradient(to right, rgba(0, 151, 216, 0.12) 90%, var(--color-blue) 10%)';
            plusButton.classList.add('btn-inactive');
        } else if (value >= 100) {
            percentData.style.background = 'linear-gradient(to right, var(--color-blue) 90%, rgba(0, 151, 216, 0.12) 10%)';
            plusButton.classList.add('btn-active');
        } else {
            const bluePercentage = 10 + (percentage * 0.8);
            percentData.style.background = `linear-gradient(to right, var(--color-blue) ${bluePercentage}%, rgba(0, 151, 216, 0.12) ${bluePercentage}%)`;

            if (percentage > 50) {
                plusButton.classList.add('btn-active');
            } else {
                plusButton.classList.add('btn-inactive');
            }
        }

        console.log('Updated value:', value);
    }

    const buttonContainers = document.querySelectorAll('.common-box');

    buttonContainers.forEach(container => {
        container.addEventListener('click', function () {
            const plusImg = this.querySelector('img[src*="plus-icon"]');
            const minusImg = this.querySelector('img[src*="minus-icon"]');
            const inputElement = this.closest('.percent-data').querySelector('input[type="number"]');

            if (!inputElement) return;

            let currentValue = parseInt(inputElement.value) || 0;

            if (plusImg) {
                currentValue += 5;
                console.log('Plus clicked, new value:', currentValue);
            } else if (minusImg) {
                currentValue = Math.max(0, currentValue - 5);
                console.log('Minus clicked, new value:', currentValue);
            }

            inputElement.value = currentValue;
            updateBackgroundAndButtons(inputElement);
        });
    });

    const numberInputs = document.querySelectorAll('.percent-data input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function () {
            updateBackgroundAndButtons(this);
        });

        updateBackgroundAndButtons(input);
    });

    console.log('Found', buttonContainers.length, 'button containers and', numberInputs.length, 'inputs');
});