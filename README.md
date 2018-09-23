# Multiplayer Beer Pong

This repo contains a frontend and backend for a multiplayer tic tac toe game. It uses Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API but also sends messages over websockets using SocketIO.

![example](https://cd.sseu.re/tictactoe-low.gif)

Note by Marlein: INSTRUCTIONS ON PLAYING THIS GAME ON 2 DIFFERENT COMPUTERS OVER THE SAME WIRELESS NETWORK

In order to play multi-player on 2 computers (e.g. computers x and y), if database on computer x will be used, then on computer x, go to file Client --> src --> constants.js, and change 'localhost' in the first line to that computer's IP address. So, << export const baseUrl = 'http://localhost:4000' >> should become something like << export const baseUrl = 'http://172.12.34.567:4000' >>.

Then to start up the game:
- On computer x, do the usual serverside and client side command line commands (i.e. yarn tsc -w (server), yarn start (server), yarn start (client)).
- On computer y, no need of running stuff via yarn: simply surf to http://ipAddressOfComputerX:3000/. 



