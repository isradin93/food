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

export default slider;