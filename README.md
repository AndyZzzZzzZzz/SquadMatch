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


## Dependencies

SquadMatch it built with Ruby on Rails, React.js and PostgreSql.

To run the application locally, SquadMatch requires 
* ruby 3.1.6
* rails 7.2.1

Details of other dependencies are saved in Gemfile.

### How to run SquadMatch locally

* Run `bundle install` to ensure all dependencies are installed properly.
* Run `rails server`
* Using `http://localhost:3000/`


## Retrospective Documentation
### Scope of the Project
The goal of this project is to build a web application that connects university students for sports, drop-in games, local competitions, and other events.

### What Went Right
Our team collaborated effectively, holding two in-person meetings each week on Monday and Thursday. This kept everyone on top of the current project stage, any issues that needed to be resolved, and the implementation plans for the next phase.
The initialization of the PostgreSQL database went smoothly, and we were able to store all necessary data in a well-structured schema.
The cloud database connection worked seamlessly, allowing us to fetch data in real time and send it to the frontend for display.
The initial build of the frontend interfaces looks modern, with a clean and functional UI design.
### Challenges
Integrating the PostgreSQL database with Rails presented some challenges. We faced an ActiveRecord error that persisted for a few days, where Rails’ prepared statements would expire, causing the website to throw errors. We resolved this by disabling prepared statements in the database configuration for development mode but will need a permanent solution for deployment. 
Additionally, we ran into dependency issues with the Gemfile and Ruby version during setup. These were resolved through in-person collaboration, allowing us to troubleshoot and sync our environments.
We also encountered inconsistent CSS rendering across pages, caused by conflicting CSS classes and improper asset precompilation. Refactoring and organizing the CSS files fixed the issue.

### Improvements for the Next Stage
Feature Expansion: We plan to include additional features, such as API integration for real-time location display, a messaging channel for user communication, and login functionality.
UI Improvement: We’re considering switching to a more modern UI framework like React or Next.js. We’re also exploring the use of JavaScript over HTML for a more dynamic frontend experience.
Comprehensive Testing: We will include more thorough tests for backend development to ensure reliability and catch issues earlier in the development cycle.

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











