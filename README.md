# socket.io POC

This project is a proof of concept for the use of socket.io to create a website with a TV/remote concept, with one device on desktop acting as the TV, and another mobile device as the remote control.

## Setup

- Node v12 with npm v6
- Run `npm install` to install dependencies for the server, mainly:
  - express
  - socket.io

## Instructions

- Run `npm start` to start up the server. The server will run on `localhost:3000`.
- Run `npm serve` to serve the `index.html` file for the TV page and `remote.html` at `localhost:5000` for the remote control page.
- Going to `localhost:3000` will open the TV page, while going to `localhost:3000/remote.html` will open the remote control page.
- Opening the TV page will create a socket connection to `localhost:3000`. On connection, a room code will be randomly generated and sent to the page via an event named after the socket connection `id`. This room code will be shown on the page itself.
- The remote control page has two text inputs. The first one expects a room id, and the second a value to broadcast. When `send` is clicked, it will send send a message to the server with the room id, which will be broadcast to the TV client with that corresponding id. The payload will be the value of the input in the remote control.

## Implementation details

- Main server logic is in `server.js`. Code for generating room id, broadcasting the id to the client on connection, and relaying messages from remote control clients to appropriate TV clients will be done here.
- TV client logic is in `index.js`. On startup, it will connect to the server and expect a return message to the socket id with the generated room id. It will then listen for the room id and any corresponding messages.
