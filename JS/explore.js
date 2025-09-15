// ===== Loader animation =====
var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
});

// ===== Sticky header =====
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

// ===== Elements =====
const searchBox = document.getElementById("searchBox");
const topPlaces = document.getElementById("topPlaces");
const resultsContainer = document.querySelector(".search-results");
const noResults = document.getElementById("noResults");

// Select only wrappers that start with "result-card-"
const allWrappers = Array.from(resultsContainer.querySelectorAll("div[class^='result-card-']"));

// ===== On page load =====
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    if (query) {
        document.getElementById("searchBox").value = query;
        searchResults(); // auto-run search with same query
    } else {
        // default state
        document.getElementById("topPlaces").style.display = "block";
        document.querySelector(".search-results").style.display = "none";
        document.getElementById("noResults").style.display = "none";
    }
};


// ===== Check Enter key =====
function checkEnter(event) {
    if (event.key === "Enter") searchResults();
}

// ===== Search function =====
function searchResults() {
    const query = searchBox.value.toLowerCase().trim();
    let found = false;

    if (query === "") {
        topPlaces.style.display = "block";
        resultsContainer.style.display = "none";
        noResults.style.display = "none";
        return;
    }

    topPlaces.style.display = "none";
    resultsContainer.style.display = "grid";

    allWrappers.forEach(wrapper => {
        const cardText = wrapper.querySelector(".result-card h2").innerText.toLowerCase();
        if (cardText.includes(query)) {
            wrapper.style.display = "flex"; // keeps grid/flex layout
            found = true;
        } else {
            wrapper.style.display = "none";
        }
    });

    noResults.style.display = found ? "none" : "block";
}

// ===== Explore Now filter function =====
function filterPlaces(category) {
    searchBox.value = ""; // clear search
    topPlaces.style.display = "none";
    resultsContainer.style.display = "grid";

    let found = false;
    allWrappers.forEach(wrapper => {
        if (wrapper.classList.contains(`result-card-${category}`)) {
            wrapper.style.display = "flex";
            found = true;
        } else {
            wrapper.style.display = "none";
        }
    });

    noResults.style.display = found ? "none" : "block";

    // auto-scroll to results
    resultsContainer.scrollIntoView({ behavior: "smooth" });
}

// ===== Show all places =====
function showAllPlaces() {
    searchBox.value = "";
    topPlaces.style.display = "block";
    resultsContainer.style.display = "none";
    allWrappers.forEach(wrapper => wrapper.style.display = "flex");
    noResults.style.display = "none";
}

// Search function
function searchResults() {
    const query = searchBox.value.toLowerCase().trim();
    let found = false;

    if (query === "") {
        topPlaces.style.display = "block";
        resultsContainer.style.display = "none";
        noResults.style.display = "none";
        document.getElementById("backBtn").style.display = "none"; // hide back
        return;
    }

    topPlaces.style.display = "none";
    resultsContainer.style.display = "grid";
    document.getElementById("backBtn").style.display = "block"; // show back

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

// Explore Now function
function filterPlaces(category) {
    searchBox.value = "";
    topPlaces.style.display = "none";
    resultsContainer.style.display = "grid";
    document.getElementById("backBtn").style.display = "block"; // show back

    let found = false;
    allWrappers.forEach(wrapper => {
        if (wrapper.classList.contains(`result-card-${category}`)) {
            wrapper.style.display = "flex";
            found = true;
        } else {
            wrapper.style.display = "none";
        }
    });

    noResults.style.display = found ? "none" : "block";
}

// Back button behavior
document.getElementById("backBtn").addEventListener("click", function () {
    if (searchBox.value.trim() !== "" || resultsContainer.style.display === "grid") {
        // Reset to Top Places (no search results)
        searchBox.value = "";
        topPlaces.style.display = "block";
        resultsContainer.style.display = "none";
        noResults.style.display = "none";
        document.getElementById("backBtn").style.display = "none"; // hide back
        allWrappers.forEach(wrapper => wrapper.style.display = "flex");
    } else if (history.length > 1) {
        history.back();
    }
});

function openDetails(page) {
    const query = document.getElementById("searchBox").value.trim(); // get current search
    window.location.href = `${page}?query=${encodeURIComponent(query)}`; // redirect with query
}
