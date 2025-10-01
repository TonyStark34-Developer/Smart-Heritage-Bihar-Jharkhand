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

// Login form
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop page refresh

    let username = document.querySelector("#loginForm input[type='email']").value.split("@")[0]; 
    sessionStorage.setItem("username", username);

    document.querySelector(".login-label").textContent = username;
    document.querySelector(".login-button").disabled = true;

    // Close popup after login
    document.querySelector(".wrapper").classList.remove("active-popup");
    document.querySelector(".overlay_blury").classList.remove("active-blur");
});

// Register form
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.querySelector("#registerForm input[type='text']").value;
    sessionStorage.setItem("username", username);

    document.querySelector(".login-label").textContent = username;
    document.querySelector(".login-button").disabled = true;

    // Close popup after registration
    document.querySelector(".wrapper").classList.remove("active-popup");
    document.querySelector(".overlay_blury").classList.remove("active-blur");
});

// On page load
window.onload = () => {
    let savedUser = sessionStorage.getItem("username");
    if (savedUser) {
        document.querySelector(".login-label").textContent = savedUser;
        document.querySelector(".login-button").disabled = true;
    } else {
        document.querySelector(".login-label").textContent = "Login";
        document.querySelector(".login-button").disabled = false;
    }
};



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

setInterval(autoslide, 22000);

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

//---------------------------------------------------------


const btn = document.getElementById('playMusic');
const audio = document.getElementById('bgMusic');

btn.addEventListener('click', () => {
    audio.play()
        .then(() => {
            console.log('Music started!');
            btn.style.display = 'none'; // hide button after click
        })
        .catch((err) => {
            console.error('Playback failed:', err);
            alert('Audio playback failed. Try clicking again.');
        });
});

// Save before unload
window.addEventListener("beforeunload", () => {
  const audio = document.getElementById("bgMusic");
  localStorage.setItem("musicTime", audio.currentTime);
});

// Resume after load
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgMusic");
  const time = localStorage.getItem("musicTime");
  if (time) audio.currentTime = time;
  audio.play();
  audio.volume = 0.07;
});

