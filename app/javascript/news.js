
document.addEventListener("turbo:load", () => {
  initializeNews();
});

function initializeNews() {
  const newsContainer = document.getElementById("news-container");
  const loadingMessage = document.getElementById("news-loading-message");
  
  // Show the loading message and clear previous content
  loadingMessage.style.display = "block";
  newsContainer.innerHTML = "";

  fetch("/api/news")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    })
    .then((newsItems) => {
      
      loadingMessage.style.display = "none";

      if (newsItems.length === 0) {
        newsContainer.innerHTML = `<p class="text-center">No news at the moment.</p>`;
        return;
      }

      cachedNews = newsItems;
      newsItems.forEach((news) => {
        const newsHTML = renderNewsCard(news);
        newsContainer.insertAdjacentHTML("beforeend", newsHTML);
      });

      // Add event listeners for interactive functionality
      addNewsCardListeners();
    })
    .catch((error) => {
      console.error(error);
      newsContainer.innerHTML = `<p class="text-center text-danger">Failed to load news. Please try again later.</p>`;
    });

}




// Function to render a news card
function renderNewsCard(news) {
  return `
    <div class="card bg-dark text-white shadow-sm mb-3 hover-shadow" data-news-id="${news.id}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold">${news.title}</h5>
        <p class="card-text">${news.content}</p>
        <button class="mt-auto btn btn-primary read-more-btn">
          Read more
        </button>

      </div>
    </div>
  `;
}


// Function to add event listeners to news cards
// function addNewsCardListeners() {
//   const newsCards = document.querySelectorAll("[data-news-id]");
//   newsCards.forEach((card) => {
//     const readMoreBtn = card.querySelector(".read-more-btn");
//     readMoreBtn.addEventListener("click", (event) => {
//       event.stopPropagation();
//       const newsId = card.getAttribute("data-news-id");
//       openNewsModal(newsId);
//     });
//   });
// }
function addNewsCardListeners() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("read-more-btn")) {
      event.stopPropagation();
      const card = event.target.closest("[data-news-id]");
      const newsId = card.getAttribute("data-news-id");
      openNewsModal(newsId);
    }
  });
}

// Function to open news modal
function openNewsModal(newsId) {
  // Find the news data
  const news = cachedNews.find((n) => n.id == newsId);
  if (!news) return;

  // Create modal content
  const modalContent = `
    <div class="modal fade" id="newsModal-${newsId}" tabindex="-1" aria-labelledby="newsModalLabel-${newsId}" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="newsModalLabel-${newsId}">${news.title}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Detailed news content -->
            <p>${news.content}</p>
            <!-- Add more details as needed -->
          </div>
          <div class="modal-footer">
            <!-- Modal actions -->
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <!-- Add more buttons if needed -->

          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal to body if not already present
  if (!document.getElementById(`newsModal-${newsId}`)) {
    document.body.insertAdjacentHTML("beforeend", modalContent);
  }

  // Show the modal
  const newsModal = new bootstrap.Modal(document.getElementById(`newsModal-${newsId}`));
  newsModal.show();
}

