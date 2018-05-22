// setting up the app to require things

var express = require('express');
var http = require('http');

// this creates the server with a port of 4000
var port = process.env.PORT || 4000;
// process.env.PORT for Heroku
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Static files to serve
app.use(express.static('public'));

server.listen(port, function () {
    console.log("The server is running.");
});

var rooms = {};

console.log(rooms);

var gameObj = {
    lghtSide: {
        "lightCommander": {
            name: "Light Commander",
            health: 32,
            atk: 18,
            minType: "light",
            isAlive: true
        },
        "lightDog": {
            name: "Light Dog",
            health: 15,
            atk: 10,
            minType: "light",
            isAlive: true
        },
        "lightSoldier": {
            name: "Light Soldier",
            health: 17,
            atk: 8,
            minType: "light",
            isAlive: true
        },
        "lightArcher": {
            name: "Light Archer",
            health: 15,
            atk: 10,
            minType: "light",
            isAlive: true
        }
    },
    drkSide: {
        "darkCommander": {
            name: "Dark Commander",
            health: 26,
            atk: 24,
            minType: "dark",
            isAlive: true
        },
        "darkDog": {
            name: "Dark Dog",
            health: 18,
            atk: 7,
            minType: "dark",
            isAlive: true
        },
        "darkGrunt": {
            name: "Dark Grunt",
            health: 20,
            atk: 5,
            minType: "dark",
            isAlive: true
        },
        "darkWizard": {
            name: "Dark Wizard",
            health: 15,
            atk: 10,
            minType: "dark",
            isAlive: true
        }
    },

    p1: null,
    p2: null,
    p1state: 1,
    p2state: 0,
    b_status: "Waiting for Player 2.",
    turn: 1

}; // GAMEOBJ ENDS



// CARDS OBJECTS, EQUALS TO 2
var cardObj = {
    lghtSide: {
        "card1": {
            atk: 50,
            health: 0
        },
        "card2": {
            health: 5,
            atk: 0
        },
        "card3": {
            atk: 5,
            health: 0
        }
    },
    drkSide: {
        "card1": {
            atk: 50,
            health: 0
        },
        "card2": {
            atk: 0,
            health: 5
        },
        "card3": {
            health: 0,
            atk: 5
        }
    }
};



io.on('connection', function (socket) {

    //--ALL GAME FUNCTIONS MUST COME AFTER THIS EMIT--//

    //Rooms
    socket.on('new_room', function (data) {

        var room = data;
        // pushes the room to the server side array so everyone sees the same thing when they open the page
        rooms[data.room] = {
            gameObj: JSON.parse(JSON.stringify(gameObj)),
            room: data.room
        };
        // user joins the room upon creating it
        socket.join(data.room);
        // using the console to ensure that the join was successful.  appears in console bc it's server side.
        console.log("Joined room " + data.room)

        console.log("Data is ", data)
        // emits the rooms array back to the other sockets

        /* How to do
            if (data == ''){
                Cannot join a room, please select room
            }
        */


        io.sockets.emit('new_room', rooms);

    });


    //--ALL GAME FUNCTIONS MUST COME AFTER THIS EMIT--//

    socket.on("getrooms", function () {
        socket.emit("joinrooms", rooms)
    });

    // needs to update just to room
    socket.on("lightsideUpdateDeath", function (data) {
        socket.emit("") // Send back that its dead
    })

    //sets player 1
    socket.on('updateP1', function (data) {

        room = data.roomname;
        rooms[data.roomname].gameObj.p1 = data.pn;
        // console.log("p1 is now " + rooms[data.roomname].gameObj.p1);
        // why does this make the code crash? says gameObj of rooms[data.roomname].gameObj.p1 is undefined
        io.in(room).emit('gameStatus', rooms[data.roomname].gameObj);

        //-- INSERT ME ---//
        io.in(room).emit('gameStatus', rooms[data.roomname].gameObj);


    });

    // sets player 2
    socket.on('updateP2', function (data) {
        console.log("update p2");
        console.log("P2:", rooms[data.roomname].gameObj.p2 = data.pn);

        room = data.roomname;
        rooms[data.roomname].gameObj.p2 = data.pn;

        //-- INSERT ME NEW--//
        rooms[data.roomname].gameObj.b_status = data.b_status;

        console.log("p2 is now " + rooms[data.roomname].gameObj.p2);
        console.log(rooms[data.roomname].gameObj);

        io.in(room).emit('gameStatus', rooms[data.roomname].gameObj);

    });

    socket.on('updateTurn', function (data) {

        var room = data.roomname;


        //-- THIS DOES THE THING DEC7--//
        if (rooms[data.roomname].gameObj.turn == 1) {
            rooms[data.roomname].gameObj.turn = 2;
            rooms[data.roomname].gameObj.b_status = "It's Player 2's Turn";
        } else if (rooms[data.roomname].gameObj.turn == 2) {
            rooms[data.roomname].gameObj.turn = 1;
            rooms[data.roomname].gameObj.b_status = "It's Player 1's Turn.";
        }

        console.log("Data from the game is ", data.turn);
        console.log("GameOb.turn is = ", rooms[data.roomname].gameObj.turn);

        io.in(room).emit('gameStatus', rooms[data.roomname].gameObj);

    });





    // this function allows a user to join their selected room with data sent by ndiv's event listener
    socket.on('join_room', function (roomname) {
        // joining the room
        socket.join(roomname);
        // using the console to ensure that the join was successful.  appears in console bc it's server side.
        console.log("Joined room " + roomname)
    });


    io.sockets.emit('gameStatus', gameObj, rooms);

    socket.on('updateAtk', function (data) {
        // Not sure what to send from client here
    })

    // when someone sends an event, update status
    socket.on('updateStatus', function (data) {
        console.log(data);
        console.log("Min one is ", data.backendUpdateObj.minOne)
        console.log("Min Two is ", data.backendUpdateObj.minTwo)

        var attacker = data.backendUpdateObj.minOne.atk; // <--- error 
        var victim = data.backendUpdateObj.minTwo.health;
        // calculation of result
        var result = victim - attacker;
        // calculate number and set to result
        console.log("The result is " + result);




        if (data.backendUpdateObj.minTwo.minType == "dark") {
            console.log("The minion being attacked is dark");

            console.log(data.backendUpdateObj.monIdTwo);

            rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monIdTwo].health = result;
        }

        if (data.backendUpdateObj.minTwo.minType == "light") {
            console.log("The minion being attacked is light");
            rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monIdTwo].health = result;
        }

        //-- UPDATES THE GAME STATUS --//
        rooms[data.roomname].gameObj.b_status = data.b_status;


        console.log("Line 268", result);


        console.log("result", result, data);

        var room = data.roomname
        // Sends info to the room only
        io.in(room).emit('gameStatus', rooms[data.roomname].gameObj);

        if (data.backendUpdateObj.minTwo.minType == "dark") {
            if (rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monIdTwo].health <= 0) {
                rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monIdTwo].isAlive = false
            }
        }

        if (data.backendUpdateObj.minTwo.minType == "light") {
            if (rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monIdTwo].health <= 0) {
                rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monIdTwo].isAlive = false
            }
        }

    });

    socket.on('updateDarkMin', function (data) {

        var room = data.roomname;

        //-- INSERT ME NEW --//
        rooms[data.roomname].gameObj.b_status = data.b_status;

        console.log("The data sent over is ", data);

        // LINE 134 CHANGES THE ATK VALUE OF DARK BOIS
        var result = rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].atk + cardObj.drkSide[data.backendUpdateObj.card].atk // DARK SIDE ATK
        // ^^ with rooms, after min dies backend is looking for this
        // .card and .monster are from updateObj

        console.log(result + " DARK SIDE CHANGED");

        rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].atk = result;
        // ^^ vvv I dont get it??
        var result = rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].health + cardObj.drkSide[data.backendUpdateObj.card].health// DARK SIDE HEALTH?

        console.log(result + " DARK SIDE CHANGED");
        rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].health = result;
        // DARK SIDE HEALTH


        io.sockets.in(room).emit('gameStatus', rooms[data.roomname].gameObj);

    });

    socket.on('updateLightMin', function (data) {

        var room = data.roomname;
        //-- INSERT ME NEW --//

        // LIGHT SIDE ATTACK 
        rooms[data.roomname].gameObj.b_status = data.b_status;
        var result = rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monster].atk + cardObj.lghtSide[data.backendUpdateObj.card].atk // LIGHT SIDE ATTACK
        console.log(result + " LIGHTSIDE CHANGED");
        rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monster].atk = result;
        console.log("Lightside attack: ", rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monster].atk)

        // LIGHT SIDE HEALTH
        var result = rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monster].health + cardObj.lghtSide[data.backendUpdateObj.card].health // health i think?
        rooms[data.roomname].gameObj.lghtSide[data.backendUpdateObj.monster].health = result;

        io.sockets.in(room).emit('gameStatus', rooms[data.roomname].gameObj);


    });

});

/// from line 311 and below
/* 


        var drkAtkresult = rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].atk + cardObj.drkSide[data.backendUpdateObj.card].atk // DARK SIDE ATK
// ^^ with rooms, after min dies backend is looking for this
        // .card and .monster are from updateObj
        
        
        // rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].atk = drkAtkresult;
        console.log("315, dark attack is now ", drkAtkresult);
        
        // DARK SIDE HEALTH
        var drkHealthresult = rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].health + cardObj.drkSide[data.backendUpdateObj.card].health// DARK SIDE HEALTH
        
        // rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].health = drkHealthresult;
        console.log("321, Dark Health is now ", drkHealthresult)

        console.log("324, ", rooms[data.roomname].gameObj.drkSide[data.backendUpdateObj.monster].health)

        console.log("PLEASE WORK: ", drkHealthresult = gameObj.drkSide.health)
        drkHealthresult = gameObj.drkSide.health;
        io.sockets.in(room).emit('gameStatus', rooms[data.roomname].gameObj);

*/