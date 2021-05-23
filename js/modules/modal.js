const modal = () => {
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
};

module.exports = modal;