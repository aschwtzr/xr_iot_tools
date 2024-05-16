import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { wifiNetworks } from 'systeminformation';
import sqlite3 from 'sqlite3'
import dotenv from 'dotenv'

dotenv.config()

// const http = require('http')
// const ws = require ('ws');
// const si = require("systeminformation");

const server = createServer();
const echoServer = new WebSocketServer({ noServer: true })
const ssidServer = new WebSocketServer({ noServer: true })
const locationServer = new WebSocketServer({ noServer: true })
// const wss = new ws.WebSocketServer({ port: 8080 });

const echoResponse = (message) => {
  const response = { message }
  console.log('sending', response)
  return JSON.stringify(response)
}

const db = new sqlite3.Database('db.sqlite3');

db.serialize(() => {
  // db.run("CREATE TABLE locations (latitude FLOAT, longitude FLOAT)");

  // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (let i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();

  // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
  //     console.log(row.id + ": " + row.info);
  // });
});

db.close();

echoServer.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send(echoResponse(`You said ${data}!`));
  });
});

ssidServer.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    wifiNetworks().then(networks => {
      mapped = networks.map(network => {
        console.log(network)
        return {
          ssid: network.ssid,
          signalLevel: network.signalLevel,
          security: network.security.join(', ')
        }
      })
      ws.send(JSON.stringify(mapped));
    });
  })
});

const weatherGetter = async function(lat, long) {
  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`)
  return weather.json()
}

locationServer.on('connection', function connection(ws) {
  ws.on('message', async function message(data) {
    const bufferString = data.toString()
    console.log('bufferString', bufferString)
    console.log(bufferString)
    const parsed = JSON.parse(bufferString)
    const resp = await weatherGetter(parsed.latitude, parsed.longitude)
    console.log('resp', resp)
    ws.send(JSON.stringify(resp.weather[0]))
  })
})

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = new URL(request.url, 'ws://127.0.0.1');
  console.log('pathname', pathname)
  if (pathname === '/') {
    echoServer.handleUpgrade(request, socket, head, function done(ws) {
      echoServer.emit('connection', ws, request);
    });
  } else if (pathname === '/network') {
    ssidServer.handleUpgrade(request, socket, head, function done(ws) {
      ssidServer.emit('connection', ws, request);
    });
  } else if (pathname === '/location') {
    locationServer.handleUpgrade(request, socket, head, function done(ws) {
      locationServer.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);
