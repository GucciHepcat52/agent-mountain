const express = require("express");
const cors = require("cors");
const controller = require("./controller");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 4500;

app.get("/api/posts", controller.getPosts);
app.post("/api/posts", controller.createPost);
app.delete("/api/posts/:id", controller.deletePost);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
