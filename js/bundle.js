/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


const cards = () => {
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
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
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
    //                 <div class="menu__item-cost">????????:</div>
    //                 <div class="menu__item-total"><span>${price}</span> ??????/????????</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // };

    // getResource('http://localhost:3000/menu')
    //     .then(data => creatCard(data));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



const forms = (formSelector, modalTimerId) => {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thanks! We will call you back',
        failure: 'Sorry! Something went wrong...'
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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close-modal>??</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 5000);
    };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
const openModal = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    //modal.classList.toggle('show');  // Toggle version
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId); // To not open modal after open by user
    }
};

const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');  // Toggle version
    document.body.style.overflow = '';
};

const modal = (triggerSelector, modalSelector, modalTimerId) => {
    // Modal
    const modalTriggerBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTriggerBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // Close modal by clicking the modal field
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close-modal') === '') {
            closeModal(modalSelector);
        }
    });

    // Close modal by clicking Esc keyword
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            // Close modal by Esc only  when modal dialog is open
            closeModal(modalSelector);
        }
    });

    // Open modal when user scrolled page till the end
    const openModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', openModalByScroll);
        }
    };

    window.addEventListener('scroll', openModalByScroll);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const slider = ({
    container,
    wrapper,
    field,
    slide,
    nextArrow,
    prevArrow,
    currentCounter,
    totalCounter
}) => {
    // Slider
    const slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = slidesWrapper.querySelector(field),
        slides = slidesWrapper.querySelectorAll(slide),
        next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow),
        current = document.getElementById(currentCounter),
        total = document.getElementById(totalCounter),
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
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabs = (tabsContentSelector, tabsParentSelector, tabsSelector, activeClass) => {
    // Tabs
    const tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector),
        tabs = tabsParent.querySelectorAll(tabsSelector);

    const hideTabsContent = () => {
        tabsContent.forEach(tabContent => {
            tabContent.classList.add('hide');
            tabContent.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    };

    const showTabsContent = (i = 0) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add(activeClass);
    };

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const eventTarget = event.target;

        if (eventTarget && eventTarget.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (eventTarget === tab) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timer = (id, deadline) => {

    // Function calculates(gets) difference between deadline and current time
    const getTimeRemaining = (endTime) => {
        // var t gets difference between these two dates in milliseconds
        const timeDifference = Date.parse(endTime) - new Date(),

            /* var days - gets quantity milliseconds divide quantity milliseconds of 
            one day with Math.floor(???????????????????? ????????). Math.floor( (1000 * 60) - quantity milliseconds in a minute).
            Math.floor( (1000 * 60 * 60) - quantity milliseconds in a hour).
            Math.floor( (1000 * 60 * 60 * 24) - quantity milliseconds in 24 hours) */
            days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)),

            /* var hours - gets quantity milliseconds divide quantity milliseconds of 
            one hour with Math.floor(???????????????????? ????????).
            Math.floor( (1000 * 60 * 60) - quantity milliseconds in a hour).
            Math.floor( (1000 * 60 * 60) % 24) - ???????????????? ?????????????? (%) ???????????? ???? 24 ????????, ?????????????? ??????????????
            ???????????????? ???? ?????????????? ???? ???????????? ?????????? ?????????? ?????????????? ?????? ???? ???????????? 24 ????????) */
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

        updateClock(); // Stops blinking layout (?????????????? ??????????????) when we update the page

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

    setClock(id, deadline);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
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

const getResource = async(url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch url: ${url}, status: ${result.status}`);
    }

    return await result.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {

    //Open modal in 3 minutes
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 300000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)('.timer', '2021-06-15');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentCounter: 'current',
        totalCounter: 'total'
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map