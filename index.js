const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

const teamRoutes = require("./routes/team-routes");
const playerRoutes = require ("./routes/player-routes");

app.get("/", (req, res) => {
  res.send("Hello World!!!?");
});

app.use(cors());
app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
