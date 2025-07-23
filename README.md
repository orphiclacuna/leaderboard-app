# Leaderboard App

A modern, responsive leaderboard web application built with React.js, Node.js, Express.js and MongoDB. Users can create profiles, claim points through an interactive interface, view the hostory of claimed points and compete on a real-time leaderboard.

## Features
- Responsive design for mobile, tablet, and desktop
- User selection and creation
- Real-time leaderboard updates
- Claim history view
- Modern navigation and interactive elements

## Technologies Used
- **Frontend:** React, CSS (App.css, responsive.css, confetti.css, cursor.css, userSelector.css)
- **Backend:** Node.js, Express
- **API:** RESTful endpoints for users, claims, and leaderboard
- **Database:** MongoDB (using Mongoose)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v7+ recommended)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd Leaderboard
   ```
2. Install dependencies for both client and server:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```

### Running the App
1. Start the backend server:
   ```sh
   cd server
   npm start
   ```
2. Start the frontend React app:
   ```sh
   cd ../client
   npm start
   ```
3. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Project Structure
```
Leaderboard/
  client/
    src/
      components/
      App.js
      App.css
      ...
    public/
      index.html
    package.json
  server/
    models/
    routes/
    server.js
    package.json
```

## Customization
- Edit styles in `client/src/App.css`, `responsive.css`, etc. for UI tweaks
- Add new features in React components under `client/src/components/`
- Extend backend API in `server/routes/`

## License
MIT

---
Made with ❤️ by Anushka
