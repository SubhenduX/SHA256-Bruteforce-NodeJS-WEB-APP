const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let running = false;
let targetHash = '';
let attempts = 0;
let found = false;
let startTime = null;

// Middleware to serve static files from 'public' folder
app.use(express.static('public'));

// Middleware to parse JSON bodies in POST requests
app.use(express.json());

// Generate a random 64-character string (lowercase + numbers)
function generateRandomString() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Brute-force function (recursive, non-blocking)
function bruteForce() {
    if (!running || found) return;
  
    const randomString = generateRandomString();
    const hashed = crypto.createHash('sha256').update(randomString).digest('hex');
    attempts++;
  
    if (attempts % 1000 === 0) {
      const status = {
        time: new Date().toISOString(),
        attempts,
        target: targetHash,
        hash: hashed,
        match: hashed === targetHash,
      };
  
      // Send status to connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(status));
        }
      });
  
      console.log(`Attempt #${attempts}: ${hashed} - ${status.match ? 'Match!' : 'No match'}`);
    }
  
    if (hashed === targetHash) {
      found = true;
      running = false;
      fs.writeFileSync('result.txt', `Match found! String: ${randomString}`);
      console.log('Match found! Saved to result.txt');
    } else {
      // Continue the brute force after 1ms to avoid blocking the event loop
      setTimeout(bruteForce, 1);
    }
  }
  

// Endpoint to start brute force
app.post('/start', (req, res) => {
  const { targetHash: receivedHash } = req.body;
  if (!receivedHash) {
    return res.status(400).send('Target hash not provided.');
  }

  targetHash = receivedHash;
  running = true;
  found = false;
  attempts = 0;
  startTime = new Date();

  console.log(`Brute force started for hash: ${targetHash}`);
  bruteForce();
  res.send('Brute-force started');
});

// Endpoint to stop brute force
app.post('/stop', (req, res) => {
  running = false;
  console.log('Brute-force stopped');
  res.send('Brute-force stopped');
});

// WebSocket server logic
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
