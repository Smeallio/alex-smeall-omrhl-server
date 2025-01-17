const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

const announcementRoutes = require("./routes/announcement-routes");
const gameRoutes = require("./routes/game-routes");
const playerRoutes = require("./routes/player-routes");
const standingsRoutes = require("./routes/standings-routes");
const statRoutes = require("./routes/stat-routes");
const teamRoutes = require("./routes/team-routes");
const userRoutes = require("./routes/user-routes");

app.use(cors());

app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/announcements", announcementRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/players", playerRoutes);
app.ise("/api/standings", standingsRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
