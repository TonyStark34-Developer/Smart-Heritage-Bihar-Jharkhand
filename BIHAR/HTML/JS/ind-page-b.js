// const tabs = document.querySelectorAll(".tab");
// const panels = document.querySelectorAll(".tab-panel");

// tabs.forEach(tab => {
//   tab.addEventListener("click", () => {
//     tabs.forEach(t => t.classList.remove("active"));
//     panels.forEach(p => p.classList.remove("active"));

//     tab.classList.add("active");
//     const target = tab.getAttribute("data-tab");
//     document.getElementById(target).classList.add("active");
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnails img');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const temp = mainImage.src;
      mainImage.src = thumb.src;
      thumb.src = temp;
    });
  });
});

let lastState = null; // store last search/filter

// --- Search function ---
function searchResults() {
    const query = searchBox.value.toLowerCase().trim();
    let found = false;

    if (query === "") {
        topPlaces.style.display = "block";
        resultsContainer.style.display = "none";
        noResults.style.display = "none";
        return;
    }

    // Save state
    lastState = { type: "search", query: query };

    topPlaces.style.display = "none";
    resultsContainer.style.display = "grid";

    allWrappers.forEach(wrapper => {
        const cardText = wrapper.querySelector(".result-card h2").innerText.toLowerCase();
        if (cardText.includes(query)) {
            wrapper.style.display = "flex";
            found = true;
        } else {
            wrapper.style.display = "none";
        }
    });

    noResults.style.display = found ? "none" : "block";
}

document.getElementById("backBtn").addEventListener("click", function () {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    if (query) {
        // go back to explore page with same search
        window.location.href = `index.html?query=${encodeURIComponent(query)}`;
    } else {
        // fallback: just go explore page
        window.location.href = "index.html";
    }
});


const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const sidebar = document.querySelector(".sidebar");
const page = document.querySelector(".page");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // reset
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    // activate
    tab.classList.add("active");
    const target = document.getElementById(tab.dataset.tab);
    if (target) {
      target.classList.add("active");
    }

    // sidebar toggle
    if (tab.dataset.tab === "planning" || tab.dataset.tab === "hotel") {
      sidebar.classList.add("hidden");
      page.classList.add("full-width");
    } else {
      sidebar.classList.remove("hidden");
      page.classList.remove("full-width");
    }


  });
});

const audio = document.getElementById("bgMusic");

// Resume time if saved
window.addEventListener("DOMContentLoaded", () => {
const savedTime = localStorage.getItem("musicTime");
if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
}
audio.play().catch(()=>{});
audio.volume = 0.1;
});

// Save time before leaving page
window.addEventListener("beforeunload", () => {
localStorage.setItem("musicTime", audio.currentTime);
});


//Back Btn
