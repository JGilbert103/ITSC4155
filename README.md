# Niner Maintenance
A comprehensive maintenance request system for UNC Charlotte, enabling students and staff to submit, track and manage maintenance issues across campus.

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-instructions)
- [Testing](#testing)
- [Usage Details](#usage-details)
- [Team Progress](#team-progress)

## Overview
**The system allows users to:**
  1. Submit maintenance requests with details such as descriptions, locations and photos.
  2. Track the status of their requests (e.g., Open, In Progress, Resolved, Closed).
  3. Authenticate using their UNCC credentials to ensure secure acccess.
  4. Provide admins/technicians with a clear view of assigned work orders for efficient resolution.

The goal of this project is to create an organized, user-friendly, and efficient system for handling maintenance requests, contributing to a safer and more functional campus environment.

## Technologies Used
**Frontend**
- React.js
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest

## Setup Instructions
Follow these steps to set up the development environment for Niner Maintenance:
  1. *Prerequisites*
     - Java: Install the latest JDK from [Oracle](https://www.oracle.com/java/technologies/downloads/?er=221886)
     - Node: Install Node.js from [nodejs.org](https://nodejs.org/en)
     - Git: Install Git from [git-scm.com](https://git-scm.com/downloads)

  2. *Clone the Repository*
     `git clone https://github.com/JGilbert103/ITSC4155.git`

  3. *Setup Frontend and Backend*
     - Install dependencies
       `cd UNCC Ticketing\react`
       `npm install`

       `cd UNCC Ticketing\react\mongodb`
       `npm install`

     - Connect to database and start Express server
      `cd UNCC Ticketing\react\mongodb`
      `node server.js`
**The Express server will run on port 3001 by default**

     - Start server    
      `npm run dev`  
**The development server will run on port 5173 by default and can be accessed at http://localhost:5173**



## Testing
  1. Install test dependencies (if not already installed)
  `cd UNCC Ticketing\react`
  `npm install --save-dev jest @testing-library/react @testing-library/jest-dom`
  2. Run all tests
  `npm run test`

## Usage Details
**For Users**
  1. Login: Authenticate using your UNCC credentials
  2. Submit a ticket:
     - Fill out the form with necessary details
  3. Track your ticket
     - View the status of your submitted ticket
     
**For Technicians/Admins**
  1. View assigned tickets:
     - Access the admin portal to see a list of assigned work orders
  2. Update ticket status:
     - Change the status of tickets as you work on them
  3. Monitor system activity:
     - View all submitted tickets and their current statuses
  4. Manage users:
     - View and manage all users with registered account
    
### Team Progress
**Sprint 0** - Environment Setup
  - Set up the development environment for all team members
  - Installed and configured necessary tools (Java, Node.js, MySQL, Jest, Git)

**Sprint 1** - Core Features
  - Implement user login page
  - Develop ticket submission form with photo upload functionality
  - Ticket submissions store into a database
  - Develop admin and student portal with a view of the tickets

**Sprint 2** - Feature Enhancements
  - Implement access control for admins/users
  - Define database schema and verify through testing
  - Enhancements of About/Home/FAQ page
  - Error prevention for ticket submissions and login page
  - Further functionality implemented for Admin and User portal pages
  - Switched from MySQL to MongoDB
  - Started using Express API endpoints
  - Wrote first couple unit tests

**Sprint 3** - Final Touches and Further Enhancements
  - Finalize frontend design and styling
  - Implement more unit tests
  - Ensure all functionalities in the project scope are implemented 
  - Create user database and connect users to specific tickets for tracking and notifications

