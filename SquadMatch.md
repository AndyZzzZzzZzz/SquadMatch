# SquadMatch

**SquadMatch** is a platform designed to connect university students with peers to participate in sports, local events, and competitions. Users can host events, join events created by others, build customizable profiles, and create or join clubs to foster community and engagement.

---

## Features
- **Host and Join Events**: Create events and invite others, or browse and join events hosted by other users.
- **Personalized Profiles**: Customize your profile to share interests, achievements, and activity preferences.
- **Club Hosting and Joining**: Create or join clubs to engage with like-minded students and participate in group events.

---

## Tech Stack Overview 

### Ruby on Rails (Backend Framework)
Ruby on Rails powers the backend of SquadMatch, providing a robust and flexible framework for building scalable web applications. Rails’ MVC architecture simplifies server-side logic, making it efficient to manage user data, authentication, and events.

### HTML (Page Structure)
HTML forms the foundational structure of each page in SquadMatch, organizing elements and defining sections for content. It serves as the backbone of the user interface.

### CSS & Bootstrap (Styling and UI Components)
CSS and Bootstrap are used together for styling the interface:
- **Bootstrap** provides ready-to-use components for quick styling, ensuring a clean, consistent design.
- **Custom CSS** allows for detailed, unique styling to better match the platform’s brand and user experience goals.

### JavaScript (Client-Side Programming)
JavaScript adds interactivity to the platform, managing dynamic elements like event interactions, profile updates, and notifications on the client side.

### Heroku (Deployment Platform)
Heroku is used to deploy SquadMatch, making it accessible to users anytime. It supports the Rails environment well and allows for easy scaling and maintenance.

### PostgreSQL (Database)
PostgreSQL serves as the relational database for storing user data, events, clubs, and other critical information. The database is hosted on Supabase, which provides a scalable and secure environment.

---

## Technology Details

### Rails
Ruby on Rails is a powerful backend framework that follows the MVC (Model-View-Controller) design pattern, organizing application logic into three interconnected components:
- **Model**: Represents the data and business logic. Rails' `models` folder defines the database schema and applies built-in validation methods, ensuring data integrity and consistency.
- **View**: Manages the user interface and presentation of data. The `views` folder contains HTML templates and integrates JavaScript for dynamic, responsive elements.
- **Controller**: Acts as the intermediary between the Model and View, processing user requests, retrieving data, and rendering the appropriate views. Each HTML file is associated with a controller (inside the `controllers` folder) that manages this interaction, linking user actions to the backend logic.

Rails also emphasizes **Convention over Configuration**, which reduces the number of decisions developers need to make by following standard conventions. This approach minimizes the need for extensive configuration files and simplifies development by providing sensible defaults, allowing developers to focus on core functionality.

In our application, we leverage Rails' built-in **validation** functionality to ensure data integrity and consistency before any user input is saved to the database. By adding validations directly in model files, such as user.rb, we can enforce specific data requirements, reducing the risk of invalid or incomplete data being stored.

For example, in `user.rb`, we validate user registration information, ensuring that users meet certain criteria when creating a password:
```
   validates :password,
                presence: { message: "Password can't be blank" },
                length: { minimum: 6, message: "Password must be at least 6 characters long" },
                if: :password_digest_changed?
```

### Turbo
With Turbo, we can achieve the speed and responsiveness of a Single Page Application (SPA) while maintaining multiple pages. Turbo optimizes page transitions by only updating parts of the page that have changed (caching part of the page), reducing full-page reloads and enhancing performance. 

In our project, Turbo enables smooth interactions with event filters and search functionality:
```
document.addEventListener("turbo:load", initializeHome);
document.addEventListener('turbo:before-cache', function() {
  // Reset event listeners before caching
  refreshButtonListenerAdded = false;
  document.getElementById("refresh-button")?.removeEventListener("click", refreshEvents);
});
```
When users filter or search events, Turbo allows us to cache previously loaded events and immediately display filtered results without a page reload. This provides a faster, smoother user experience by dynamically loading only what’s necessary.

### localStorage
We utilize `localStorage` to enhance performance and personalize the user experience by caching event data and user information directly in the web browser. This approach minimizes database calls, as data is only fetched from the server under specific conditions, such as:
- When the user clicks the refresh button.
- When a new event is created or updated.
- When the backend triggers a refresh after a set interval (e.g., every 10 minutes) **Not implemented yet**.
By caching events in localStorage, the page can quickly display previously fetched data without needing a full reload or API call, resulting in faster load times and reduced server load.

Additionally, we store the current logged-in user’s ID in localStorage. This enables us to display user-specific events across multiple pages without re-fetching data or re-verifying the user’s identity on every page load. This cached ID allows for a seamless experience, showing only relevant events based on the user’s preferences and access level.

### iFrame 
We used an inline frame (iFrame) to embed external content, such as Google Maps, directly into the event modal. An iFrame allows us to display a separate HTML document within a section of our page, maintaining its own context and functionality without disrupting the main page's structure. The iFrame functions as "window" to external resources.

---

## Functionality Details

### How did you set up the database schema?

### How did you manage to achieve user registration and login?
In our user registration and login process, we combined client-side validation with Rails backend validation to ensure a smooth and secure experience. Here’s a step-by-step breakdown:
1. **Client-Side Validation**: We used JavaScript to handle field validations in real time. For example, in `register.js`, blur events trigger validation functions to check if fields are empty or meet minimum character requirements. This reduces unnecessary backend requests and improves user experience. Additionally, async functions check if the username and email are unique by making API calls to our Rails controller endpoints.
2. **Server-Side Validation and Error Handling**: In the UsersController, we defined actions like `check_username` and `check_email` to verify uniqueness, returning JSON responses to the client. This is essential for handling cases where users might bypass JavaScript, ensuring validation integrity.
3. **Form Submission and Feedback**: We prevent form submission if validations aren’t met. For the login process in `login.js`, we validate that both the username and password fields are filled. On the backend, LoginController authenticates the credentials, utilizing flash messages to notify users of success or errors.
4. **Session Management and Secure Storage**: Upon successful registration or login, we save the `user_id` in the session for session persistence. Additionally, we cache the user ID in `localStorage` for quick access in the client. For password security, we use Supabase’s authentication, leveraging its secure hashing mechanism for password storage and retrieval.
5. **Turbo Integration for Enhanced UX**: We integrated Turbo Streams for quick DOM updates on login errors, updating only relevant parts of the page rather than refreshing it entirely, which makes the experience faster and smoother.

### How are events being dynamically rendered on homepage?
Events are dynamically rendered on the homepage using a combination of HTML, JavaScript, and data stored in `localStorage`
1. **Initial Fetch and Cache** When the homepage loads, `initializeHome()` is triggered. The function checks `localStorage` for cached event data. If no cached data found, it makes an API request to fetch events from the server, saves them in `localStorage`, and updates `cachedEvents`.
2. **Rendering Events**: The `renderEvents()` function dynamically generates event cards based on the current dataset (from `cachedEvents` or filtered results) and inserts them into `events-container` HTML elemnt.
3. **Filtering and Searching**: Users can filter events by category, host, club, and location or search by keywords. The `filterAndRenderEvents()` function reads the filter values and search input, filters the cached events, and re-renders the matching results.
4. **Updating without Reloads**: Turbo is used to manage page transitions, so users experience smooth interactions without full-page reloads. `localStorage` is used to persist event data across sessions, reducing unnecessary API calls and improving load times.
