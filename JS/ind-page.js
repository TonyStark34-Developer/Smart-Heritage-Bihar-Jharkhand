const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    const target = tab.getAttribute("data-tab");
    document.getElementById(target).classList.add("active");
  });
});


const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnails img');

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    // Swap the image sources
    const temp = mainImage.src;
    mainImage.src = thumb.src;
    thumb.src = temp;
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
        window.location.href = `explore.html?query=${encodeURIComponent(query)}`;
    } else {
        // fallback: just go explore page
        window.location.href = "explore.html";
    }
});
