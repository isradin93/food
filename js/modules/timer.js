const timer = () => {
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
};

module.exports = timer;