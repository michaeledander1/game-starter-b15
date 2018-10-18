# Multiplayer Beer Pong

This repository (main branch **development**) contains a multi-player game that was created in week 7 of the Codaisseur Academy as part of a 1-week 2-person group project.

The project contains a frontend and backend for a multiplayer beer pong game. It uses Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API but also sends messages over websockets using SocketIO.

![example](https://cd.sseu.re/tictactoe-low.gif)

## Initializing project

1. Clone the project;
2. Install all project dependencies. To do this, run **yarn install** or **npm install** twice, 1x in the *server* folder, 1x in the *client* folder;

### Option 1: Play the game on 1 computer (2 players in 2 browser windows)
3. Go to `server/src/games/entities.ts` and comment out the column *userId* (line 87 & 88);
4. In a first terminal window, in the `server` folder, run **yarn tsc -w** to compile the code. Leave it running to watch for file changes;
5. In a second terminal window, in the `server` folder, run **yarn start** to run node, connect to the database and create the tables. Make sure to connect to a database with the info 
6. Go to `server/src/games/entities.ts` and uncomment the column *userId* (line 87 & 88);
7. In a third terminal window, in the `client` folder, run **yarn start** to run the app in the development mode.<br> Open [http://localhost:3000](http://localhost:3000) to view it in the browser;
8. Open [http://localhost:3000](http://localhost:3000) in a second browser window. Make sure to sign up with 2 different players in each window. Have fun!

### Option 2: Play the game on 2 computers over the same wireless network
In order to play multi-player on 2 computers (e.g. computers x and y), if a database on computer x will be used, then on computer x, go to file `client/src/constants.js` and change 'localhost' in the first line to that computer's IP address. <br> For example, *export const baseUrl = 'http://localhost:4000'* should become something like *export const baseUrl = 'http://172.12.34.567:4000'*.<br>
Then:
- On computer x : Follow steps 3, 4, 5, 6 and 7 in the instructions above;
- On computer y, no need for these stept, simply surf to http://ipAddressOfComputerX:3000/. 
Happy playing!
