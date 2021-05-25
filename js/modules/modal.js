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

export default modal;
export {
    openModal,
    closeModal
};