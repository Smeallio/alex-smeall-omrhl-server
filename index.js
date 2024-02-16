const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

const userRoutes = require("./routes/user-routes");
const teamRoutes = require("./routes/team-routes");
const playerRoutes = require("./routes/player-routes");
const gameRoutes = require("./routes/game-routes");
const statRoutes = require("./routes/stat-routes");

app.use(cors());

app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/stats", statRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!!!?");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
