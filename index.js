require("dotenv").config();

const server = require("./server.js");

server.get("/", (req, res) => {
  res.send("Code me, Disney!");
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
