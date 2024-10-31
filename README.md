# SquadMatch

## Description

[//]: <> (The SquadMatch project aims to create an online platform that connects university students through various sports activities. It enables students to find friends and connect based on shared interests in sports, discover mentors for one-on-one tutoring, view local competitions, and form groups for games. We identified a common issue among our peers - many enjoy sports like badminton and basketball but struggle to find peers to play with. Since no existing platform addresses this need, SquadMatch offers a perfect solution.)

Do you love sports but find it tough to track down someone to play with? You're not alone! That’s where SquadMatch steps in. We’re building an online space that not only helps you find teammates but also connects you with others who share your passion for sports. Whether you’re seeking casual games, local tournaments, or even a mentor for one-on-one training, SquadMatch has you covered. Say goodbye to endless social media searches or awkward inquiries. We’ve spotted the need, and we’re here to bring you fun, friendships, and plenty of action-packed sports!

## Version History
### Version 0.2
#### Features:

- **Home Page**: Showcases all recently added events, with details like event name, host name, host organizations, event type (competition or drop-in session), sports category, current participants, date and time, location, and capacity. Events are dynamically fetched from cloud databases and sorted chronologically, with the newest events displayed first.
 <p align="center">
  <img src="https://github.com/user-attachments/assets/0450fcbb-292a-417a-9c94-d834e180ca1c" alt="gif1">
</p>
  
  - **Search and Filter Bar**: Provides a search and filter bar above the events list. Users can search events by keywords, including event name, host, and organization name. They can also filter events based on categories, host names, clubs, and locations for a more tailored experience.
  
  - **News and Updates**: A news section on the left side of the homepage displays the latest updates and announcements, fetched dynamically from the database. Each news item includes a brief description and a "read more" option.
  
  - **Modal Pop-Ups**: Each event and news item is associated with a pop-up modal that provides a more detailed description, allowing users to explore more specific information about events or news items.

- **Navbar**: A responsive navigation bar that provides quick access to key sections of the app. It displays options for Home, Dashboard, Clubs, Login, and Register when the user is not logged in. Once logged in, the Login and Register buttons are replaced with Profile and Logout options, creating a seamless experience.

- **Dashboard**: A personalized hub displaying all upcoming activities the logged-in user is registered for, sorted by date with the most imminent events at the top. The Dashboard is secured and accessible only to logged-in users; non-logged-in users are redirected to the login page. Users can search and filter their own events using the same options available on the homepage for consistency.

- **User Profile**: Provides an overview of the user’s profile, including their profile picture, username, registered email, and a personalized biography. Users have the option to edit their profile details and delete their account if they choose.
 <p align="center">
  <img src="https://github.com/user-attachments/assets/e28d54f3-4b10-4fc6-a1f9-9ff47953340b" alt="gif2">
</p>
- **Register/Login**: The registration page collects essential user information to create an account. It includes validation to ensure the username and email are unique, the email is valid, and the password meets minimum length requirements. The login page accepts username and password, with server-side validation. Upon successful login, users are directed to their Dashboard.
<p align="center">
  <img src="https://github.com/user-attachments/assets/00a174d0-b373-4634-a3eb-4a6b0812aebc" alt="gif3">
</p>
#### Features in Progress:

- **Club Page**: A dedicated page for each club, showcasing club-specific details, including a description, management team, current members, and upcoming events like competitions, trivia, and gatherings. This page will provide users with a central hub to explore and connect with clubs.

- **UI/UX Enhancements**: Planned improvements for the user experience on the login, registration, and profile pages, aiming to make interactions more intuitive and visually appealing.

- **Enhanced Dashboard**: Redesigning the user dashboard into a calendar-like format for a more organized and visually distinct experience from the homepage. Users will be able to specify personalized events on specific dates.

- **Extended User Profile**: Adding new functionality to the user profile page, including tracking achievements, displaying clubs the user has joined, and listing recent events they've attended. These enhancements will make profiles more dynamic and engaging.

- **Extended User Functionality**: Adding new functionality to allow the user to join events from home page. Joined event will then appears on the user's dashboard.

- **Google Maps API Integration**: Planning to incorporate Google Maps API to display event locations in a map view within pop-up modals, giving users a visual reference for event locations.

---

### Version 0.1
#### Features:
- **Home Page**: Displays all recently added events with logos, descriptions, number of participants, and capacities. Events are fetched dynamically from cloud databases and sorted by time, with the most recent event displayed first.
  
- **News Page**: Displays all recent news, dynamically fetched from cloud databases.
  
- **Navbar**: Helps users navigate between different pages.

- **Dashboard**: Displays upcoming activities for registered users, sorted by time with the most recent events displayed first.

#### Features in Progress:
- **User Profile**: Displays user information, achievements, and clubs a particular user is registered with, along with their profile photo.

- **Club Page**: Displays information for specific clubs, including descriptions, management teams, and current members.


## Feature Tracking 

![image](https://github.com/user-attachments/assets/206247d5-ab2e-4df2-b6a3-0fd4c6b2dfab)
![image](https://github.com/user-attachments/assets/a8aa9361-2241-423c-a3dd-17cf31172f64)

## Dependencies

**SquadMatch** is built with Ruby on Rails, React.js, and PostgreSQL.

To run the application locally, **SquadMatch** requires:
- **Ruby** 3.1.6
- **Rails** 7.2.1
- **PostgreSQL** (as the database for Active Record)

Core dependencies managed in the `Gemfile` include:

- **Backend Essentials**:
  - `pg` - PostgreSQL database support
  - `puma` - Web server for handling requests
  - `bcrypt` - Password encryption
  - `dotenv-rails` - Environment variable management (for development and testing)

- **JavaScript and Frontend**:
  - `importmap-rails` - Manage JavaScript dependencies
  - `turbo-rails` and `stimulus-rails` - Enable interactivity and faster page loads
  - `jbuilder` - Build JSON responses

- **Development and Testing Tools**:
  - `rubocop` - Code style checks
  - `brakeman` - Security scanner
  - `web-console` - Debugging in development
  - `capybara` and `selenium-webdriver` - Integration testing

---

### How to Run SquadMatch Locally

1. **Install dependencies**:
   ```bash
   bundle install
   ```
2. **Set up environment variables**:
   Create a `.env` file in the root directory with necessary environment variables if using `dotenv-rails`.
3. **Start the Rails server**:
   ```bash
   rails server
   ```
4. **Access the application**:
   Open http://localhost:3000 in your browser.


## Retrospective Documentation

### Scope of the Project
The goal of this project is to develop a web application that connects university students for sports, drop-in games, local competitions, and other social events.

### What Went Right
Our team maintained effective communication and teamwork throughout the last iteration. We successfully held two weekly in-person meetings, with an option to switch to online meetings when necessary for individual team members.

Key improvements included:
- **Code Refactoring**: We refactored most of the codebase, breaking down the main CSS stylesheet into modular sections. This approach improved manageability and will make future styling work more efficient and consistent.
  
- **Dynamic Content with JavaScript**: We converted dynamic HTML code to JavaScript, resulting in a shorter and more maintainable HTML file. Leveraging JavaScript also allowed us to better handle dynamic content loading on the site.

- **Local Storage Caching**: We implemented caching in local storage to reduce unnecessary latency by avoiding repetitive data requests from the remote database. This optimization significantly improved loading times for users.

- **Authentication System**: We implemented login authentication, which allowed us to test more realistic user interactions and scenarios effectively.

### Challenges
We encountered a few challenges during this iteration:

- **Local Storage Caching**: While caching improved load times, ensuring it didn’t interfere with personalized user events on login required careful handling.

- **PostgreSQL Database in Testing**: Using a PostgreSQL database presented issues in the testing environment, particularly with Rails struggling to drop the remote database for tests. We have not yet identified an optimal solution, so for now, we are running individual test cases manually.

- **Code Synchronization**: Modularizing the codebase brought some challenges, as keeping JavaScript files, CSS documents, and HTML scripts synchronized occasionally led to minor conflicts and routing issues within Rails.

- **Deployment**: Deployment has been challenging, with issues similar to an active database connection problem. Our initial attempt on Heroku encountered an “app crashed” message, and we’re investigating solutions to make the deployment process more reliable.

### Improvements for the Next Stage

- **Feature Expansion**: We plan to integrate Google Maps API to display event locations on the event modal, giving users a better visual reference. We also aim to enhance user profiles, making them more descriptive and interactive, and strengthen security in the login and registration features, with more secure password encryption.

- **UI Improvements**: We aim to modernize the UI for the login, registration, and profile pages, adopting a more appealing and user-friendly design. Additionally, we’re planning a prototype for the clubs page to display various clubs and members and updating the user dashboard with a calendar-style layout.

- **Debugging**: We’ll focus on resolving existing console bugs, such as minor import and syntax errors. We also want to address the active database connection issue to improve isolated testing, development, and deployment environments. We are looking into deployment issues and hope to establish a more stable deployment process.

- **Comprehensive Testing**: Our goal is to expand automated test coverage for both backend and frontend components, ensuring robust functionality across various areas of the application.


## Tests
### Cloud Database Testing and Front-End Validation
Conducted thorough testing of cloud-stored data, ensuring accurate retrieval and proper display during website development mode. Verified that all information is correctly presented on the front-end, maintaining data integrity and consistency.
![image](https://github.com/user-attachments/assets/5152a2ee-cd0a-4888-9f81-091ae1b58f72)

### HomeController Test: Ensuring Successful Response for HTTP GET Request
![image](https://github.com/user-attachments/assets/38d0924b-5487-4f79-b338-b07e591df435)
Create a controller test file for the HomeController to validate that the root URL responds successfully. This test will simulate an HTTP GET request to the root path and include assertions to verify that the response status is successful (HTTP status code 200).

### Database Behavior Testing with Mock Data in Fixtures
![image](https://github.com/user-attachments/assets/f1e1d2a4-1f30-4036-a3b7-dadca8329236)
Created mock data under the fixture files to simulate and test database behavior in the test environment. This ensures that the test cases have access to predefined data, allowing validation of database interactions, queries, and relationships without affecting the actual production data.











