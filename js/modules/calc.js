const calc = () => {
    // Calc
    const result = document.querySelector('.calculating__result span');
    let sex, weight, height, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    const initLocalSettings = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);

            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }

            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        });
    };

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // Function to calculate the base rate of calories
    const calcTotal = () => {
        // If one of conditions false we don't calculate
        if (!sex || !weight || !height || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        // Formula for calc the base rate of calories for female & male
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };
    // Call func inside below functions
    calcTotal();

    // Get data from 1-block(Gender) @ 3-block(Physical activity)
    const getStaticInfo = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                let target = e.target;

                // Getting data from 3-block by id
                if (target.getAttribute('data-ratio')) {
                    ratio = +target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +target.getAttribute('data-ratio'));
                } else {
                    //Getting data from 1-block by data attr.
                    sex = target.getAttribute('id');
                    localStorage.setItem('sex', target.getAttribute('id'));
                }
                // Remove all active class
                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });

                // Add active class element that we click
                target.classList.add(activeClass);

                // Call func every time when we have changes on page
                calcTotal();
            });
        });
    };
    // Call func 2 times cause we have 2 data block
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    // Get data from 2-block (inputs)
    const getDynamicInfo = (selector) => {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            // Call func every time when we have changes on page
            calcTotal();
        });
    };
    // Call func 3 times cause we have 3 input block
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
};

module.exports = calc;