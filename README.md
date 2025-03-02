# Globetrotter

Globetrotter is a web application that allows users to participate in a travel destination quiz. Users can answer questions about various travel destinations, and their scores are tracked and saved.

## Features

- User authentication with Google OAuth 2.0
- Travel destination quiz with multiple-choice questions
- Score tracking and saving
- Responsive design
- Confetti animation for correct answers
- Progress bar to track quiz progress

## Technologies Used

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - dotenv
  - cors

- **Frontend:**
  - React.js
  - Axios
  - Canvas Confetti
  - Lucide React
  - React Icons

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the `server` directory and add the following environment variables:

   ```env
   PORT=5000
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. Build the client:

   ```bash
   cd ../client
   npm run build
   ```

6. Start the server:

   ```bash
   cd ../server
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5000`.
2. Sign in with your Google account.
3. Start the travel destination quiz and answer the questions.
4. Your scores will be tracked and saved.

## API Endpoints

### User Routes

- `POST /api/users`: Create a new user or return an existing user.
- `POST /api/users/add-game`: Add a game to the user's games array.

### Destination Routes

- `GET /api/destinations`: Get a random travel destination.
- `POST /api/destinations/check-answer`: Check if the user's answer is correct.

## Project Structure

```
globetrotter/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── ...other files
│   ├── package.json
│   └── ...other files
├── server/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── ...other files
├── .gitignore
├── README.md
└── ...other files
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
