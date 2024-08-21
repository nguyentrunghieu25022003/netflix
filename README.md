# Netflix Clone (No Responsive)

A Netflix clone built using Node.js for the backend and React.js for the frontend. This project aims to replicate the main functionalities of Netflix, including user authentication, movie browsing, and video streaming.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)

## Features

- User Authentication (Sign up, Login, Login with Google, Logout)
- Browse Movies and TV Shows
- Watch Trailers and Movies
- Add Movies to Favorites
- Report
- Like & Dislike
- Management on the Admin side (CRUD, Lock & Unlock Accounts)

## Technologies

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for Authentication (Refresh Token)
- Passport
- Socket.IO
- Cors
- Nodemailer

### Frontend
- React.js
- Material-UI
- Axios
- Chart.js
- CSS Modules
- Bootstrap
- Socket.IO-Client
- React-Toastify
- Tippy.js

## Setup

### Installation

Clone the repository:

```bash
git clone https://github.com/your-repository/netflix-clone.git
cd netflix-clone

## API Documentation

This section provides detailed information about the endpoints available in the Netflix Clone API. Each endpoint includes method types, paths, and a brief description of its functionality.

### Movies

- **GET /api/movies**: Retrieve all movies. Requires authentication.
- **GET /api/movies/search-results**: Retrieve search results based on query parameters.
- **GET /api/movies/search-films**: Search for films. Requires authentication.
- **GET /api/movies/thumbnail**: Retrieve all movie thumbnails.
- **GET /api/movies/categories**: Retrieve all movie categories.
- **GET /api/movies/countries**: Retrieve all countries.
- **GET /api/movies/series**: Retrieve all series. Requires authentication.
- **GET /api/movies/feature-films**: Retrieve all feature films. Requires authentication.
- **GET /api/movies/tv-shows**: Retrieve all TV shows. Requires authentication.
- **GET /api/movies/animated**: Retrieve all animated movies. Requires authentication.
- **GET /api/movies/my-list**: Retrieve all movies in the user's list. Requires authentication.

### My List

- **POST /api/movies/my-list/add/:slug**: Add a movie to the user's list by slug. Requires authentication.
- **DELETE /api/movies/my-list/delete**: Remove a movie from the user's list. Requires authentication.

### Movie Details

- **GET /api/movies/detail/:slug**: Retrieve detailed information about a movie, including comments. Requires authentication.
- **POST /api/movies/detail/:slug/comment/create**: Create a comment on a movie.
- **PATCH /api/movies/detail/:slug/status-video**: Update the status of a video, such as marking it as liked or disliked.
- **DELETE /api/movies/detail/:slug/comment/:commentId**: Remove a comment from a movie.

### Miscellaneous

- **GET /api/movies/ranking**: Retrieve ranking of movies.
- **GET /api/movies/notifications**: Retrieve all notifications for the user. Requires authentication.
- **POST /api/movies/notifications/read**: Mark notifications as read. Requires authentication.

### Authentication and User Management

- **GET /api/users/auth/check-token**: Check if the user's token is still valid. Requires authentication.
- **GET /api/users/auth/refresh-token**: Refresh the access token. Requires authentication.
- **GET /api/users/auth/google**: Initiate authentication via Google.
- **GET /api/users/auth/google/callback**: Handle the callback after Google authentication.
- **GET /api/users/login-success/:token/:email/:avatar**: Handle login success and redirect with token, email, and avatar details.
- **GET /api/users/profile**: Retrieve the user's profile information. Requires authentication.
- **PATCH /api/users/profile/edit**: Edit user profile details. Requires authentication.
- **POST /api/users/auth/register**: Register a new user, handling file upload for the avatar.
- **POST /api/users/auth/login**: Authenticate a user and log them in.
- **GET /api/users/auth/logout**: Log out the current user. Requires authentication.
- **POST /api/users/contact/send**: Handle sending user feedback.
- **POST /api/users/forgot-password/send-mail**: Send an email for password recovery.
- **POST /api/users/forgot-password/confirm-code**: Confirm user's code received via email for password reset.
- **PATCH /api/users/forgot-password/new-password**: Reset the password after confirming the code.
- **GET /api/users/history**: Retrieve user's viewing history. Requires authentication.
- **POST /api/users/history/update**: Update user's viewing history. Requires authentication.

### Admin Management

- **GET /api/admin/dashboard**: Retrieve dashboard data including stats and overviews.
- **POST /api/admin/create-movie**: Add a new movie to the database.
- **DELETE /api/admin/delete/:movieId**: Remove a movie from the database using its ID.
- **GET /api/admin/edit/:movieId**: Retrieve details for editing a specific movie.
- **PUT /api/admin/edit/:movieId/upload**: Handle the uploading of edited movie details.
- **GET /api/admin/users**: Fetch all users' details for admin review.
- **PATCH /api/admin/users/lock**: Lock a user's account.
- **PATCH /api/admin/users/unlock**: Unlock a user's account.
- **POST /api/admin/report/send**: Receive and handle a new report from users.
- **GET /api/admin/all-report**: Retrieve all reports submitted by users.