import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

import Ball from "./ball.js";
import Player from "./player.js";

let k = 3;
let span1 = "";
let span2 = "";
const txt1 = document.getElementById("txt1");
const txt2 = document.getElementById("txt2");
let stat = "";
stat = `<style> img{position: relative; top: 10%; right: 22%;} </style><img src='./game/ava.png' height='350px' width='350px'>`;
const stat1 = document.getElementById("stat1");
const stat2 = document.getElementById("stat2");

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

let message = document.getElementById('message');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


let player1;
let player2;
let ball;

let isGameStarted = false;
let playerNo = 0;
let roomID;

//span1 = `${room.players[0].nick}`;
//txt1.innerHTML = span1;

const socket = io("http://192.168.0.104:3000", {
    transports: ['websocket']
});

function startGame() {
    startBtn.style.display = 'none';

    if (socket.connected) {
        socket.emit('join');
        message.innerText = "Waiting for other player..."
    }
    else {
        message.innerText = "Refresh the page and try again..."
    }
}

socket.on("playerNo", (newPlayerNo) => {
    console.log(newPlayerNo);
    playerNo = newPlayerNo;
    if(playerNo == 1){
        stat1.innerHTML = stat; //debug
        k = k - 1;
    } else if(playerNo == 2){
        stat2.innerHTML = stat; //debug
        k = k - 2;
    }
});

socket.on("startingGame", () => {
    isGameStarted = true;
    if(k == 2){
        stat2.innerHTML = stat;
    } else if(k == 1){
        stat1.innerHTML = stat;
    }
    message.innerText = "We are going to start the game...";
});

socket.on("startedGame", (room) => {
    console.log(room);
    k = 3;
    span1 = `${room.players[0].nick}`;
    span2 = `${room.players[1].nick}`;
    txt1.innerHTML = span1;
    txt2.innerHTML = span2;

    roomID = room.id;
    message.innerText = "";

    player1 = new Player(room.players[0].x, room.players[0].y, 20, 60, '#FF6666');
    player2 = new Player(room.players[1].x, room.players[1].y, 20, 60, '#66FFFF');

    player1.score = room.players[0].score;
    player2.score = room.players[1].score;


    ball = new Ball(room.ball.x, room.ball.y, 10, 'white');

    window.addEventListener('keydown', (e) => {
        if (isGameStarted) {
            if (e.key === 'w') {
                console.log("player move 1 up")
                socket.emit("move", {
                    roomID: roomID,
                    playerNo: playerNo,
                    direction: 'up'
                })
            } else if (e.key === 's') {
                console.log("player move 1 down")
                socket.emit("move", {
                    roomID: roomID,
                    playerNo: playerNo,
                    direction: 'down'
                })
            }
        }
    });

    draw();
});

socket.on("updateGame", (room) => {
    player1.y = room.players[0].y;
    player2.y = room.players[1].y;

    player1.score = room.players[0].score;
    player2.score = room.players[1].score;

    ball.x = room.ball.x;
    ball.y = room.ball.y;

    draw();
});

socket.on("endGame", (room) => {
    isGameStarted = false;
    message.innerText = `${room.winner === playerNo ? "You Win!" : "You Lose!"}`;
    
    room.players[0].score = room.players[0].save + player1.score;
    room.players[1].score = room.players[1].save + player1.score;
    room.players[0].games = room.players[0].games + 1;
    room.players[1].games = room.players[1].games + 1;
    console.log(room);

    socket.emit("leave", roomID);


    setTimeout(() => {
        ctx.clearRect(0, 0, 800, 500);
        startBtn.style.display = 'block';
        //document.location.href = 'http://192.168.0.104/profile.php';
    }, 2000);
});



function draw() {
    ctx.clearRect(0, 0, 800, 500);


    player1.draw(ctx);
    player2.draw(ctx);
    ball.draw(ctx);

    // center line
    ctx.strokeStyle = '#333333';
    ctx.beginPath();
    ctx.setLineDash([10, 10])
    ctx.moveTo(400, 5);
    ctx.lineTo(400, 495);
    ctx.stroke();
}