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

    const deadline = '2021-04-10'; // Deadline of promotions

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
});