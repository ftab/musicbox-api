# MusicBox API
This is the API for the MusicBox music streaming bot in #randommusic on Rizon IRC network.
MusicBox API is a RESTful API built using Node.js and Express. This API serves as the backend for a music application, providing endpoints for managing music-related data such as artists, albums, tracks, and playlists.

## Features

- Manage artists, albums, tracks, and playlists
- User authentication and authorization
- Search functionality for music data
- Integration with third-party music services

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing music data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for authentication.
- **Docker**: Containerization of the application for consistent development and deployment.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ftab/musicbox-api.git
    cd musicbox-api
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/musicbox
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Running with Docker

1. Build the Docker image:
    ```bash
    docker build -t musicbox-api .
    ```

2. Run the Docker container:
    ```bash
    docker run -d -p 3000:3000 --name musicbox-api musicbox-api
    ```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### Artists

- `GET /api/artists`: Get all artists
- `POST /api/artists`: Create a new artist
- `GET /api/artists/:id`: Get artist by ID
- `PUT /api/artists/:id`: Update artist by ID
- `DELETE /api/artists/:id`: Delete artist by ID

### Albums

- `GET /api/albums`: Get all albums
- `POST /api/albums`: Create a new album
- `GET /api/albums/:id`: Get album by ID
- `PUT /api/albums/:id`: Update album by ID
- `DELETE /api/albums/:id`: Delete album by ID

### Tracks

- `GET /api/tracks`: Get all tracks
- `POST /api/tracks`: Create a new track
- `GET /api/tracks/:id`: Get track by ID
- `PUT /api/tracks/:id`: Update track by ID
- `DELETE /api/tracks/:id`: Delete track by ID

### Playlists

- `GET /api/playlists`: Get all playlists
- `POST /api/playlists`: Create a new playlist
- `GET /api/playlists/:id`: Get playlist by ID
- `PUT /api/playlists/:id`: Update playlist by ID
- `DELETE /api/playlists/:id`: Delete playlist by ID

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
