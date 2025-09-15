//All the clicking part here vvvv

const wrapper = document.querySelector('.wrapper');
const overlay_blury = document.querySelector('.overlay_blury');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.login-button');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    overlay_blury.classList.add('active-blur');
});

iconClose.addEventListener('click', ()=> {
    overlay_blury.classList.remove('active-blur');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

/* Type writer animation */


const dynamicText = document.querySelector(".dynamic-typing");
const words = ["DISCOVER", "EXPLORE", "TRAVEL", "DETERMINE", "VISIT",]

let wordIndex = 0;
let charIndex = 1;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;

    if(!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 200)
    } else if(isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        isDeleting = !isDeleting;
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200)
    }

}

typeEffect()

//Slider Navigation part from here vvvvvv

const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".body-video");

let currentslide = 0;

var sliderNav = function(manual){
    btns.forEach((btn) => {
        btn.classList.remove("active2");
    });

    slides.forEach((slide) => {
        slide.classList.remove("active2")
    });

    btns[manual].classList.add("active2");
    slides[manual].classList.add("active2");

    currentslide = manual;

};

//Auto nav

function autoslide() {
    currentslide = (currentslide + 1) % slides.length;
    sliderNav(currentslide);
};

setInterval(autoslide, 15000);

//Manual nav

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    });
});

// explore: header animation

window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})

// loader animation 

var loader = document.getElementById("preloader");

window.addEventListener("load", function(){
    loader.style.display = "none";
});


