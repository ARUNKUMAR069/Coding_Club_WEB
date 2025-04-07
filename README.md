# Coding Club Web App

Welcome to the Coding Club Web App! This project is designed to serve as a platform for a web development coding club, providing a dynamic and modern interface for both members and administrators.

## Project Structure

The project is divided into two main parts: the client and the server.

### Client

The client is built using React, Vite, and Tailwind CSS. It includes:

- **Public Assets**: Contains the favicon and robots.txt for SEO.
- **Components**: Reusable components for the application, including:
  - Admin components for managing members and generating user credentials.
  - Common components like buttons, navigation bars, and footers.
  - Home components showcasing the club's features and gallery.
- **Pages**: Different pages for the application, including Home, About, Events, and an Admin Dashboard.
- **Hooks and Context**: Custom hooks and context for managing authentication.
- **Animations**: Transition animations for a smooth user experience.

### Server

The server is built using Express.js and handles the backend logic. It includes:

- **Controllers**: Functions for managing authentication, members, and events.
- **Middleware**: Authentication and error handling middleware.
- **Models**: Database models for Users, Members, and Events.
- **Routes**: API routes for handling requests related to authentication, members, and events.
- **Utilities**: Helper functions for generating passwords and unique IDs.
- **Configuration**: Database connection settings and environment variables.

## Features

- **Dynamic Admin Panel**: Admins can manage club members, generate usernames and passwords, and configure settings.
- **Member Management**: Each member has a unique ID, and their information is easily accessible and manageable by the admin.
- **Gallery**: A dedicated section to showcase photos from previous classes and events.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive user interface.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd server
   npm install
   ```

4. Set up your environment variables in the server directory by copying `.env.example` to `.env` and filling in the required values.

5. Start the server:
   ```
   cd server
   npm start
   ```

6. Start the client:
   ```
   cd client
   npm run dev
   ```

## Production Practices

- Ensure to use environment variables for sensitive information.
- Implement proper error handling in both client and server.
- Use ESLint for code linting and maintaining code quality.
- Optimize images and assets for faster loading times.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

Thanks to all contributors and the community for their support in building this project!