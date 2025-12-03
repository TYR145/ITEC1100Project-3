//
//Global Variables for Innit function
//
var canvas;
var ctx;
var bg_img;
var player_img;      //NOTE: Added these bc JS validator caught these as undefined
var playerDead_img;  //
var enemy_img;       //

/*setting player variables*/
var player_x = 100;
var player_y = 230;
var player_speed = 4; //setting speed of player movement
var player_dead = false;

/*setting enemy variables*/
var enemy_x = 850;
var enemy_y = 240;
var enemy_speed = 4.5; //setting overall speed of enemy ??
var enemy_dead = false;

//
//Drawing canvas
//
window.onload = Innit; //defining the function Innit (helps silence JS validators... --> defined in HTML though)
function Innit() {
    // drawing the canvas
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext("2d");

    // background image
    bg_img = new Image();
    bg_img.src = "images/background.png";
    bg_img.onload = function () {
        ctx.drawImage(bg_img, 0, 0, canvas.width, canvas.height);
    };

    // player image
    player_img = new Image();
    player_img.src = "images/scared-apple.png"; // make sure path is correct
    player_img.onload = function () {
        ctx.drawImage(player_img, player_x, player_y, 100, 70);
    };
    playerDead_img = new Image();
    playerDead_img.src = "images/dead-apple.png";

    // enemy image
    enemy_img = new Image();
    enemy_img.src = "images/Down-bear.png"; // make sure path is correct
    enemy_img.onload = function () {
        ctx.drawImage(enemy_img, enemy_x, enemy_y, 95, 100);
    };

    //set main loop and frame rate
    setInterval(MainLoop, 50);
    window.addEventListener('keydown', KeyDown);
}

//
//Main Loop
//
function MainLoop() {
    Update();
    Draw();
}
//
//Draw function
//
function Draw() {
    // Always draw the background first
    ctx.drawImage(bg_img, 0, 0, canvas.width, canvas.height);
    //Drawing player_dead image

    //Draw player only if alive
    if (!player_dead) { //use != to check the value
        ctx.drawImage(player_img, player_x, player_y, 100, 75);
    }
    else {
        //Background for "Game Over"
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Game Over text
        ctx.fillStyle = "white";
        ctx.font = "65px Calibri";
        ctx.fillText("GAME OVER!", 245, 170,);
        //Additional (smaller) text
        ctx.fillStyle = "white";
        ctx.font = "45px Calibri";
        ctx.fillText("The bear ate you!", 255, 250,);

        //Drawing the dead player sprite
        ctx.drawImage(playerDead_img, player_x, player_y, 100, 70);

    }
    // Draw bear only if player is alive (!player_dead) AND bear is alive (!enemy_dead).
    if (!player_dead && !enemy_dead) {
        ctx.drawImage(enemy_img, enemy_x, enemy_y, 125, 160);
    }

    if (!enemy_dead && !player_dead) { //&& hides enemy image when player is dead
        ctx.drawImage(enemy_img, enemy_x, enemy_y, 125, 160);
    }
}

//BearHunt function defining
function BearHunt() {
    if (enemy_x < player_x) {
        enemy_x += enemy_speed; // move right
    }
    if (enemy_x > player_x) {
        enemy_x -= enemy_speed; // move left
    }

    if (enemy_y < player_y) {
        enemy_y += enemy_speed; // move down
    }
    if (enemy_y > player_y) {
        enemy_y -= enemy_speed; // move up
    }
}

function Update() {
    if (!player_dead && !enemy_dead) {
        BearHunt();
    }

    //detect collision
    //we can do this only if enemy_dead is false
    var distance2 = (player_x - enemy_x) * (player_x - enemy_x) + (player_y - enemy_y) * (player_y - enemy_y);
    var distance = Math.sqrt(distance2);
    if (distance < 30) {
        //"GAME OVER IMAGE"???
        player_dead = true;
    }
}


//moving player
function KeyDown(event) {
    if (player_dead) return; //stops moving when die

    if (event.key === 'w') {
        player_y -= player_speed; //-= because we're going up, so "y" lowered
    }
    if (event.key === 'a') {
        player_x -= player_speed;
    }
    if (event.key === "d") {
        player_x += player_speed;
    }
    if (event.key === "s") {
        player_y += player_speed;
    }
    Draw();
}


//RESET BUTTON
function reset() {
    player_x = 100;
    player_y = 230;
    player_dead = false;

    // Reset enemy
    enemy_x = 830;
    enemy_y = 240;
    enemy_dead = false;

    // Redraw everything
    Draw();
}