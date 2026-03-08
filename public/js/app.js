document.addEventListener('DOMContentLoaded', () => {
    const scrollTop = document.querySelector('.scroll-top');

    scrollTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0 });
    });
});
