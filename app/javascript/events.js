document.addEventListener("turbo:load", () => {
    initializeEvents();
});

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
  
        // Check if there are events
        if (events.length === 0) {
          eventsContainer.innerHTML = `<p class="text-center">No upcoming events at the moment. Please check back later!</p>`;
          return;
        }
  
        // Render each event
        events.forEach((event) => {
          const eventHTML = renderEventCard(event);
          eventsContainer.insertAdjacentHTML("beforeend", eventHTML);
        });
  
        // Add event listeners for enhanced functionality (e.g., modals)
        addEventCardListeners();
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        loadingMessage.style.display = "none"; // Hide loading message on error
        eventsContainer.innerHTML = `<p class="text-center text-danger">Failed to load events. Please try again later.</p>`;
      });
  }
  
 
  
  // Function to render an event card
  function renderEventCard(event) {
    const eventDate = new Date(event.event_datetime).toLocaleString();
  
    // Provide default values if event_type or icon is missing
    const eventType = event.event_type || {};
    const eventTypeName = eventType.type_name || 'Event';
  
    return `
      <article class="card bg-dark text-white shadow-sm mb-3 hover-shadow" role="article" data-event-id="${event.id}">
        <div class="card-body d-flex">
          <!-- Event Icon -->
  
          <!-- Event Details -->
          <div class="event-details">
            <h5 class="card-title fw-bold">${event.title}</h5>
            <h6 class="card-subtitle mb-2 muted-text">Type: ${eventTypeName}</h6>
            <h6 class="card-subtitle mb-2 muted-text">Sport: ${event.category.name}</h6>
            <p class="card-text">Hosted by: ${event.host.first_name} ${event.host.last_name}</p>
            ${
              event.club
                ? `<p class="card-text">Organized by: ${event.club.club_name}</p>`
                : ""
            }
            <p class="card-text"><span class="muted-text">Notes: </span>${event.description}</p>
            <p class="card-text"><i class="bi bi-person-standing"></i> ${event.capacity} participants</p>
            <p class="card-text"><i class="bi bi-geo icon-blue"></i> ${event.location}</p>
            <p class="card-text"><i class="bi bi-calendar-event icon-yellow"></i> ${eventDate}</p>
          </div>
        </div>
        <!-- Card Footer -->
        <footer class="card-footer bg-footer border-top border-secondary">
          <div class="d-flex align-items-center">
            <span class="me-2">Current Users:</span>
            <div class="d-flex">
              <!-- Participant Avatars -->
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
  
  
  // Function to open event modal (enhanced functionality)
  function openEventModal(eventId) {
    const modalId = `eventModal-${eventId}`;
    let modalElement = document.getElementById(modalId);
  
    if (!modalElement) {
      const event = cachedEvents.find((e) => e.id == eventId);
      if (!event) return;
  
      const modalContent = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="eventModalLabel-${eventId}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark text-white">
              <div class="modal-header">
                <h5 class="modal-title" id="eventModalLabel-${eventId}">${event.title}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>${event.description}</p>
                <!-- Add more details as needed -->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <!-- Add more buttons if needed -->
              </div>
            </div>
          </div>
        </div>
      `;
  
      document.body.insertAdjacentHTML("beforeend", modalContent);
      modalElement = document.getElementById(modalId);
    }
  
    // Show the modal
    const eventModal = new bootstrap.Modal(modalElement);
    eventModal.show();
  }
  
  