const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const mysql = require("mysql");

const app = express();
const server = http.Server(app);
const io = socketIO(server);
let name = "";
let login = "";
let sc0re = 0;
let games = 0;
let name1 = "";
let login1 = "";
let sc0re1 = 0;
let games1 = 0;

app.set("port", 3000);
app.use("/game", express.static(__dirname + "/game"));

app.get("/", function(req, res){
    if(name == "" && login == "" && sc0re == "" && games == ""){
        name = req.query.nick;
        login = req.query.login;
        sc0re = req.query.score;
        games = req.query.games;
        sc0re = parseInt(sc0re);
        games = parseInt(games);
    }else{
        name1 = req.query.nick;
        login1 = req.query.login;
        sc0re1 = req.query.score;
        games1 = req.query.games;
        sc0re1 = parseInt(sc0re1);
        games1 = parseInt(games1);
    }
    res.sendFile(path.join(__dirname + "/game", "pong.html"));
});
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "project",
    password: "12345"
});
conn.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log("DB online");
    }
});
let queryClose = "UPDATE `games` SET `status`='close' WHERE `initiator`=(?)";
let queryAdd = "UPDATE `users` SET `score`=(?), `games_played`=(?) WHERE `login`=(?)";

let rooms = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(name, login, sc0re, games);

    socket.on("join", () => {
        console.log(rooms);

        // get room 
        let room;
        if (rooms.length > 0 && rooms[rooms.length - 1].players.length === 1) {
            room = rooms[rooms.length - 1];
        }

        if (room) {
            socket.join(room.id);
            socket.emit('playerNo', 2);

            // add player to room
            room.players.push({
                socketID: socket.id,
                playerNo: 2,
                nick: name1,
                login: login1,
                save: sc0re1,
                score: 0,
                games: games1,
                x: 690,
                y: 200,
            });

            // send message to room
            io.to(room.id).emit('startingGame');

            setTimeout(() => {
                io.to(room.id).emit('startedGame', room);

                // start game
                startGame(room);
            }, 3000);
        }
        else {
            room = {
                id: rooms.length + 1,
                players: [{
                    socketID: socket.id,
                    playerNo: 1,
                    nick: name,
                    login: login,
                    save: sc0re,
                    score: 0,
                    games: games,
                    x: 90,
                    y: 200,
                }],
                ball: {
                    x: 395,
                    y: 245,
                    dx: Math.random() < 0.5 ? 1 : -1,
                    dy: 0,
                },
                winner: 0,
            }
            rooms.push(room);
            socket.join(room.id);
            socket.emit('playerNo', 1);
            console.log(room); //debug
        }
    });

    socket.on("move", (data) => {
        let room = rooms.find(room => room.id === data.roomID);

        if (room) {
            if (data.direction === 'up') {
                room.players[data.playerNo - 1].y -= 30;

                if (room.players[data.playerNo - 1].y < 0) {
                    room.players[data.playerNo - 1].y = 0;
                }
            }
            else if (data.direction === 'down') {
                room.players[data.playerNo - 1].y += 30;

                if (room.players[data.playerNo - 1].y > 440) {
                    room.players[data.playerNo - 1].y = 440;
                }
            }
        }

        // update rooms
        rooms = rooms.map(r => {
            if (r.id === room.id) {
                return room;
            }
            else {
                return r;
            }
        });

        io.to(room.id).emit('updateGame', room);
    });

    socket.on("leave", (roomID) => {
        socket.leave(roomID);
    });



    socket.on('disconnect', () => {
        conn.query(queryClose, name, (err, result, field) =>{
            console.log(err);
        });
        console.log('user disconnected');
    });
});

function startGame(room) {
    let interval = setInterval(() => {
        room.ball.x += room.ball.dx * 5;
        room.ball.y += room.ball.dy * 5;

        // check if ball hits player 1
        if (room.ball.x < 110 && room.ball.y > room.players[0].y && room.ball.y < room.players[0].y + 60) {
            room.ball.dx = 1;

            // change ball direction
            if (room.ball.y < room.players[0].y + 30) {
                room.ball.dy = -1;
            }
            else if (room.ball.y > room.players[0].y + 30) {
                room.ball.dy = 1;
            }
            else {
                room.ball.dy = 0;
            }
        }

        // check if ball hits player 2
        if (room.ball.x > 690 && room.ball.y > room.players[1].y && room.ball.y < room.players[1].y + 60) {
            room.ball.dx = -1;

            // change ball direction
            if (room.ball.y < room.players[1].y + 30) {
                room.ball.dy = -1;
            }
            else if (room.ball.y > room.players[1].y + 30) {
                room.ball.dy = 1;
            }
            else {
                room.ball.dy = 0;
            }
        }

        // up and down walls
        if (room.ball.y < 5 || room.ball.y > 490) {
            room.ball.dy *= -1;
        }


        // left and right walls
        if (room.ball.x < 5) {
            room.players[1].score += 1;
            room.ball.x = 395;
            room.ball.y = 245;
            room.ball.dx = 1;
            room.ball.dy = 0;
        }

        if (room.ball.x > 795) {
            room.players[0].score += 1;
            room.ball.x = 395;
            room.ball.y = 245;
            room.ball.dx = -1;
            room.ball.dy = 0;
        }


        if (room.players[0].score === 10) {
            let stat = [room.players[0].score, room.players[0].games, room.players[0].login];
            let stat1 = [room.players[1].score, room.players[1].games, room.players[1].login];
            room.winner = 1;
            rooms = rooms.filter(r => r.id !== room.id);
            io.to(room.id).emit('endGame', room);
            conn.query(queryClose, name, (err, result, field) =>{
                console.log(err);
            });
            conn.query(queryAdd, stat, (err, result, field) =>{
                console.log(err);
            });
            conn.query(queryAdd, stat1, (err, result, field) =>{
                console.log(err);
            });
            clearInterval(interval);
        }

        if (room.players[1].score === 10) {
            let stat = [room.players[0].score, room.players[0].games, room.players[0].login];
            let stat1 = [room.players[1].score, room.players[1].games, room.players[1].login];
            room.winner = 2;
            rooms = rooms.filter(r => r.id !== room.id);
            io.to(room.id).emit('endGame', room);
            conn.query(queryClose, name, (err, result, field) =>{
                console.log(err);
            });
            conn.query(queryAdd, stat, (err, result, field) =>{
                console.log(err);
            });
            conn.query(queryAdd, stat1, (err, result, field) =>{
                console.log(err);
            });
            clearInterval(interval);
        }

        io.to(room.id).emit('updateGame', room);
    }, 1000 / 60);
}

server.listen(3000, () => console.log('Starting server on port 3000'));
