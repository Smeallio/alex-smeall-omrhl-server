const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.send('Hello World!!!');
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });