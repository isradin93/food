window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // Tabs
    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item');

    const hideTabsContent = () => {
        tabsContent.forEach(tabContent => {
            tabContent.classList.add('hide');
            tabContent.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    };

    const showTabsContent = (i = 0) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const eventTarget = event.target;

        if (eventTarget && eventTarget.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (eventTarget === tab) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2021-06-10'; // Deadline of promotions

    // Function calculates(gets) difference between deadline and current time
    const getTimeRemaining = (endTime) => {
        // var t gets difference between these two dates in milliseconds
        const timeDifference = Date.parse(endTime) - new Date(),

            /* var days - gets quantity milliseconds divide quantity milliseconds of 
            one day with Math.floor(округление вниз). Math.floor( (1000 * 60) - quantity milliseconds in a minute).
            Math.floor( (1000 * 60 * 60) - quantity milliseconds in a hour).
            Math.floor( (1000 * 60 * 60 * 24) - quantity milliseconds in 24 hours) */
            days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)),

            /* var hours - gets quantity milliseconds divide quantity milliseconds of 
            one hour with Math.floor(округление вниз).
            Math.floor( (1000 * 60 * 60) - quantity milliseconds in a hour).
            Math.floor( (1000 * 60 * 60) % 24) - оператор остатка (%) делить на 24 часа, получим хвостик
            которого не хватает до полных суток чтобы хвостик был не больше 24 часа) */
            hours = Math.floor((timeDifference / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((timeDifference / 1000 / 60) % 60),
            seconds = Math.floor((timeDifference / 1000) % 60);

        return {
            'total': timeDifference, // if timer is finished
            days,
            hours,
            minutes,
            seconds
        };
    };

    // Function puts zero before hours
    const addZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    // Function sets clock on the page
    const setClock = (selectorTimer, endTime) => {
        const timer = document.querySelector(selectorTimer), // parameter selector for more timers in the page
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); // Stops blinking layout (Мигание верстки) when we update the page

        function updateClock() {
            const timeRemainingObj = getTimeRemaining(endTime); // Inside object of function getTimeRemaining

            days.textContent = addZero(timeRemainingObj.days);
            hours.textContent = addZero(timeRemainingObj.hours);
            minutes.textContent = addZero(timeRemainingObj.minutes);
            seconds.textContent = addZero(timeRemainingObj.seconds);

            if (timeRemainingObj.total <= 0) { // Stops timer when deadline time is done
                clearInterval(timeInterval);
            }
        }
    };

    setClock('.timer', deadline);

    // Modal
    const modalTriggerBtn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    // Open modal dialog function
    const openModal = () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        //modal.classList.toggle('show');  // Toggle version
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // To not open modal after open by user
    };

    modalTriggerBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Close modal dialog function
    const closeModal = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');  // Toggle version
        document.body.style.overflow = '';
    };

    // Close modal by clicking the modal field
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close-modal') === '') {
            closeModal();
        }
    });

    // Close modal by clicking Esc keyword
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            // Close modal by Esc only  when modal dialog is open
            closeModal();
        }
    });

    //Open modal in 5 minutes
    const modalTimerId = setTimeout(openModal, 50000);

    // Open modal when user scrolled page till the end
    const openModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
    };

    window.addEventListener('scroll', openModalByScroll);

    // Using class for cards
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.classes = classes; // Array
                this.transfer = 27;
                this.changeToUAH();
            }
            // Convert money FROM US$ to UAH
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // Create layout
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async(url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch url: ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Without classes
    // const creatCard = (data) => {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div');
    //         price *= 27;
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // };

    // getResource('http://localhost:3000/menu')
    //     .then(data => creatCard(data));

    // Form

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thanks! We will call you back',
        failure: 'Sorry! Something went wrong...'
    };

    const postData = async(url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    const bindPostData = (sendForm) => {

        sendForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;

            statusMessage.classList.add('message-spinner');
            sendForm.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(sendForm);

            // Transfer formData into JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    sendForm.reset();
                });
        });
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    // Beautify thanks modal
    const showThanksModal = (message) => {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close-modal>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 5000);
    };

    // Slider
    const slider = document.querySelector('.offer__slider'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
        slides = slidesWrapper.querySelectorAll('.offer__slide'),
        next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        current = document.getElementById('current'),
        total = document.getElementById('total'),
        slidesWrapperWidth = window.getComputedStyle(slidesWrapper).width;

    let currentSlide = 1;
    let offset = 0;

    const addZeroToSlide = () => {
        if (slides.length < 10) {
            current.textContent = `0${currentSlide}`;
            total.textContent = `0${slides.length}`;
        } else {
            current.textContent = currentSlide;
            total.textContent = slides.length;
        }
    };

    addZeroToSlide();

    const getCurrentSlide = () => {
        if (slides.length < 10) {
            current.textContent = `0${currentSlide}`;
        } else {
            current.textContent = currentSlide;
        }
    };

    slidesField.style.display = 'flex';
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => slide.style.width = slidesWrapperWidth);

    slider.style.position = 'relative';
    const dots = [];

    const indicators = document.createElement('ol');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    const slideActiveDot = () => {
        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[currentSlide - 1].style.opacity = 1;
    };

    const deleteNotDigits = (str) => {
        return +str.replace(/\D/g, '');
    };

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(slidesWrapperWidth) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(slidesWrapperWidth);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (currentSlide === slides.length) {
            currentSlide = 1;
        } else {
            currentSlide++;
        }

        getCurrentSlide();
        slideActiveDot();
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(slidesWrapperWidth) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(slidesWrapperWidth);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (currentSlide === 1) {
            currentSlide = slides.length;
        } else {
            currentSlide--;
        }

        getCurrentSlide();
        slideActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlide = slideTo;
            offset = deleteNotDigits(slidesWrapperWidth) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            getCurrentSlide();
            slideActiveDot();
        });
    });

    // Calc
    const result = document.querySelector('.calculating__result span');
    let sex, weight, height, age, ratio;

    // If localStorage has default values (sex = 'female')
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        // Else set default values (sex = 'female')
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    // If localStorage has default values (ratio = 1.375)
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        // Else set default values (ratio = 1.375)
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // Match active class with localStorage values
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
            // User should type only digits
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
});