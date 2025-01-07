# Dudi Sela WebApp Frontend

This project serves as the frontend for the Dudi Sela WebApp, providing a user-friendly interface for court bookings, user management, and real-time data updates. It is built with React.js and integrates Redux for state management.

## Features

- **Responsive Design**: Optimized for desktop and mobile platforms.
- **Redux State Management**: Centralized application state for seamless data flow.
- **Integration with Backend**: Connects with the backend APIs for user authentication and court reservations.
- **SCSS Styling**: Modular and maintainable styling using SCSS.
- **Interactive UI**: Dynamic components for managing reservations and users.

## Tech Stack

- **Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: SCSS
- **Language**: JavaScript
- **Build Tool**: Create React App

## Project Structure

```plaintext
|-- public/               # Static files
|-- src/                  # Main application source code
|   |-- components/       # Reusable React components
|   |-- features/         # Redux slices for application features
|   |-- styles/           # SCSS files for styling
|   |-- App.js            # Main application component
|   |-- index.js          # Entry point for React
|-- .vscode/              # VS Code settings
|-- package.json          # Project dependencies
|-- package-lock.json     # Lock file for npm dependencies
|-- README.md             # Project documentation
```

## Setup and Installation

### Prerequisites

- Install Node.js ([Node.js Installation Guide](https://nodejs.org/)).
- Ensure the backend for the Dudi Sela WebApp is set up and running.

### Steps to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/doronkabaso/Dudi-Sela-WebApp-Frontend-main.git
   cd Dudi-Sela-WebApp-Frontend-main
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.

4. Ensure the backend is running at the specified API URL.

## Available Scripts

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production.

## About Dudi Sela Tennis Academy

The Dudi Sela Tennis Academy is a renowned institution committed to developing tennis talent. With state-of-the-art facilities and expert coaching, the academy offers training programs for players of all skill levels, emphasizing sportsmanship, discipline, and excellence.

## Future Enhancements

- **Integration with Payment Gateway**: Enable online payments for court reservations.
- **Push Notifications**: Notify users of court availability and reservation updates.
- **Admin Panel**: Provide an admin dashboard for managing users and courts.

## Contributors

- Doron Kabaso
- Sharon Bello

## Feedback

For suggestions or issues, please raise them in the [GitHub repository](https://github.com/doronkabaso/Dudi-Sela-WebApp-Frontend-main/issues).

