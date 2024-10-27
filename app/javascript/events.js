let cachedEvents = JSON.parse(localStorage.getItem("cachedEvents")) || [];

document.addEventListener("turbo:load", () => {
  if (cachedEvents.length > 0) {
    renderEvents(cachedEvents); // Render from cache immediately
  } else {
    initializeEvents(); // Fetch events if not in cache
  }
});

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((event, index) => event.id === arr2[index].id);
}

function initializeEvents() {
    const eventsContainer = document.getElementById("events-container");
    const loadingMessage = document.getElementById("loading-message");
    
    // Show the loading message and clear previous content
    loadingMessage.style.display = "block";
    eventsContainer.innerHTML = "";
  
    // Fetch events from the API
    fetch("/api/events")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((events) => {
        // Hide the loading message
        loadingMessage.style.display = "none";
        
        if (arraysAreEqual(events, cachedEvents)) return; 
        

        //overwirte event array
        cachedEvents = events;
        localStorage.setItem("cachedEvents", JSON.stringify(events)); // Save to local storage

        renderEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        loadingMessage.style.display = "none"; // Hide loading message on error
        eventsContainer.innerHTML = `<p class="text-center text-danger">Failed to load events. Please try again later.</p>`;
      });
  }
  
  function renderEvents(events) {
    const eventsContainer = document.getElementById("events-container");
  
    eventsContainer.innerHTML = ""; // Clear the container
  
    if (events.length === 0) {
      eventsContainer.innerHTML = `<p class="text-center">No upcoming events at the moment. Please check back later!</p>`;
      return;
    }
  
    // Render each event card
    events.forEach((event) => {
      const eventHTML = renderEventCard(event);
      eventsContainer.insertAdjacentHTML("beforeend", eventHTML);
    });
  
    addEventCardListeners(); 
  }

  
  // Function to render an event card
  function renderEventCard(event) {
    const eventDate = new Date(event.event_datetime).toLocaleString();
  
    // Provide default values if event_type or icon is missing
    const eventType = event.event_type || {};
    const eventTypeName = eventType.type_name || 'Event';
  
    return `
      <article class="card custom-card mb-3 hover-shadow" role="article" data-event-id="${event.id}">
    <div class="card-body">
      <!-- Title and Subtitles (Aligned Left and Right) -->
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">${event.title}</h5>
        <div class="event-details-right">
          <h6 class="card-subtitle mb-0">Type: ${eventTypeName}</h6>
          <h6 class="card-subtitle">Sport: ${event.category.name}</h6>
        </div>
      </div>

        <!-- Row 1: Hosted By & Participants -->
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-text">Hosted by: ${event.host.first_name} ${event.host.last_name}</p>
          <p class="card-text"><i class="bi bi-person-standing"></i> ${event.capacity} participants</p>
        </div>

        <!-- Row 2: Organized By & Location -->
        ${event.club ? `
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-text">Organized by: ${event.club.club_name}</p>
          <p class="card-text"><i class="bi bi-geo icon-blue"></i> ${event.location}</p>
        </div>` : ""}

        <!-- Row 3: Date and Time -->
        <div class="d-flex">
          <p class="card-text"><i class="bi bi-calendar-event icon-yellow"></i> ${eventDate}</p>
        </div>
      </div>

      <footer class="card-footer custom-card-footer">
        <div class="d-flex align-items-center">
          <span class="me-2">Current Users:</span>
          <div class="d-flex">
            <div class="avatar me-2 d-flex justify-content-center align-items-center">AB</div>
            <div class="avatar d-flex justify-content-center align-items-center">CD</div>
          </div>
        </div>
      </footer>
    </article>
  `;
}

// Function to add event listeners to event cards
function addEventCardListeners() {
  const eventsContainer = document.getElementById("events-container");

  eventsContainer.addEventListener("click", (event) => {
    const card = event.target.closest("[data-event-id]");
    if (card) {
      const eventId = card.getAttribute("data-event-id");
      openEventModal(eventId);
    }
  });
}

// Function to open event modal
function openEventModal(eventId) {
  const event = cachedEvents.find((e) => e.id == eventId);
  if (!event) return;

  // Update modal content
  document.getElementById("eventModalLabel").textContent = event.title;
  document.getElementById("eventModalBody").textContent = event.description;

  // Show the modal using Bootstrap's modal functionality
  const eventModal = new bootstrap.Modal(document.getElementById("event-modal"));
  eventModal.show();
}