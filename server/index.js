const express = require("express");
const cors = require("cors");
const controller = require("./controller");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 4500;

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
