# SquadMatch

## Description

[//]: <> (The SquadMatch project aims to create an online platform that connects university students through various sports activities. It enables students to find friends and connect based on shared interests in sports, discover mentors for one-on-one tutoring, view local competitions, and form groups for games. We identified a common issue among our peers - many enjoy sports like badminton and basketball but struggle to find peers to play with. Since no existing platform addresses this need, SquadMatch offers a perfect solution.)

Do you love sports but find it tough to track down someone to play with? You're not alone! That’s where SquadMatch steps in. We’re building an online space that not only helps you find teammates but also connects you with others who share your passion for sports. Whether you’re seeking casual games, local tournaments, or even a mentor for one-on-one training, SquadMatch has you covered. Say goodbye to endless social media searches or awkward inquiries. We’ve spotted the need, and we’re here to bring you fun, friendships, and plenty of action-packed sports!

## Project Demo
![image](https://github.com/user-attachments/assets/98241799-255c-4c97-a542-cd1e0b51ca6f)
![image](https://github.com/user-attachments/assets/bbcc4f2a-8a43-4dfc-b8fc-1a8d332141cc)
![image](https://github.com/user-attachments/assets/75f736d7-038d-467b-9b5d-bee0057f7323)


## Feature Tracking
![image](https://github.com/user-attachments/assets/6887c952-a7f2-4170-9310-7aad58cc6d4b)
![image](https://github.com/user-attachments/assets/9b49df4a-763e-4315-9763-1354cba1a6b2)


## Version History
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

## Submissions 

* Checkout our notes for iteration 1 document [here](document/Iteration_1.md)

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


