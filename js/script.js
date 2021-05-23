window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        calc = require('./modules/calc'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider');

    tabs();
    timer();
    calc();
    cards();
    forms();
    modal();
    slider();
});