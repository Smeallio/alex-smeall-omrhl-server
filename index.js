const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

const userRoutes = require("./routes/user-routes");
const teamRoutes = require("./routes/team-routes");
const playerRoutes = require("./routes/player-routes");
const gameRoutes = require ("./routes/game-routes");

app.get("/", (req, res) => {
  res.send("Hello World!!!?");
});

app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: "https://oddmanrushhockey.netlify.app/"
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/games", gameRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
