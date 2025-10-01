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

//chat-box

// Toggle chatbox
document.getElementById("chat-icon").onclick = () => {
  const box = document.getElementById("chat-box");
  const messages = document.getElementById("chat-messages");
  const currentDisplay = window.getComputedStyle(box).display;

  if (currentDisplay === "none") {
    box.style.display = "flex";

    // Add greeting only if no messages exist yet
    if (!messages.dataset.greeted) {
      messages.innerHTML += `
        <div class="ai-msg"><b>Nikhil:</b> How can I assist you today?</div>
      `;
      messages.dataset.greeted = "true"; // mark as greeted
    }
  } else {
    box.style.display = "none";
  }
};


// Close chat
document.getElementById("chat-close").onclick = () => {
  document.getElementById("chat-box").style.display = "none";
};

// Send message
document.getElementById("send-btn").onclick = async () => {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  const messages = document.getElementById("chat-messages");

  // Show user message
  messages.innerHTML += `<div class="user-msg"><b>You:</b> ${msg}</div>`;

  // Add animated typing indicator
  const typingId = "typing-" + Date.now();
  messages.innerHTML += `
    <div class="ai-msg" id="${typingId}">
      <b>Nikhil:</b> <span class="typing-dots"><span></span><span></span><span></span></span>
    </div>`;
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: msg, context: "jharkhand" })
    });
    const data = await response.json();

    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.outerHTML = `
        <div class="ai-msg"><b>Nikhil:</b> ${marked.parse(data.reply)}</div>`;
    }
  } catch (err) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.outerHTML =
      `<div class="error-msg"><b>Error:</b> Could not connect to server.</div>`;
  }

  // Reset input
  input.value = "";

  // Auto-scroll
  messages.scrollTop = messages.scrollHeight;
};

// Enter to send
document.getElementById("chat-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    document.getElementById("send-btn").click();
  }
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
  audio.volume = 0.1;
});