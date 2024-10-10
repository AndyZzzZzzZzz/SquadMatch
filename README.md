# SquadMatch

## Description

[//]: <> (The SquadMatch project aims to create an online platform that connects university students through various sports activities. It enables students to find friends and connect based on shared interests in sports, discover mentors for one-on-one tutoring, view local competitions, and form groups for games. We identified a common issue among our peers - many enjoy sports like badminton and basketball but struggle to find peers to play with. Since no existing platform addresses this need, SquadMatch offers a perfect solution.)

Do you love sports but find it tough to track down someone to play with? You're not alone! That’s where SquadMatch steps in. We’re building an online space that not only helps you find teammates but also connects you with others who share your passion for sports. Whether you’re seeking casual games, local tournaments, or even a mentor for one-on-one training, SquadMatch has you covered. Say goodbye to endless social media searches or awkward inquiries. We’ve spotted the need, and we’re here to bring you fun, friendships, and plenty of action-packed sports!

## Feature Tracking
![image](https://github.com/user-attachments/assets/6887c952-a7f2-4170-9310-7aad58cc6d4b)

## Version History
### Version 0.1

Features:

* Home Page: displays all upcoming events, and most recent news dynamicly.
* Dashboard: displays upcoming activities for registered users. 

Features in progress:

* user profile
* club page

## Submissions 

* see iteration 1 documents [here](document/Iteration_1.md)

## Retrospective Documentation
### Scope of the Project
The goal of this project is to build a web application that connects university students for sports, drop-in games, local competitions, and other events.

### What Went Right
Our team collaborated effectively, holding two in-person meetings each week on Monday and Thursday. This kept everyone on top of the current project stage, any issues that needed to be resolved, and the implementation plans for the next phase.
The initialization of the PostgreSQL database went smoothly, and we were able to store all necessary data in a well-structured schema.
The cloud database connection worked seamlessly, allowing us to fetch data in real time and send it to the frontend for display.
The initial build of the frontend interfaces looks modern, with a clean and functional UI design.
### Challenges
Integrating the PostgreSQL database with Rails presented some challenges. We encountered an ActiveRecord error that persisted for a few days, where Rails’ prepared statements would expire, causing the website to throw an error. We eventually found a solution by disabling prepared statements in the database configuration for development mode. However, we’ll need to address this issue for future deployment.
We ran into dependency issues with the Gemfile and Ruby version when everyone was setting up Ruby on Rails individually. This was resolved through in-person collaboration, which helped us troubleshoot and sync our environments.
We also encountered some issues with inconsistent CSS rendering across different pages. Some styles appeared differently on various pages, causing layout misalignment and visual inconsistencies that stemmed from conflicting CSS classes and improper asset precompilation. To resolve this, we ensured that all CSS files were properly organized and refactored to remove redundancies. 

### Improvements for the Next Stage
Feature Expansion: We plan to include additional features, such as API integration for real-time location display, a messaging channel for user communication, and login functionality.
UI Improvement: We’re considering switching to a more modern UI framework like React or Next.js. We’re also exploring the use of JavaScript over HTML for a more dynamic frontend experience.
Comprehensive Testing: We will include more thorough tests for backend development to ensure reliability and catch issues earlier in the development cycle.


