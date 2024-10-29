// let cachedEvents = [];

// document.addEventListener("turbo:load", () => {
//   initializeEvents2();
// });

// function initializeEvents2() {
//     const eventsContainer2 = document.getElementById("events-container2");
  
//     eventsContainer2.innerHTML = "";
  
//     fetch("/api/events")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch events");
//         }
//         return response.json();
//       })
//       .then((eventsJson) => {
//         if (eventsJson.length === 0) {
//           eventsContainer2.innerHTML = "<p> There are no upcoming events <p>";
//           return;
//         }
//         eventsJson.forEach((event) => {
//           const eventHTML = renderEventDashCard(event);
//           eventsContainer2.insertAdjacentHTML("beforeend", eventHTML);
          
//       });
  
//       addEventDashCardListeners(eventsJson);
//       })
//       .catch((error) => {
//           if (error.message === "Failed to fetch events"){
//               console.error("Error fetching events:", error);
//               eventsContainer2.innerHTML="<p> There is an error fetching events </p>"
//           }
//           else
//               eventsContainer2.innerHTML="<p> Technical error </p>"
//       })
//   }

// // Function to render an event card
// function renderEventDashCard(event) {
//   const eventDate = new Date(event.event_datetime).toLocaleString();
//   const eventType = event.event_type || {};
//   const eventTypeName = eventType.type_name || "Event";

//   return `
//     <article class="card custom-card mb-3 hover-shadow" role="article" data-event-id="${event.id}">
//       <div class="card-body">
//         <div class="d-flex justify-content-between align-items-center">
//           <h5 class="card-title">${event.title}</h5>
//           <div class="event-details-right">
//             <h6 class="card-subtitle mb-0">Type: ${eventTypeName}</h6>
//             <h6 class="card-subtitle">Sport: ${event.category.name}</h6>
//           </div>
//         </div>

//         <div class="d-flex justify-content-between align-items-center">
//           <p class="card-text">Hosted by: ${event.host.first_name} ${event.host.last_name}</p>
//           <p class="card-text"><i class="bi bi-person-standing"></i> ${event.capacity} participants</p>
//         </div>

//         ${event.club ? `
//         <div class="d-flex justify-content-between align-items-center">
//           <p class="card-text">Organized by: ${event.club.club_name}</p>
//           <p class="card-text"><i class="bi bi-geo icon-blue"></i> ${event.location}</p>
//         </div>` : ""}

//         <div class="d-flex">
//           <p class="card-text"><i class="bi bi-calendar-event icon-yellow"></i> ${eventDate}</p>
//         </div>
//       </div>

//       <footer class="card-footer custom-card-footer">
//         <div class="d-flex align-items-center">
//           <span class="me-2">Current Users:</span>
//           <div class="d-flex">
//             <div class="avatar me-2 d-flex justify-content-center align-items-center">AB</div>
//             <div class="avatar d-flex justify-content-center align-items-center">CD</div>
//           </div>
//         </div>
//       </footer>
//     </article>
//   `;
// }

// // Function to add event listeners to event cards
// function addEventDashCardListeners(eventsJson) {
//     const eventsContainer2 = document.getElementById("events-container2");
  
//     eventsContainer2.addEventListener("click", (event) => {
//       const card = event.target.closest("[data-event-id]");
//       if (card) {    
//         const eventId = parseInt(card.getAttribute("data-event-id"));
//         function x(event){
//             return event.id === eventId;
//         }
//         function getEventbyID(eventId){
//             return eventsJson.find(x);
//         }
//         const selected = getEventbyID(eventId);
        
//         openEventModal2(selected);
//       }
//     });
// }
  

// // Function to open event modal
// function openEventModal(eventId) {
//   const event = cachedEvents.find((e) => e.id == eventId);
//   if (!event) return;

//   document.getElementById("eventModalLabel").textContent = event.title;
//   document.getElementById("eventModalBody").textContent = event.description;

//   const eventModal = new bootstrap.Modal(document.getElementById("event-modal"));
//   eventModal.show();
// }

























// /// CODE FOR POP UP WINDOWS, REPLACED WITH BOOTSTRAP MODEL

// function initializeEvents2() {
//     const eventsContainer2 = document.getElementById("events-container2");
  
//     eventsContainer2.innerHTML = "";
  
//     fetch("/api/events")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch events");
//         }
//         return response.json();
//       })
//       .then((eventsJson) => {
//         if (eventsJson.length === 0) {
//           eventsContainer2.innerHTML = "<p> There are no upcoming events <p>";
//           return;
//         }
//         eventsJson.forEach((event) => {
//           const eventHTML = renderEventDashCard(event);
//           eventsContainer2.insertAdjacentHTML("beforeend", eventHTML);
          
//       });
  
//     //   addEventDashCardListeners(exentsJson);
//       })
//       .catch((error) => {
//           if (error.message === "Failed to fetch events"){
//               console.error("Error fetching events:", error);
//               eventsContainer2.innerHTML="<p> There is an error fetching events </p>"
//           }
//           else
//               eventsContainer2.innerHTML="<p> Technical error </p>"
//       })
//   }
  
// function renderEventDashCard(event) {
//   const eventDate = new Date(event.event_datatime).toLocaleString();
//   const eventType = event.event_type || {};
//   const eventTypeName = event.event_type.type_name || "Event";

//   return `
//         <div class="card bg-dark text-white shadow-sm mb-3 hover-shadow" data-event-id="${event.id}">        
//             <div class="card-body d-flex">
//                 <div class = "event-details">
//                     <h5 class="card-title fw-bold"> ${event.title}</h5>
//                     <h6 class="card-subtitle mb-2"> ${eventTypeName} </h6>
//                     <p class="btn btn-primary mt-2 mb-2"><i class="bi bi-geo"></i>  ${event.location} </p>
//                 </div>
//             </div>

//             <footer class="card-footer bg-footer border-top border-secondary">
//                 <div class="d-flex align-items-center">
//                     <span class="me-2">Current Users:</span>            
//                     <div class="d-flex">
//                         <div class="avatar d-flex justify-content-center align-items-center me-2" style="width: 35px; height: 35px; border-radius: 50%;">AB</div>
//                         <div class="avatar d-flex justify-content-center align-items-center" style="width: 35px; height: 35px; border-radius: 50%;">CD</div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     `;
// }


// // Function to add event listeners to event cards
// function addEventDashCardListeners(eventsJson) {
//     const eventsContainer2 = document.getElementById("events-container2");
  
//     eventsContainer2.addEventListener("click", (event) => {
//       const card = event.target.closest("[data-event-id]");
//       if (card) {    
//         const eventId = parseInt(card.getAttribute("data-event-id"));
//         function x(event){
//             return event.id === eventId;
//         }
//         function getEventbyID(eventId){
//             return eventsJson.find(x);
//         }
//         const selected = getEventbyID(eventId);
        
//         openEventModal2(selected);
//       }
//     });
// }
  
  
//   function openEventModal2(event) {
//     // const modalId = `eventModal-${eventId}`;
//     let modalElement = document.getElementById("modal-container");
//     modalElement.innerHTML = "";
//     modalContent = `
//         <div aria-hidden="true">
//             <div>
//                 <div>
//                     <!-- Modal header displaying event title and type -->
//                     <div class="d-flex justify-content-between">
//                         <h5> ${event.title} </h5>
//                         <h5 class="muted-text"> ${event.event_type.type_name} </h5>
//                     </div>
                    
//                     <!-- Modal body displaying detailed event information -->
//                     <div>
//                         <div>
//                             <!-- Event host's name -->
//                             <p> Hosted by: ${event.host.first_name} ${event.host.last_name} </p>
//                             <p> <i class="bi bi-person-standing"></i> ${event.capacity} </p> 
//                             <p> <i class="bi bi-geo icon-blue"></i> ${event.location} </p>
//                         </div>
//                         <div class="mt-4">
//                             <!-- Event description -->
//                             <p><span class="muted-text"> Note:</span> ${event.description}</p>
//                         </div>
//                     </div>
//                     <!-- Modal footer with a close button -->
//                     <div class="modal-footer d-flex justify-content-end align-items-center">
//                         <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//     `

//     modalElement.insertAdjacentHTML("beforeend", modalContent);

  
//   }
  


let cachedEvents = [];

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

      // Overwrite event array
      cachedEvents = events;

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
  const eventTypeName = eventType.type_name || "Event";

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