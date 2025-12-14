La Grande Soirée Gnawa – Mobile & API Project
* Project Overview

This project is a full-stack mobile application developed to manage La Grande Soirée Gnawa, a cultural Gnawa music event in Morocco.

The application allows users to:

View event information

Discover participating Gnawa artists

Make simple ticket reservations

View their reservations using email or confirmation code

Share the event using deep linking

The backend provides a REST API that manages event data, artists, and bookings.

* Technologies Used
-Backend

Node.js

Express.js

PostgreSQL

Sequelize ORM

Dotenv

CORS

-Mobile Frontend

React Native (Expo)

Expo Router (navigation)

React Query (data fetching and caching)

Zustand (state management)

AsyncStorage (local persistence)

Deep Linking (sharing)

-Tools

Git & GitHub

Postman (API testing)

🗄️ Database Design

Only 3 tables are used as required:

event_info

-Stores global event information

title

date

venue

description

banner_url

contact_email

-artists

Stores participating artists

name

bio

photo_url

schedule

-bookings

Stores reservations

full_name

email

tickets

confirmation_code

event_id

Relations:

One Event → Many Artists

One Event → Many Bookings

<img width="2316" height="1213" alt="mermaid-diagram-2025-12-14-162041" src="https://github.com/user-attachments/assets/7a46c671-f191-415d-b0c8-e811f601f243" />


* API Endpoints
Event (Public)
GET /api/event

Artists (Public)
GET /api/artists
GET /api/artists/:id

Bookings
POST /api/bookings
GET /api/bookings/:code
GET /api/bookings/email/:email

📱 Mobile Application Screens

Home
Event information and banner

Artists List
List of participating artists

Artist Detail
Artist bio, photo, and schedule

Booking Form
Simple reservation form

My Reservations
View bookings using email or confirmation code


🔄 Data Flow

User interacts with the mobile app

React Query sends HTTP requests to the API

Express routes handle requests

Sequelize communicates with PostgreSQL

Data is returned to the mobile app

AsyncStorage stores persistent data locally

🚀 How to Run the Project
Backend
cd backend
npm install
npm run dev


Environment variables required in .env:

PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/gnawa_event
JWT_SECRET=your_secret


Seeder (mock data):

node utils/seed.js

Mobile App
cd mobile
npm install
npx expo start


To run on device:

Install Expo Go

Scan QR code

* API Testing

Postman was used to test all endpoints:

Event data retrieval

Artists listing

Booking creation

Reservation lookup


* Author

Developed as part of a mobile development training project, focusing on clean architecture, REST APIs, and modern mobile technologies.
