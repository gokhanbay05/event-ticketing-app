# TicketApp - Event Ticketing Platform

A full-stack event ticketing web application built with Node.js, Express, MongoDB, and EJS.

## ✨ Core Features

-   User registration and login system with admin/user roles.
-   Admins can manage events and venues (Create, Update, Delete).
-   Users can purchase tickets for upcoming events.
-   A user profile page to view active and past tickets.
-   Pagination for browsing large lists of events and venues.
-   Fully responsive UI built with Tailwind CSS.

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB, Mongoose
-   **Frontend:** EJS, Tailwind CSS (via CDN)
-   **Core Libraries:** JWT, bcrypt, Joi, cookie-parser

## 🚀 Quickstart

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/gokhanbay05/event-ticketing-app.git](https://github.com/gokhanbay05/event-ticketing-app.git)
    cd event-ticketing-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying the example file (`cp .env.example .env`). Then, fill it with your own configuration (Database URI, JWT secret, etc.).

4.  **Seed the database (Optional):**
    To populate the database with sample data, run:
    ```bash
    npm run seed:import
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

-   `npm start`: Runs the app in production mode.
-   `npm run dev`: Runs the app in development mode with `nodemon`.
-   `npm run seed:import`: Populates the database with sample data.
-   `npm run seed:delete`: Clears all data from the database.
