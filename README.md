# MusicBox API

This project provides an interface to the MusicBox database. See #randommusic on Rizon IRC.

## Features

- Provides endpoints to query data from the music database.
- Secure and scalable API built with Node.js and Express.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (Node Package Manager)
- mysql or mariadb

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Install Database**

   ```bash
   mysql -uyour-database-user -p your-database-name < db.sql
   ```

4. **Configure Database Settings**

   - Copy the example configuration file to `config.js`.

     ```bash
     cp config.js.example config.js
     ```

   - Edit `config.js` and fill in your database connection parameters.


     ```javascript
     const config = {
       db: {
         host: "your-database-host",
         user: "your-database-user",
         password: "your-database-password",
         database: "your-database-name",
         connectTimeout: 60000
       },
       listPerPage: 10000,
     };

     module.exports = config;
     ```

### Running the Application

- Start the application using npm.

  ```bash
  npm start
  ```

- The API will be running on `http://localhost:3000`.

## Endpoints

- **GET /api/users**: Retrieve a list of users.
- **GET /api/videos?userid=1**: Retrieve a list of videos/tracks posted by userid 1. RIP Cuckoo <3
- **GET /api/leaderboard**: Retrieve a list of users ranked by how many posts.

For more detailed endpoint information, make up some [API Documentation](docs/api.md).

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.