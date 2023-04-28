const pages = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        e.target.classList.toggle('show', e.isIntersecting)
    });
});

pages.forEach(e => observer.observe(e));

const h1 = document.querySelector('h1');
h1.innerHTML = h1.innerHTML.replace(/ /g, '<br>');

const h2gauges = document.querySelectorAll('.gauge h2');
h2gauges.forEach(element => {
    element.innerHTML = element.innerHTML.replace(/ /g, '<br>');
});


const signupBtn = document.getElementById('signup');
const popupForm = document.querySelector('.popup-form');
const blurBg = document.querySelector('.blur');

signupBtn.addEventListener('click', function () {
    popupForm.style.display = 'block';
    blurBg.style.display = 'block';
});

window.addEventListener('click', function (e) {
    if (e.target === popupForm) {
        return;
    } else if (e.target === blurBg) {
        popupForm.style.display = 'none';
        blurBg.style.display = 'none';
    }
});