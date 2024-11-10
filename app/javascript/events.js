import "@hotwired/turbo-rails"
import "controllers"
(function() {
let cachedEvents = JSON.parse(localStorage.getItem("cachedEvents")) || [];
let originalEvents = cachedEvents.slice();

let eventCardListenersAdded = false; 
let FilterSortlistenersAdded = false;

let eventModal;

document.addEventListener("turbo:load", initializeHome);
document.addEventListener("turbo:render", initializeHome);

function initializeHome() {
  eventCardListenersAdded = false; 
  FilterSortlistenersAdded = false;

  if (cachedEvents.length == 0) {
    initializeEvents();
  } else {
    renderEvents(cachedEvents); // Render from cache immediately
    populateFilters();
    addSearchAndFilterListeners();
  }
  const eventModalElement = document.getElementById("event-modal");
  if(eventModalElement){
      eventModal = new bootstrap.Modal(eventModalElement, {
      backdrop: 'static' // Explicitly setting backdrop
    });
  }

  const refreshButton = document.getElementById("refresh-button");
  if (refreshButton){
    refreshButton.addEventListener("click", refreshEvents);
  }
  
}

function populateFilters(){
  const categories = new Set();
  const hosts = new Set();
  const clubs = new Set();
  const locations = new Set();

  originalEvents.forEach(event => {
    if (event.category && event.category.name) {
      categories.add(event.category.name);
    }
    if (event.host && event.host.first_name && event.host.last_name) {
      hosts.add(`${event.host.first_name} ${event.host.last_name}`);
    }
    if (event.club && event.club.club_name) {
      clubs.add(event.club.club_name);
    }
    if (event.location) {
      locations.add(event.location);
    }
  });

    // Helper function to clear and populate select elements
    const populateSelect = (selectElement, options, placeholders) => {
      if (selectElement) {
        selectElement.innerHTML = ''; // Clear existing options
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = placeholders; // Placeholder option
        selectElement.appendChild(defaultOption);
  
        options.forEach(optionText => {
          const option = document.createElement("option");
          option.value = optionText;
          option.textContent = optionText;
          selectElement.appendChild(option);
        });
      }
    };
  
    // Populate each filter with unique values
    populateSelect(document.getElementById("category-filter"), categories, "All Categories");
    populateSelect(document.getElementById("host-filter"), hosts, "All Hosts");
    populateSelect(document.getElementById("club-filter"), clubs, "All Clubs");
    populateSelect(document.getElementById("location-filter"), locations, "All Locations");
}


function addSearchAndFilterListeners() {
  if (FilterSortlistenersAdded) return; // Prevent adding multiple listeners
  FilterSortlistenersAdded = true;


  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const hostFilter = document.getElementById("host-filter");
  const clubFilter = document.getElementById("club-filter");
  const locationFilter = document.getElementById("location-filter");

  if (searchInput) {
    searchInput.addEventListener("input", filterAndRenderEvents);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterAndRenderEvents);
  }
  if (hostFilter) {
    hostFilter.addEventListener("change", filterAndRenderEvents);
  }
  if (clubFilter) {
    clubFilter.addEventListener("change", filterAndRenderEvents);
  }
  if (locationFilter) {
    locationFilter.addEventListener("change", filterAndRenderEvents);
  }
}

function filterAndRenderEvents() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const categoryValue = document.getElementById("category-filter").value;
  const hostValue = document.getElementById("host-filter").value;
  const clubValue = document.getElementById("club-filter").value;
  const locationValue = document.getElementById("location-filter").value;

  
  let filteredEvents = originalEvents.filter(event => {
    // Check search input
    const titleMatch = event.title && event.title.toLowerCase().includes(searchInput);
    const descriptionMatch = event.description && event.description.toLowerCase().includes(searchInput);
    const searchMatch = !searchInput || titleMatch || descriptionMatch;

    // Check category filter
    const categoryMatch = !categoryValue || (event.category && event.category.name === categoryValue);

    // Check host filter
    const hostName = event.host ? `${event.host.first_name} ${event.host.last_name}` : "";
    const hostMatch = !hostValue || hostName === hostValue;

    // Check club filter
    const clubName = event.club ? event.club.club_name : "";
    const clubMatch = !clubValue || clubName === clubValue;

    // Check location filter
    const locationMatch = !locationValue || event.location === locationValue;

    return searchMatch && categoryMatch && hostMatch && clubMatch && locationMatch;
  });

  // Render filtered events
  renderEvents(filteredEvents);
}


function refreshEvents(){
  localStorage.removeItem("cachedEvents");
  cachedEvents = [];
  originalEvents = [];

  clearFilters();
  initializeEvents();
}

function clearFilters(){
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const hostFilter = document.getElementById("host-filter");
  const clubFilter = document.getElementById("club-filter");
  const locationFilter = document.getElementById("location-filter");

  if (searchInput) searchInput.value = "";
  if (categoryFilter) categoryFilter.innerHTML = `<option value="">All Categories</option>`;
  if (hostFilter) hostFilter.innerHTML = `<option value="">All Hosts</option>`;
  if (clubFilter) clubFilter.innerHTML = `<option value="">All Clubs</option>`;
  if (locationFilter) locationFilter.innerHTML = `<option value="">All Locations</option>`;

}

function initializeEvents() {

    const eventsContainer = document.getElementById("events-container");
    const loadingMessage = document.getElementById("loading-message");
    
    // Show the loading message and clear previous content
    if(loadingMessage){
      loadingMessage.style.display = "block";
    }
    if(eventsContainer){
      eventsContainer.innerHTML = "";
    }
    
  
    // Fetch events from the API
    fetch("/api/events")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((events) => {
        // Hide the loading message
        console.log("API Response:", events);
        loadingMessage.style.display = "none";
        

        //overwrite event array
        cachedEvents = events;
        originalEvents = events.slice();
        localStorage.setItem("cachedEvents", JSON.stringify(events)); // Save to local storage
        
        // Populate filters and add listeners
        populateFilters();
        addSearchAndFilterListeners();

        renderEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        loadingMessage.style.display = "none"; // Hide loading message on error
        if(eventsContainer){
          eventsContainer.innerHTML = `<p class="text-center text-danger">Failed to load events. Please try again later.</p>`;
        }
      });
  }
  
  function renderEvents(events) {
    const eventsContainer = document.getElementById("events-container");
    
    if(eventsContainer){
      eventsContainer.innerHTML = ""; // Clear the container
    }
   
    if (events.length === 0 && eventsContainer) {
      eventsContainer.innerHTML = `<p class="text-center">No upcoming events at the moment. Please check back later!</p>`;
      return;
    }
  
    // Render each event card
    events.forEach((event) => {
      const eventHTML = renderEventCard(event);
      if(eventsContainer){
        eventsContainer.insertAdjacentHTML("beforeend", eventHTML);
      }
    });
  
    addEventCardListeners(); 
  }

  function nameToAvatar(first_name, last_name) {
    const first_char = first_name ? first_name.charAt(0).toUpperCase() : "";
    const last_char = last_name ? last_name.charAt(0).toUpperCase() : "";
    
    return `<div class="avatar me-2 d-flex justify-content-center align-items-center"> ${first_char} ${last_char} </div>`
  }
  
  // Function to render an event card
  function renderEventCard(event) {
    const eventDate = new Date(event.event_datetime).toLocaleString();
  
    // Provide default values if event_type or icon is missing
    const eventType = event.event_type || {};
    const eventTypeName = eventType.type_name || 'Event';
    const loadParticipants = event.users ? event.users.map(user => nameToAvatar(user.first_name, user.last_name)).join("")
    : '<div> No participants in the event </div>';
    
    // Check if user logged in and retrieve user id
    const userId = document.body.dataset.userId;
    const loggedIn = document.body.dataset.loggedIn === 'true';
    const isParticipant = event.users && loggedIn && event.users.some(user => user.id == userId);
    // console.log("event user is participatn: ", isParticipant)

    let buttonHTML = '';
    if (loggedIn) {
      if (isParticipant) {
        buttonHTML = '<button class="btn btn-secondary join-button disabled" disabled>Joined</button>';
      } else {
        buttonHTML = '<button class="btn btn-primary join-button">Join</button>';
      }
    } else {
      buttonHTML = '<button class="btn btn-primary join-button disabled">Login to Join</button>';
    }

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
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-text"><i class="bi bi-calendar-event icon-yellow"></i> ${eventDate}</p>
          ${buttonHTML}
        </div>
      </div>

      <footer class="card-footer custom-card-footer">
        <div class="d-flex align-items-center">
          <span class="me-2">Current Users:</span>
          <div class="d-flex">
            ${loadParticipants}
          </div>
        </div>
      </footer>
    </article>
  `;
}

function handleJoinButtonClick(event, eventId) {
  event.stopPropagation(); // Prevent the card click event

  const loggedIn = document.body.dataset.loggedIn === 'true';

  if (loggedIn) {
    // Send AJAX request to join the event
    joinEvent(eventId, event.target);
  } else {
    // Display a message prompting the user to log in
    alert("Please log in to join the event.");
  }
}

function joinEvent(eventId, buttonElement) {
  // Disable the button to prevent multiple clicks
  buttonElement.disabled = true;
  buttonElement.textContent = 'Joining...';

  fetch(`/events/${eventId}/join`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify({ event_id: eventId })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      // Update the button to show that the user has joined
      buttonElement.classList.remove('btn-primary');
      buttonElement.classList.add('btn-secondary', 'disabled');
      buttonElement.disabled = true;
      buttonElement.textContent = 'Joined';
      refreshEvents();

      // Optionally, update the participant list on the card
      // updateParticipantList(eventId);
    } else {
      // Handle errors
      alert(data.message || 'An error occurred while joining the event.');
      buttonElement.disabled = false;
      buttonElement.textContent = 'Join';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while joining the event.');
    buttonElement.disabled = false;
    buttonElement.textContent = 'Join';
  });
}

// Function to add event listeners to event cards
function addEventCardListeners() {

  if (eventCardListenersAdded) return; 
  eventCardListenersAdded = true;

  const eventsContainer = document.getElementById("events-container");
  
  if(eventsContainer){
    eventsContainer.addEventListener("click", (event) => {
      const card = event.target.closest("[data-event-id]");
      if (card) {
        const eventId = card.getAttribute("data-event-id");
        if (event.target.classList.contains("join-button")) {
          handleJoinButtonClick(event, eventId);
        } else {
          openEventModal(eventId);
        }
      }
    });
  }
}

// Function to open event modal
function openEventModal(eventId) {
  const event = cachedEvents.find((e) => e.id == eventId);
  if (!event) return;

  // Update modal content
  document.getElementById("eventModalLabel").textContent = event.title;
  document.getElementById("eventModalBody").textContent = event.description;

  eventModal.show();
}
})();