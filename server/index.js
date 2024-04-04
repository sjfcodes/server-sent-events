const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const sseHeaders = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

app.get("/date", (req, res) => {
  res.writeHead(200, sseHeaders);

  setInterval(() => {
    res.write(
      `event: stream0\ndata: ${JSON.stringify({
        date: new Date().toISOString(),
      })}\n\n`
    );
  }, Number(req.query.interval));
  req.on("close", () => console.log(`Connection closed`));
});

app.get("/colors", (req, res) => {
  res.writeHead(200, sseHeaders);

  const getColor = () => Math.floor(Math.random() * 256);

  setInterval(() => {
    let colors = { r: getColor(), g: getColor(), b: getColor() };
    res.write(`data: ${JSON.stringify(colors)}\n\n`);
  }, 3000);
  req.on("close", () => console.log(`Connection closed`));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
