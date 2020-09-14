# socket.io POC

This project is a proof of concept for the use of socket.io to create a website with a TV/remote concept, with one device on desktop acting as the TV, and another mobile device as the remote control.

## Setup

- Node v12 with npm v6
- Run `npm install` to install dependencies for the server, mainly:
  - express
  - socket.io

## Instructions

- Run `npm start` to start up the server. The server will run on `localhost:3000`.
- Run `npm run serve` to serve `index.html` and `remote.html` at `localhost:5000`.
- Going to `localhost:3000` will open the TV page, while going to `localhost:3000/remote` will open the remote control page.
- Opening the TV page will create a socket connection to `localhost:3000`. On connection, a room code will be randomly generated and sent to the page via an event named after the socket connection `id`. This room code will be shown on the page itself. A QR code will be generated that is also a link to open the remote control page, passing in the `roomId` as URL params (e.g. `localhost:5000/remote?roomId=1234`).
- The remote control page has three buttons to select a channel. When any of the buttons is clicked, it will send a message to the server with the room id from the URL params as well as the value of the button, which will be broadcast to the TV client with that corresponding id. The payload will be the value of the button pressed in the remote control.

## Implementation details

- Main server logic is in `server.js`. Code for generating room id, broadcasting the id to the client on connection, and relaying messages from remote control clients to appropriate TV clients will be done here.
- TV client logic is in `index.js`. On startup, it will connect to the server and expect a return message to the socket id with the generated room id. It will then listen for the room id and any corresponding messages.
- Remote control logic is in `remote.js`. On pressing any of the buttons, it will simply emit a `channel` event with the `roomId` that was passed to it from the URL params, as well as the value of the button pressed.
