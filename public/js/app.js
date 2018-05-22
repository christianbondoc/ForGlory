console.log("You are in file ~/desktop/TESTESTEST");
//Websocket variable
// var f_socket = io.connect('localhost:4000');
var gameObj = null;
var start = false;
// Link to app on heorku later
var f_socket = io.connect('https://bcit-for-glory.herokuapp.com/');

// Socket variable to connect to the server


//-- LIMITING TURNS AND CARDS. INSERT ME!!! --//
var limitCard = 0;
var limitAttack = 0;

// ROOMS STUFF
var curroom = "";

//-- CLIENT SIDE STATUS --//
var b_status = document.getElementById("b_status");
var b_player = document.getElementById("b_player");


//    Main menu Navigation

var imgHead = document.getElementById("imgHead");
var char8Name = document.getElementById("char8Name");
var startBtn = document.getElementById("startBtn");
var header = document.getElementById("header");
var container1 = document.getElementById("container1");
var container2 = document.getElementById("container2");
var menuA = document.getElementById("menuA");
var menuB = document.getElementById("menuB");
var menuC = document.getElementById("menuC");
var mMenu = document.getElementById("mMenu");
var jMenu = document.getElementById("jMenu");
var hMenu = document.getElementById("hMenu");
var join1 = document.getElementById("join1");
var join2 = document.getElementById("join2");
var host1 = document.getElementById("host1");
var host2 = document.getElementById("host2");

var charMenu = document.getElementById("charMenu");
var signIn = document.getElementById("signIn");
var mMaking = document.getElementById("mMaking");
var readyP = document.getElementById("readyP");
var back2 = document.getElementById("back2");
var back3 = document.getElementById("back3");
var back4 = document.getElementById("back4");
var back5 = document.getElementById("back5");
var back6 = document.getElementById("back6");
var chars1 = document.getElementById("chars1");
var chars2 = document.getElementById("chars2");
var chars3 = document.getElementById("chars3");
var chars4 = document.getElementById("chars4");
var chars5 = document.getElementById("chars5");
var chars6 = document.getElementById("chars6");
var chars7 = document.getElementById("chars7");
var chars8 = document.getElementById("chars8");
var endTurnBtn = document.getElementById("endTurnBtn");
var roomDiv = document.getElementById("roomDiv");

signIn.addEventListener("click", function () {
    menuA.style.display = "none";
    menuB.style.display = "block";
    imgHead.src = "img/instructionsHeader.svg";
});

mMaking.addEventListener("click", function () {
    menuA.style.display = "none";
    menuC.style.display = "block";
    imgHead.src = "img/matchmakingHeader.svg";
});

back2.addEventListener("click", function () {
    menuA.style.display = "block";
    menuB.style.display = "none";
    imgHead.src = "img/mainMenuHeader.svg";
});

back3.addEventListener("click", function () {
    menuA.style.display = "block";
    menuC.style.display = "none";
    imgHead.src = "img/mainMenuHeader.svg";
});





join1.addEventListener("click", function () {

    f_socket.emit("getrooms")

    jMenu.style.display = "block";
    mMenu.style.display = "none";
    imgHead.src = "img/joinHeader.svg";

    f_socket.on("joinrooms", function (data) {

        console.log(data);

        for (var i in data) {

            var ndiv = document.createElement("div");
            // makes the inner html of the room the div


            ndiv.innerHTML = data[i].room;
            console.log(data[i].room);

            roomDiv.appendChild(ndiv);

            // gives the room a div id which matches the name of the room

            ndiv.id = data[i].room;


            // this adds an event listener to the new div created

            ndiv.addEventListener("click", function () {
                // variable contains the id of the div

                var roomname = this.id;

                console.log("This room's id is " + roomname)
                // this emit sends the variable we just created over to the server so that we can use the data to make the user join their selected room

                f_socket.emit("join_room", roomname);
                // this sets a local variable to be used for sending events back and forth
                curroom = roomname;
                console.log(roomname);

                var pn = f_socket.id;

                console.log("The player's number is now " + pn);

                f_socket.emit('updateP2', {
                    pn: pn,
                    roomname: curroom,
                    b_status: "It's Player 1's Turn."
                });
            });
        }
    })
});


back4.addEventListener("click", function () {
    jMenu.style.display = "none";
    mMenu.style.display = "block";
    imgHead.src = "img/matchmakingHeader.svg";
});

host1.addEventListener("click", function () {
    mMenu.style.display = "none";
    hMenu.style.display = "block";
    imgHead.src = "img/hostHeader.svg";
});

back5.addEventListener("click", function () {
    hMenu.style.display = "none";
    mMenu.style.display = "block";
    menuC.style.display = "block";
    imgHead.src = "img/matchmakingHeader.svg";
});

host2.addEventListener("click", function () {
    hMenu.style.display = "none";
    charMenu.style.display = "block";
    imgHead.src = "img/char_title.svg";
});




join2.addEventListener("click", function () {
    jMenu.style.display = "none";
    charMenu.style.display = "block";
    imgHead.src = "img/char_title.svg";
});

roomDiv.addEventListener("click", function () {

    roomDiv.style.textShadow = "1px 1px 1px #292929,5px 5px 2px #000000";

    for (var i = 0; i < roomDiv.length; i++) {
        console.log(i)
        [i].style.textShadow = "5px 5px 1px #ff0000,10px 10px 1px #0000ff";
    }

    // Send what room has been joined

})

readyP.addEventListener("click", function () {
    container1.style.display = "none";
    container2.style.display = "block";



});

back6.addEventListener("click", function () {
    charMenu.style.display = "none";
    mMenu.style.display = "block";
    menuC.style.display = "block";
    imgHead.src = "img/matchmakingHeader.svg";
});

// Class Variables
var commander = document.getElementsByClassName("commander"),
    leftField = document.getElementsByClassName("left-field"),
    rightField = document.getElementsByClassName("right-field"),
    dropArea = document.getElementsByClassName("dropArea"),

    lightMins = document.getElementsByClassName("light-mins"),
    darkMins = document.getElementsByClassName("dark-mins"),

    cards = document.getElementsByClassName("cards"),
    smallCards = document.getElementsByClassName("small-cards");

// ID Variables
var lightCommander = document.getElementById("lightCommander"),
    lightDog = document.getElementById("lightDog"),
    lightSoldier = document.getElementById("lightSoldier"),
    lightArcher = document.getElementById("lightArcher"),

    darkCommander = document.getElementById("darkCommander"),
    darkWizard = document.getElementById("darkWizard"),
    darkGrunt = document.getElementById("darkGrunt"),
    darkDog = document.getElementById("darkDog"),

    card1 = document.getElementById("card1"),
    card2 = document.getElementById("card2"),
    card3 = document.getElementById("card3"),

    menu = document.getElementById("main-menu"),
    cName = document.getElementById("cName"),
    cHp = document.getElementById("cHp"),
    cAtk = document.getElementById("cAtk"),


    ntCommanders = document.getElementsByClassName("nameTagCommanders"),
    ntMinions = document.getElementsByClassName("nameTagMinions"),

    ntlightCommander = document.getElementById("ntlightCommander"),
    ntlightArcher = document.getElementById("ntlightArcher"),
    ntlightSoldier = document.getElementById("ntlightSoldier"),
    ntlightDog = document.getElementById("ntlightDog"),

    ntdarkCommander = document.getElementById("ntdarkCommander"),
    ntdarkWizard = document.getElementById("ntdarkWizard"),
    ntdarkGrunt = document.getElementById("ntdarkGrunt"),
    ntdarkDog = document.getElementById("ntdarkDog"),
    nameTag = document.getElementsByClassName("nameTag"),
    ntActive = document.getElementsByClassName("nameTag-Active"),
    discardPile = document.getElementById("discard-pile"),
    roomDiv = document.getElementById("roomDiv");
deckPile = document.getElementById("deck-pile");


host2.addEventListener("click", function () {

    var hostInput = document.getElementById("hostInput").value;
    f_socket.emit('new_room', {
        room: hostInput
    });

    curroom = hostInput
    console.log(curroom);

    var pn = f_socket.id;

    console.log("The player's number is now " + pn);

    f_socket.emit('updateP1', {
        pn: pn,
        roomname: curroom
    });


});



// Dropping the cards 
var updateObj = {
    card: "",
    monster: ""
};



/* ___  ___    _ ___ ___ _____ ___ _ 
  / _ \| _ )_ | | __/ __|_   _/ __| |
 | (_) | _ \ || | _| (__  | | \__ \_|
  \___/|___/\__/|___\___| |_| |___(_)
  */

function changeDiv(id, type) {

    var mon = null;

    if (type == "dark") {
        mon = gameObj.drkSide[id];
    } else if (type == "light") {
        mon = gameObj.lghtSide[id];
    }

    /*cName.innerHTML = gameObj.lghtSide[id].name;
    cHp.innerHTML = "Health: " + gameObj.lghtSide[id].health;
    cAtk.innerHTML = "ATK: " + gameObj.lghtSide[id].atk;*/
    //innerHTML stuff
}

//monStats = document.getElementsByClassName("allMins");


// SETTING THE STATES




/*   
_____ _   _ _   _  ____ _____ ___ ___  _   _ ____  
|  ___| | | | \ | |/ ___|_   _|_ _/ _ \| \ | / ___| 
| |_  | | | |  \| | |     | |  | | | | |  \| \___ \ 
|  _| | |_| | |\  | |___  | |  | | |_| | |\  |___) |
|_|    \___/|_| \_|\____| |_| |___\___/|_| \_|____/      

*/



// jQuery for dragging and dropping

var dragid = "";

$(document).ready(function () {

    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    /*setInterval(()=>{
        var mtop = parseInt($('.bgScroll').css("top"))+1;
        var mleft = parseInt($('.bgScroll').css("left"))-1;
        $('.bgScroll').css({"top" : mtop+"px", "left" : mleft+"px"});
    },16)*/

    $(".bgScroll").mousemove(function (e) {
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 25;
        var newvalueY = height * pageY * -1;
        $('.bgScroll').css({ "top": newvalueY + "px", "left": newvalueX + "px" });
    });

    $(".cards").draggable({
        opacity: .3,
        containment: "#container2",
        scroll: false,

        /* Fix this for UX purposes */
        // How to change height/width of clicked object
        // Function starts here 

        start: function (event, ui) {
            dragid = $(this).attr("id");
            // Changing card value to picked up card 
            updateObj.card = dragid;
        }

    });

    // When you drop card; change dark minion value

    $(".dark-mins").droppable({
        drop: function (event, ui) {
            //-- INSERT ME --//
            if (limitCard < 1) {
                var dropid = $(this).attr("id");

                console.log(dropid);
                updateObj.monster = dropid
                // Turning object from backend into a variable
                console.log(updateObj);

                //-- Updates the Number card drops --//
                //-- INSERT ME --//

                limitCard++;
                console.log(limitCard);

                //-- INSERT UNTIL HERE --//

                $(".attackUpSpSh").appendTo(this);

                // Update server with drop function

                f_socket.emit('updateDarkMin', {
                    backendUpdateObj: updateObj,
                    roomname: curroom,
                    b_status: updateObj.monster + " has been boosted!"
                });

                //-- INSERT HERE --//
            } else {
                alert("You already played a card.");
            }

            // -- INSERT UNTIL HERE -- //
        }
    });
    // When you drop card; change light minion value

    $(".light-mins").droppable({
        drop: function (event, ui) {
            //-- INSERT ME --//
            if (limitCard < 1) {
                var dropid = $(this).attr("id");

                console.log(dropid);
                updateObj.monster = dropid;

                console.log(updateObj);

                // Update server with drop function
                f_socket.emit('updateLightMin', {
                    backendUpdateObj: updateObj,
                    roomname: curroom,
                    b_status: updateObj.monster + " has been boosted!"
                });

                /-- Updates the Number card drops --/ /
                    //-- INSERT ME --//


                    limitCard++;
                console.log(limitCard);

                // Feedback attempt
                $(".attackUpSpSh").appendTo(this);

                //-- INSERT HERE --//
            } else {
                alert("You already played a card.");
            }

            // -- INSERT UNTIL HERE -- //

        }
    });
    // Main menu toggle

    // Maybe make a lock div for this
})

// End jQuery

// receiving events from the server
// Calling gameObj via sockets


// Minion dying/removed/died/dead

var removeMinCountLight = 0;
var removeMinCountDark = 0;
// GAMEOBJ TO COMMUNICATE WITH BACK END 
f_socket.on('gameStatus', function (tgameObj) {
    console.log(tgameObj);

    var pn = f_socket.id;

    console.log(tgameObj.p1 + " and " + pn);
    if (pn == tgameObj.p1) {
        b_player.innerHTML = "Player 1";
    } else {
        b_player.innerHTML = "Player 2";
    }
    if (gameObj == null && start == false) {
        start = true;
        monStats = document.getElementsByClassName("allMins");

        // Variable for monsters attacking animation
        var atki = null;
        var atki2 = null;

        // Click Monster Loop
        for (var i = 0; i < monStats.length; i++) {
            monStats[i].addEventListener("click", function () {


                var pn = f_socket.id;

                console.log("The player's pn is ", pn);
                console.log("The game object number is ", gameObj.p1);

                //--INSERT ME DEC7 --//
                var b_turn = gameObj.turn;
                b_status.innerHTML = gameObj.b_status;

                //--INSERT ME--//                    
                if ((pn == gameObj.p1 && gameObj.turn == 1) || (pn == gameObj.p2 && gameObj.turn == 2)) {

                    var curMon = null;
                    console.log(atkState);
                    // Confirming if light side
                    if (gameObj.lghtSide[this.id]) {
                        curMon = gameObj.lghtSide[this.id];
                        monIdOne = [this.id];

                        // Confirming if dark side
                    } else {
                        curMon = gameObj.drkSide[this.id];
                        monIdOne = [this.id];
                    }
                    // vvvvvv FIRST CLICK vvvvvvvvv

                    if (atkState.clickState == 0) {

                        atkState.minOne = curMon;
                        // ClickState = 1 unit has been selected
                        atkState.clickState = 1;
                        //Confirming everything
                        console.log("State: " + atkState.clickState);

                        atkState.monIdOne = [this.id];
                        console.log(atkState.monIdOne);

                        var atkID = [this.id]
                        console.log([this.id]);

                        //-- DETECTS MONSTER CLICKED ON --//
                        b_status.innerHTML = "You have selected " + [this.id] + ".";


                    }



                    // Click state 2 is when minion is confirmed not same minion type vvvvvvv SECOND CLICK HERE vvvvvvv

                    else if (atkState.clickState == 1 && atkState.minOne.minType != curMon.minType) {
                        // -- INSERT ME --//
                        if (limitAttack <= 0) {
                            // 2nd clickstate
                            atkState.clickState = 2;
                            atkState.minTwo = curMon;
                            console.log("Click State is on state: "
                                + atkState.clickState);
                            console.log(atkState.minTwo);
                            console.log("Curmon: " + curMon);

                            atkState.monIdTwo = [this.id];
                            console.log(atkState.monIdTwo);



                            // Attack Animation
                            atki = tgameObj.drkSide[i];
                            console.log(atki);

                            document.getElementById(atkState.monIdOne).style.animation = animations[atkState.monIdOne].attack;
                            document.getElementById(atkState.monIdTwo).style.animation = animations[atkState.monIdTwo].damaged;

                            var monAttacker = atkState.monIdOne;
                            var monHurt = atkState.monIdTwo;

                            var idleSet = animations[atkState.monIdOne].idle;
                            var idleSetTwo = animations[atkState.monIdTwo].idle;
                            var attackSet = animations[atkState.monIdTwo].damaged;

                            console.log("test: " + attackSet);

                            console.log("Attacking Animation is on: ", document.getElementById(atkState.monIdOne));
                            console.log("Damaged Animation is on: ", document.getElementById(atkState.monIdTwo));

                            setTimeout(function () {
                                document.getElementById(monAttacker).style.animation = idleSet;

                            }, 1200);

                            console.log("Light count: ", removeMinCountLight);
                            console.log("Dark count: ", removeMinCountDark);

                            setTimeout(function () {

                                document.getElementById(monHurt).style.animation = idleSetTwo;

                            }, 1500);


                            // Why only wizard animation if > i <

                            //-- INSERTED DEC 7 --//
                            var attacker = atkState.minOne.name;
                            var victim = atkState.minTwo.name;

                            console.log("Monster being selected for first click is: ", atkState.monIdOne);


                            //Send atkState to backend
                            f_socket.emit('updateStatus', {
                                backendUpdateObj: atkState,
                                roomname: curroom,
                                b_status: attacker + " is attacking " + victim + "."
                            });

                            //-- INSERT ME ---//
                            limitAttack++;

                            if (limitAttack == 1) {

                                setTimeout(() => {
                                    alert("Your Turn Has Ended");
                                }, 2500);
                            }
                            // if (limitAttack == 1){
                            // alert("blahblahblah");
                        }

                        // END INSERT //

                    }
                    // Error log
                    else {
                        console.log("Invalid");
                        alert("You can't attack your own team!");
                    }
                    //---INSERT ME DEC7---//
                } else {
                    b_status.innerHTML = "It's not your turn!";
                }
            })
        }
    }



    atkState = {
        clickState: 0,
        minOne: null,
        minTwo: null,
        backendUpdateObj: updateObj,
        roomname: curroom
    }
    gameObj = tgameObj;


    var moni = null;
    var moni2 = null;



    for (var i in gameObj.lghtSide) {
        if (gameObj.lghtSide[i].health <= 0 && gameObj.lghtSide[i].isAlive == true) {

            removeMinCountLight++;
            console.log("Light Minions who have died: " + removeMinCountLight);

            f_socket.emit('lightsideUpdateDeath', {
                monster: gameObj.lghtSide[i],
                roomname: curroom

            })

            moni = [i];
            document.getElementById(i).style.animation = animations[i].death;
            console.log(moni);

            setTimeout(function () {
                $("#" + moni).remove();
                console.log("monster is removed" + moni);
                moni = null;
                moni2 = null;
            }, 1000);


            console.log(removeMinCountLight);
            if (removeMinCountLight == 4) {
                removeMinCountLight = 0;


                // DARK SIDE WIN CONDITION
                setTimeout(function () {

                    var darkWinner = document.createElement("div");

                    darkWinner.setAttribute("class", "darkWinner")

                    container2.appendChild(darkWinner);

                }, 1000);


            }
        }
    }

    // Name Tag Remove
    for (var i in gameObj.lghtSide) {
        if (gameObj.lghtSide[i].health <= 0) {
            $("#nt" + i).remove();
        }
    }


    for (var i in gameObj.drkSide) {
        console.log(gameObj.drkSide[i]);
        if (gameObj.drkSide[i].health <= 0 && gameObj.drkSide[i].isAlive == true) {

            removeMinCountDark++;
            console.log("Dark Minions who have died: " + removeMinCountDark);

            f_socket.emit('lightsideUpdateDeath', {
                monster: gameObj.drkSide[i],
                roomname: curroom
            })

            moni = [i];
            document.getElementById(i).style.animation = animations[i].death;
            console.log(moni);

            setTimeout(function () {
                $("#" + moni).remove();

                console.log("monster is removed " + moni);
                moni = null;
                moni2 = null;
            }, 1500);

            console.log(removeMinCountDark);
            // LIGHT SIDE WIN CONDITION 
            if (removeMinCountDark == 4) {
                removeMinCountDark = 0;


                setTimeout(function () {

                    var lightWinner = document.createElement("div");

                    lightWinner.setAttribute("class", "lightWinner")

                    container2.appendChild(lightWinner);

                }, 1000);


            }
        }
    }
    for (var i in gameObj.drkSide) {
        if (gameObj.drkSide[i].health <= 0) {
            $("#nt" + i).remove();
        }
    }


    //LIGHT SIDE SERVER SIDE
    ntlightCommander.innerHTML = "<div style='left: 30px; top: 10px; position: relative; display: block; font-size: 2em; color: white'>" + gameObj.lghtSide.lightCommander.name + "</div>" + "<div style='left: 220px; top: 55px; position: absolute; font-size: 1.1em; color: white'>" + gameObj.lghtSide.lightCommander.health + "</div>" + "<div style='left: 265px; top: 55px; position: absolute; font-size: 1.1em; color: white'>" + gameObj.lghtSide.lightCommander.atk;

    ntlightDog.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.lghtSide.lightDog.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightDog.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightDog.atk + "</div>";

    ntlightSoldier.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.lghtSide.lightSoldier.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightSoldier.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightSoldier.atk + "</div>";

    ntlightArcher.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.lghtSide.lightArcher.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightArcher.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightArcher.atk + "</div>";

    // DARK SIDE 
    ntdarkCommander.innerHTML =
        "<div style='left: 23px; top: 10px; position: relative; display: block; font-size: 1.9em; color: white'>" + gameObj.drkSide.darkCommander.name + "</div>" + "<div style='left: 220px; top: 55px; position: absolute; font-size: 1.1em; color: white'>" + gameObj.drkSide.darkCommander.health + "</div>" + "<div style='left: 265px; top: 55px; position: absolute; font-size: 1.1em; color: white'>" + gameObj.drkSide.darkCommander.atk + "</div>";

    ntdarkDog.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.drkSide.darkDog.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkDog.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkDog.atk + "</div>";

    ntdarkGrunt.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.drkSide.darkGrunt.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkGrunt.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkGrunt.atk + "</div>";

    ntdarkWizard.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.drkSide.darkWizard.name + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkWizard.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkWizard.atk + "</div>";

    //--INSERT ME THIS UPDATES THE GAME WHEN THE GAME STATUS CHANGES--//
    b_status.innerHTML = gameObj.b_status;
}); // <--- GAMESTATUS ENDS HERE


// CLICKABLE LOOPS

var atkState = {
    //Setting state for clicking, starts at 0
    clickState: 0,
    // First minion clicked
    minOne: null,
    // Second minion
    minTwo: null,
    monIdOne: null,
    monIdTwo: null
};



// clickState = 1 is when set minion is chosen

function attackFunc() {

    var attacker = atkState.minOne.atk;
    var victim = atkState.minTwo.health;
    var result = victim - attacker;
    atkState.minTwo.health = result;
    console.log(atkState.minTwo);
    //console.log(gameObj.lghtSide.lightSoldier.health);

    // resetting the atkState
    atkState = {
        clickState: 0,
        minOne: null,
        minTwo: null
    }
    console.log(atkState.clickState);
}

// <--- this allows gameObj from backend to read to frontend 



/*
 


    drawing card concept
        card deck array in back end [?]


    how to fix animations

    How to make back end result <= 0 disappear */

lightDog.addEventListener("mouseover", function () {
    ntlightDog.style.display = "block";
    lightDog.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

lightDog.addEventListener("mouseout", function () {
    ntlightDog.style.display = "none";
    lightDog.style.filter = "none";
});


lightSoldier.addEventListener("mouseover", function () {
    ntlightSoldier.style.display = "block";
    lightSoldier.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

lightSoldier.addEventListener("mouseout", function () {
    ntlightSoldier.style.display = "none";
    lightSoldier.style.filter = "none";
});

lightArcher.addEventListener("mouseover", function () {
    ntlightArcher.style.display = "block";
    lightArcher.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

lightArcher.addEventListener("mouseout", function () {
    ntlightArcher.style.display = "none";
    lightArcher.style.filter = "none";
});

lightCommander.addEventListener("mouseover", function () {
    ntlightCommander.style.display = "block";
    lightCommander.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

lightCommander.addEventListener("mouseout", function () {
    ntlightCommander.style.display = "none";
    lightCommander.style.filter = "none";
});

darkCommander.addEventListener("mouseover", function () {
    ntdarkCommander.style.display = "block";
    darkCommander.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

darkCommander.addEventListener("mouseout", function () {
    ntdarkCommander.style.display = "none";
    darkCommander.style.filter = "none";
});

darkDog.addEventListener("mouseover", function () {
    ntdarkDog.style.display = "block";
    darkDog.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

darkDog.addEventListener("mouseout", function () {
    ntdarkDog.style.display = "none";
    darkDog.style.filter = "none";
});

darkWizard.addEventListener("mouseover", function () {
    ntdarkWizard.style.display = "block";
    darkWizard.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

darkWizard.addEventListener("mouseout", function () {
    ntdarkWizard.style.display = "none";
    darkWizard.style.filter = "none";
});

darkGrunt.addEventListener("mouseover", function () {
    ntdarkGrunt.style.display = "block";
    darkGrunt.style.filter = "drop-shadow(0px 0px 10px #ffffff)";
});

darkGrunt.addEventListener("mouseout", function () {
    ntdarkGrunt.style.display = "none";
    darkGrunt.style.filter = "none";
});


// Set player 1 & 2 for light or dark

// Join1 onClick = ask server to send a rooms array

// Need to tell the SERVER when a minion's health is 0, and have the server to emit back to the curroom to remove the minion from the curroom. 

// Need to tell the SERVER when a minion's health is 0, and have the server to emit back to the curroom to remove the minion from the curroom. 

endTurnBtn.addEventListener("click", function () {
    var pn = f_socket.id;
    var current_turn = "";

    //-- INSERT ME NEW. Doesn't work l o l --// -- turns
    if (gameObj.turn == 1) {
        current_turn = "It's Player 1's Turn.";
    }

    else if (gameObj.turn == 2) {
        current_turn = "It's Player 2's Turn.";
    }
    console.log(current_turn);

    f_socket.emit('updateTurn', {
        turn: gameObj.turn,
        roomname: curroom,
        b_status: current_turn
    });

    limitCard = 0;
    limitAttack = 0;

    console.log("Current turn is ", gameObj.turn);
    console.log("Update turn!");
})

// Animaton spreadsheets

var animations = {

    // Light Side Animations
    "lightCommander": {
        idle: "lightCommanderIdle 2s steps(8) infinite",
        attack: "lightCommanderAttack 1s steps(8) forwards",
        damaged: "lightCommanderDamaged 0.5s steps(8) forwards",
        death: "lightCommanderDeath 0.5s steps(8) forwards"

    },

    "lightArcher": {
        idle: "lightArcherIdle 2s steps(9) infinite",
        attack: "lightArcherAttack 1s steps(9) forwards",
        damaged: "lightArcherDamaged 0.5s steps(9) forwards",
        death: "lightArcherDeath 0.5s steps(9) forwards"

    },

    "lightSoldier": {
        idle: "lightSoldierIdle 2s steps(9) infinite",
        attack: "lightSoldierAttack 0.8s steps(9) forwards",
        damaged: "lightSoldierDamaged 0.5s steps(9) forwards",
        death: "lightSoldierDeath 1s steps(9) forwards"

    },

    "lightDog": {
        idle: "lightDogIdle 1s steps(8) infinite",
        attack: "lightDogAttack .7s steps(8) forwards",
        damaged: "lightDogDamaged 0.5s steps(8) forwards",
        death: "lightDogDeath 0.9s steps(8) forwards"

    },

    //Dark Side Animations

    "darkCommander": {
        idle: "darkCommanderIdle 1s steps(11) infinite",
        attack: "darkCommanderAttack 1.1s steps(11) forwards",
        damaged: "darkCommanderDamaged 0.5s steps(11) forwards",
        death: "darkCommanderDeath 1.1s steps(11) forwards"
    },
    "darkWizard": {
        idle: "darkWizardIdle 1.5s steps(12) infinite",
        attack: "darkWizardAttack 1s steps(12)",
        damaged: "darkWizardDamaged 0.5s steps(12) forwards",
        death: "darkWizardDeath 1.5s steps(12)"
    },
    "darkGrunt": {
        idle: "darkGruntIdle 1.3s steps(9) infinite",
        attack: "darkGruntAttack 1s steps(9) forwards",
        damaged: "darkGruntDamaged 0.5s steps(9) forwards",
        death: "darkGruntDeath 1.1s steps(9) forwards"
    },

    "darkDog": {
        idle: "darkDogIdle 1s steps(10) infinite",
        attack: "darkDogAttack 0.8s steps(10) forwards",
        damaged: "darkDogDamaged 0.5s steps(10) forwards",
        death: "darkDogDeath 1.5s steps(10)"
    }

};



// // New Start Menu Stuff

var back7 = document.getElementById("back7");
var exitGame = document.getElementById("exitGame");
var menuBtn = document.getElementById("menuBtn");
var menuContainer = document.getElementById("menuContainer");

menuBtn.addEventListener("click", function () {
    menuBtn.style.display = "none";
    menuContainer.style.display = "block";
});

back7.addEventListener("click", function () {
    menuContainer.style.display = "none";
    menuBtn.style.display = "block";
});



var darkBox = document.getElementById("darkBox");
var lightBox = document.getElementById("lightBox");

darkBox.addEventListener("click", function () {
    darkBox.style.filter = "drop-shadow(0px 0px 30px #000000)";
    lightBox.style.filter = "none";
});

lightBox.addEventListener("click", function () {
    lightBox.style.filter = "drop-shadow(0px 0px 30px #ffffff)";
    darkBox.style.filter = "none";
});

startBtn.addEventListener("click", function () {
    document.querySelector('#scrollHere').scrollIntoView({ behavior: 'smooth' });

});

back1.addEventListener("click", function () {
    document.querySelector('#startBtn').scrollIntoView({ behavior: 'smooth' });
});

exitGame.addEventListener("click", function () {
    container1.style.display = "block";
    container2.style.display = "none";
});