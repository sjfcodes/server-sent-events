const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/events', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);
  setInterval(()=>res.write(`event: stream1\ndata: ${JSON.stringify({date: new Date().toLocaleTimeString()})}\n\n`),1000)
  setInterval(()=>res.write(`event: stream2\ndata: ${JSON.stringify({date: new Date().toLocaleTimeString()})}\n\n`),2000)
  req.on('close', () => console.log(`Connection closed`));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
  