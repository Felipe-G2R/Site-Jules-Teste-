/* Mobile Menu Toggle */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Show Menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/* Hide Menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/* Remove Menu Mobile on Link Click */
const navLink = document.querySelectorAll('.nav-link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));


/* Change Background Header on Scroll */
function scrollHeader(){
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* Scroll Active Link */
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/* Simple Reveal Animation on Scroll */
const sr = {
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
};

// We will implement a simple intersection observer for the reveal effect since I didn't include the ScrollReveal library
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active-reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add a CSS class for the reveal effect
const style = document.createElement('style');
style.innerHTML = `
    .reveal-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s ease;
    }
    .active-reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Select elements to animate
document.querySelectorAll('.section-title, .section-subtitle, .card, .about-data, .about-img, .contact-info, .contact-form').forEach(el => {
    el.classList.add('reveal-item');
    observer.observe(el);
});
