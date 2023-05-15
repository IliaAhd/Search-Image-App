"use strict";

// Items and elements
const accessKey = "BoqdobPE-HmTXJcj_9haqyLgyzln2QkJbbpAkxGtH8U";

const formEl = document.querySelector("form");
const searchInputEl = document.querySelector(".search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreEl = document.querySelector(".show-more-button");

let page;

// Functions
const searchImages = async function () {
  // Fetch data from API
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInputEl.value}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();

  // Show images based on search result
  if (page === 1) searchResultsEl.innerHTML = "";

  const results = data.results;
  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) showMoreEl.style.display = "block";
  console.log(results);
};

// Event handlers
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
  document.querySelector(
    "h1"
  ).textContent = `Results for "${searchInputEl.value}"`;
});

showMoreEl.addEventListener("click", () => {
  searchImages();
});
