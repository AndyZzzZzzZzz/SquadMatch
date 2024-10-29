let cachedDashEvents = JSON.parse(localStorage.getItem("cachedDashEvents")) || [];
let originalDashEvents = cachedDashEvents.slice();
let eventDashCardListenersAdded = false;
let DashFilterSortListenersAdded = false;
let eventDashModal;

document.addEventListener("turbo:load", () => {
    eventDashCardListenersAdded = false;
    DashFilterSortListenersAdded = false;
  if (cachedDashEvents.length > 0) {
    
    renderDashEvents(cachedDashEvents); // Render from cache immediately
    populateDashFilters();
    addSearchAndFilterListenersDash();
  } else {
    initializeDashEvents(); // Fetch events if not in cache
  }
  const eventModalElement = document.getElementById("event-modal-2");
  eventDashModal = new bootstrap.Modal(eventModalElement)
});

// function arraysAreEqual(arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;
//   return arr1.every((event, index) => event.id === arr2[index].id);
// }

function populateDashFilters(){
  const categories = new Set();
  const hosts = new Set();
  const clubs = new Set();
  const locations = new Set();

  originalDashEvents.forEach(event => {
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

  // Populate category filter
  const categoryFilter = document.getElementById("category-filter");
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Populate host filter
  const hostFilter = document.getElementById("host-filter");
  hosts.forEach(host => {
    const option = document.createElement("option");
    option.value = host;
    option.textContent = host;
    hostFilter.appendChild(option);
  });

  // Populate club filter
  const clubFilter = document.getElementById("club-filter");
  clubs.forEach(club => {
    const option = document.createElement("option");
    option.value = club;
    option.textContent = club;
    clubFilter.appendChild(option);
  });

  // Populate location filter
  const locationFilter = document.getElementById("location-filter");
  locations.forEach(location => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationFilter.appendChild(option);
  });
}


function addSearchAndFilterListenersDash() {
  if (DashFilterSortListenersAdded) return; // Prevent adding multiple listeners
  DashFilterSortListenersAdded = true;

  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const hostFilter = document.getElementById("host-filter");
  const clubFilter = document.getElementById("club-filter");
  const locationFilter = document.getElementById("location-filter");

  if (searchInput) {
    searchInput.addEventListener("input", filterAndRenderDashEvents);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterAndRenderDashEvents);
  }
  if (hostFilter) {
    hostFilter.addEventListener("change", filterAndRenderDashEvents);
  }
  if (clubFilter) {
    clubFilter.addEventListener("change", filterAndRenderDashEvents);
  }
  if (locationFilter) {
    locationFilter.addEventListener("change", filterAndRenderDashEvents);
  }
}

function filterAndRenderDashEvents() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const categoryValue = document.getElementById("category-filter").value;
  const hostValue = document.getElementById("host-filter").value;
  const clubValue = document.getElementById("club-filter").value;
  const locationValue = document.getElementById("location-filter").value;

  
  let filteredEvents = originalDashEvents.filter(event => {
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
  renderDashEvents(filteredEvents);
}

function initializeDashEvents() {

    const eventsContainer = document.getElementById("events-container2");
    const loadingMessage = document.getElementById("loading-message2");
    
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
        console.log("API Response:", events);
        loadingMessage.style.display = "none";
        
        if (arraysAreEqual(events, cachedDashEvents)) return; 
        

        //overwrite event array
        cachedDashEvents = events;
        originalDashEvents = events.slice();
        localStorage.setItem("cachedDashEvents", JSON.stringify(events)); // Save to local storage
        
        // Populate filters and add listeners
        populateDashFilters();
        addSearchAndFilterListenersDash();

        renderDashEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        loadingMessage.style.display = "none"; // Hide loading message on error
        eventsContainer.innerHTML = `<p class="text-center text-danger">Failed to load events. Please try again later.</p>`;
      });
  }
  
  function renderDashEvents(events) {
    const eventsContainer = document.getElementById("events-container2");
  
    eventsContainer.innerHTML = ""; // Clear the container
  
    if (events.length === 0) {
      eventsContainer.innerHTML = `<p class="text-center">No upcoming events at the moment. Please check back later!</p>`;
      return;
    }
  
    // Render each event card
    events.forEach((event) => {
      const eventHTML = renderDashEventCard(event);
      eventsContainer.insertAdjacentHTML("beforeend", eventHTML);
    });
  
    addDashEventCardListeners(); 
  }

  function nameToAvatar(first_name, last_name) {
    const first_char = first_name ? first_name.charAt(0) : "";
    const last_char = last_name ? last_name.charAt(0) : "";
    
    return `<div class="avatar me-2 d-flex justify-content-center align-items-center"> ${first_char} ${last_char} </div>`
  }
  // Function to render an event card
  function renderDashEventCard(event) {
    const eventDate = new Date(event.event_datetime).toLocaleString();
  
    // Provide default values if event_type or icon is missing
    const eventType = event.event_type || {};
    const eventTypeName = eventType.type_name || 'Event';

    const loadParticipants = event.users ? event.users.map(user => nameToAvatar(user.first_name, user.last_name)).join("")
    : '<div> No participants in the event </div>';
  
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
            ${loadParticipants}
          </div>
        </div>
      </footer>
    </article>
  `;
}

// Function to add event listeners to event cards
function addDashEventCardListeners() {
    if (eventDashCardListenersAdded) return;
    eventDashCardListenersAdded = true;


  const eventsContainer = document.getElementById("events-container2");
  
  eventsContainer.addEventListener("click", (event) => {
    const card = event.target.closest("[data-event-id]");
    if (card) {
      const eventId = card.getAttribute("data-event-id");
      openEventModal2(eventId);
    }
  });
}

// Function to open event modal
function openEventModal2(eventId) {
  const event = cachedDashEvents.find((e) => e.id == eventId);
  if (!event) return;

  // Update modal content
  document.getElementById("eventModalLabel").textContent = event.title;
  document.getElementById("eventModalBody").textContent = event.description;

  eventDashModal.show();
}






















// // /// CODE FOR POP UP WINDOWS, REPLACED WITH BOOTSTRAP MODEL

// // function initializeEvents2() {
// //     const eventsContainer2 = document.getElementById("events-container2");
  
// //     eventsContainer2.innerHTML = "";
  
// //     fetch("/api/events")
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch events");
// //         }
// //         return response.json();
// //       })
// //       .then((eventsJson) => {
// //         if (eventsJson.length === 0) {
// //           eventsContainer2.innerHTML = "<p> There are no upcoming events <p>";
// //           return;
// //         }
// //         eventsJson.forEach((event) => {
// //           const eventHTML = renderEventDashCard(event);
// //           eventsContainer2.insertAdjacentHTML("beforeend", eventHTML);
          
// //       });
  
// //     //   addEventDashCardListeners(exentsJson);
// //       })
// //       .catch((error) => {
// //           if (error.message === "Failed to fetch events"){
// //               console.error("Error fetching events:", error);
// //               eventsContainer2.innerHTML="<p> There is an error fetching events </p>"
// //           }
// //           else
// //               eventsContainer2.innerHTML="<p> Technical error </p>"
// //       })
// //   }
  
// // function renderEventDashCard(event) {
// //   const eventDate = new Date(event.event_datatime).toLocaleString();
// //   const eventType = event.event_type || {};
// //   const eventTypeName = event.event_type.type_name || "Event";

// //   return `
// //         <div class="card bg-dark text-white shadow-sm mb-3 hover-shadow" data-event-id="${event.id}">        
// //             <div class="card-body d-flex">
// //                 <div class = "event-details">
// //                     <h5 class="card-title fw-bold"> ${event.title}</h5>
// //                     <h6 class="card-subtitle mb-2"> ${eventTypeName} </h6>
// //                     <p class="btn btn-primary mt-2 mb-2"><i class="bi bi-geo"></i>  ${event.location} </p>
// //                 </div>
// //             </div>

// //             <footer class="card-footer bg-footer border-top border-secondary">
// //                 <div class="d-flex align-items-center">
// //                     <span class="me-2">Current Users:</span>            
// //                     <div class="d-flex">
// //                         <div class="avatar d-flex justify-content-center align-items-center me-2" style="width: 35px; height: 35px; border-radius: 50%;">AB</div>
// //                         <div class="avatar d-flex justify-content-center align-items-center" style="width: 35px; height: 35px; border-radius: 50%;">CD</div>
// //                     </div>
// //                 </div>
// //             </footer>
// //         </div>
// //     `;
// // }


// // // Function to add event listeners to event cards
// // function addEventDashCardListeners(eventsJson) {
// //     const eventsContainer2 = document.getElementById("events-container2");
  
// //     eventsContainer2.addEventListener("click", (event) => {
// //       const card = event.target.closest("[data-event-id]");
// //       if (card) {    
// //         const eventId = parseInt(card.getAttribute("data-event-id"));
// //         function x(event){
// //             return event.id === eventId;
// //         }
// //         function getEventbyID(eventId){
// //             return eventsJson.find(x);
// //         }
// //         const selected = getEventbyID(eventId);
        
// //         openEventModal2(selected);
// //       }
// //     });
// // }
  
  
// //   function openEventModal2(event) {
// //     // const modalId = `eventModal-${eventId}`;
// //     let modalElement = document.getElementById("modal-container");
// //     modalElement.innerHTML = "";
// //     modalContent = `
// //         <div aria-hidden="true">
// //             <div>
// //                 <div>
// //                     <!-- Modal header displaying event title and type -->
// //                     <div class="d-flex justify-content-between">
// //                         <h5> ${event.title} </h5>
// //                         <h5 class="muted-text"> ${event.event_type.type_name} </h5>
// //                     </div>
                    
// //                     <!-- Modal body displaying detailed event information -->
// //                     <div>
// //                         <div>
// //                             <!-- Event host's name -->
// //                             <p> Hosted by: ${event.host.first_name} ${event.host.last_name} </p>
// //                             <p> <i class="bi bi-person-standing"></i> ${event.capacity} </p> 
// //                             <p> <i class="bi bi-geo icon-blue"></i> ${event.location} </p>
// //                         </div>
// //                         <div class="mt-4">
// //                             <!-- Event description -->
// //                             <p><span class="muted-text"> Note:</span> ${event.description}</p>
// //                         </div>
// //                     </div>
// //                     <!-- Modal footer with a close button -->
// //                     <div class="modal-footer d-flex justify-content-end align-items-center">
// //                         <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
// //                     </div>
                    
// //                 </div>
// //             </div>
// //         </div>
// //     `

// //     modalElement.insertAdjacentHTML("beforeend", modalContent);

  
// //   }
  