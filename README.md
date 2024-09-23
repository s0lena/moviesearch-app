🎬 Movie Search App
A Movie Search App built with React and TypeScript that allows users to search for movies using the TMDb API. This app is powered by React Query for data fetching, Axios for making API requests, and styled with styled-components. It also uses React Router for navigation and is deployed on Netlify.

<!-- Table of Contents
Features
Demo
Technologies
Setup
Environment Variables
Usage
Project Structure
Contributing
License -->

Features
🔍 Search Movies: Enter a query to search for movies in real-time.
📜 View Movie Details: Click on any movie to see detailed information including release date, overview, and ratings.
🗂 Pagination: Load more movies as you scroll or click "Load More".
⚡ Efficient Data Fetching: Using React Query for caching and minimizing unnecessary API calls.
🎨 Responsive Design: Styled using styled-components for modern and responsive UI.
🚀 Deployed on Netlify: Accessible online with seamless integration.
Demo
You can try the live version of the app here: https://moviesearch-app-os.netlify.app/

Technologies
React (with TypeScript)
React Query (for data fetching)
Axios (for API requests)
Styled-Components (for styling)
React Router (for navigation)
Netlify (for deployment)

<!-- Setup
To run this project locally, follow these steps:

Prerequisites
Make sure you have Node.js and npm (or yarn) installed on your machine.

Clone the repository:

bash
Копіювати код
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
Install dependencies:

bash
Копіювати код
npm install
Create a .env file in the root of the project and add the following environment variables:

bash
Копіювати код
VITE_TMDB_API_KEY=<Your_TMDB_API_Key>
VITE_TMDB_API_URL=https://api.themoviedb.org/3/search/movie
VITE_TMDB_API_GENRE_URL=https://api.themoviedb.org/3/genre/movie/list
You can get your TMDb API Key by creating an account at TMDb.

Start the development server:

bash
Копіювати код
npm run dev
Visit the app at http://localhost:3000 in your browser.

Environment Variables
The following environment variables are required to connect to the TMDb API:

VITE_TMDB_API_KEY: Your API key from TMDb.
VITE_TMDB_API_URL: The base URL for searching movies.
VITE_TMDB_API_GENRE_URL: The base URL for fetching genres.
These variables should be set in your .env file. They are handled on the server and are not exposed to the client-side.

Usage
Once the app is running, you can:

Enter a search term in the search bar to find movies.
Browse through the list of movies that match the search.
Click on any movie to view detailed information about it.
Scroll to load more movies or click the "Load More" button. -->

Project Structure
Here's an overview of the project structure:

src/
│
├── assets/ # Static assets like images (e.g., MissingPoster)
├── components/ # Reusable React components (Input, MovieList, etc.)
├── hooks/ # Custom hooks (e.g., useMovies, useScroll)
├── pages/ # Page components like SearchView and MovieDetailView
├── services/ # API calls (fetchMovies, fetchGenres)
├── App.tsx # Main App component
├── index.tsx # Entry point of the app
├── styles.ts # Global styles or styled-components theme

<!-- ├── env.d.ts              # TypeScript definitions for environment variables -->

Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

Fork the repository.
Create a new feature branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Create a new Pull Request.
