//alert("Welcome To The Website Created For CBSE Skill-Expo 2025")
Array.from(document.getElementsByTagName("input")).forEach((e,i)=>{
    e.addEventListener("keyup",(el)=>{
        if (e.value.length > 0) {
            document.getElementsByClassName('bi bi-caret-down-fill')[i].style.transform="rotate(180deg)";     //To rotate the arrow prent in enter your destiny
         } else {
            document.getElementsByClassName('bi bi-caret-down-fill')[i].style.transform="rotate(0deg)";
        }
    })
})




//Making the background change after regular interval

  // Array of background image URLs
  //const backgrounds = [
//    'url("img/Testing1.jpg")',
//    'url("img/Testing2.jpg")',
//    'url("img/Testing3.jpg")',
//    'url("img/Testing4.jpg")'
//  ];
//
//  let current = 0;
//  const banner = document.getElementById('top-banner');
//
//  function changeBackground() {
//    banner.style.backgroundImage = backgrounds[current];
//    current = (current + 1) % backgrounds.length;
//  }
//
//  // Initial background
//  changeBackground();
//
//  // Change every 5 seconds (5000 ms)
//  setInterval(changeBackground, 5000);




// --- Scroll to destination feature ---
document.querySelector(".search_bx .btn_explore").addEventListener("click", function(e) {
  e.preventDefault(); // stop default link action

  const query = document.querySelector('.search_bx input[type="text"]').value.trim().toLowerCase();

  // Map of possible search terms to section IDs
  const destinations = {
    "mahabodhi temple": "temples",
    "vishnu pad temple": "vishnupad-temple",
    "mangla gauri temple": "mangla-gauri-temple",
    "rajgir hills": "hills",
    "kakolat waterfall": "falls",
    "sher shah suri tomb": "sher-shah-suri-tomb",
    "golghar": "golghar",
    "kesariya stupa": "kesariya-stupa",
    "ruins of nalanda university": "ruins-of-nalanda-university",
    "rajgir": "rajgir",
    "sujata stupa": "sujata-stupa",
    "barabar caves": "barabar-caves",
    "rajgir hills": "rajgir-hills",
    "dungeshwari hills": "dungeshwari-hills",
    "kakolat waterfall": "kakolat-waterfall",
    "telhar kund": "telhar-kund",

  };

  if (destinations[query]) {
    document.getElementById(destinations[query]).scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Destination not found. Please try again!");
  }
});



function openRegister() {
  document.getElementById("registerContainer").style.display = "block";
}

function closeRegister() {
  document.getElementById("registerContainer").style.display = "none";
}


