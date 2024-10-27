let cachedNews = JSON.parse(localStorage.getItem("cachedNews")) || [];
let originalNews = cachedNews.slice();

document.addEventListener("turbo:load", () => {
  if(cachedNews.length > 0){
    renderNews(cachedNews);
  }else{
    initializeNews();
  }
});

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((event, index) => event.id === arr2[index].id);
}

function initializeNews() {
  const newsContainer = document.getElementById("news-container");
  const loadingMessage = document.getElementById("news-loading-message");

  // Show the loading message and clear previous content
  loadingMessage.style.display = "block";
  newsContainer.innerHTML = "";

  fetch("/api/news")
    .then(function (response) {
      if (!response.ok) throw new Error("Failed to fetch news.");
      return response.json();
    })
    .then(function (newsItems) {
      loadingMessage.style.display = "none";

      if (arraysAreEqual(newsItems, cachedNews)) return;

      cachedNews = newsItems;
      originalNews = newsItems.slice();
      localStorage.setItem("cachedNews", JSON.stringify(newsItems));
      renderNews(newsItems);
    })
    .catch(function (error) {
      console.error(error);
      newsContainer.innerHTML = "<p class=\"text-center text-danger\">Failed to load news. Please try again later.</p>";
    });
}

function renderNews(newsItems){
  const newsContainer = document.getElementById("news-container");

  newsContainer.innerHTML = "";

  if (newsItems.length === 0) {
    newsContainer.innerHTML = "<p class=\"text-center\">No news at the moment.</p>";
    return;
  }

  newsItems.forEach((news) => {
    const newsHTML = renderNewsCard(news);
    newsContainer.insertAdjacentHTML("beforeend", newsHTML);
  });

  // Add event listeners for interactive functionality
  addNewsCardListeners();
}
// Function to render a news card
function renderNewsCard(news) {
  return (
    "<div class=\"news-card custom-card shadow-sm mb-3 hover-shadow\" data-news-id=\"" + news.id + "\">" +
      "<div class=\"news-card-body\">" +
        "<h5 class=\"news-card-title\">" + news.title + "</h5>" +
        "<p class=\"news-card-content\">" + news.content + "</p>" +
        "<div class=\"news-card-footer d-flex justify-content-end\">" +
          "<button class=\"btn btn-secondary read-more-btn\">Read more</button>" +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

// Function to add event listeners to news cards
function addNewsCardListeners() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("read-more-btn")) {
      event.stopPropagation();
      const card = event.target.closest("[data-news-id]");
      const newsId = card.getAttribute("data-news-id");
      openNewsModal(newsId);
    }
  });
}

// Function to open the news modal
function openNewsModal(newsId) {
  const news = cachedNews.find(function (n) { return n.id == newsId; });
  if (!news) return;

  // Update modal content
  document.getElementById("newsModalLabel").textContent = news.title;
  document.getElementById("newsModalBody").textContent = news.content;

  // Show the modal using Bootstrap's modal functionality
  const newsModal = new bootstrap.Modal(document.getElementById("news-modal"));
  newsModal.show();
}