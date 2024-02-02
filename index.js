const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

const teamRoutes = require("./routes/team-routes");

app.get("/", (req, res) => {
  res.send("Hello World!!!?");
});

app.use(express.json());

app.use("/teams", teamRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
