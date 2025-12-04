//
// Global Variables for Innit function
//
var canvas;
var ctx;
var bg_img;
var player_img;
var playerDead_img;
var enemy_img;

/* Player variables */
var player_x = 100;
var player_y = 230;
var player_speed = 5;
var player_dead = false;

/* Enemy variables */
var enemy_x = 950;
var enemy_y = 240;
var enemy_speed = 4;
var enemy_dead = false;

// Bear speeds up over time
setInterval(function () {
    enemy_speed += 0.25;
}, 2000);

//
// Drawing canvas
//
window.onload = Innit;
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
    player_img.src = "images/scared-apple.png";
    player_img.onload = function () {
        ctx.drawImage(player_img, player_x, player_y, 100, 70);
    };

    playerDead_img = new Image();
    playerDead_img.src = "images/dead-apple.png";

    // enemy image
    enemy_img = new Image();
    enemy_img.src = "images/Down-bear.png";
    enemy_img.onload = function () {
        ctx.drawImage(enemy_img, enemy_x, enemy_y, 95, 100);
    };

    // set main loop and frame rate
    setInterval(MainLoop, 50);
    window.addEventListener('keydown', KeyDown);
}

//
// Main Loop
//
function MainLoop() {
    Update();
    Draw();
}

//
// Draw function
//
function Draw() {
    ctx.drawImage(bg_img, 0, 0, canvas.width, canvas.height);

    if (!player_dead) {
        ctx.drawImage(player_img, player_x, player_y, 100, 75);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "65px Calibri";
        ctx.fillText("GAME OVER!", 245, 170);

        ctx.font = "45px Calibri";
        ctx.fillText("The bear ate you!", 255, 250);

        ctx.drawImage(playerDead_img, player_x, player_y, 100, 70);
    }

    if (!enemy_dead && !player_dead) {
        ctx.drawImage(enemy_img, enemy_x, enemy_y, 125, 160);
    }
}

//
// BearHunt function
//
function BearHunt() {
    if (enemy_x < player_x) enemy_x += enemy_speed;
    if (enemy_x > player_x) enemy_x -= enemy_speed;
    if (enemy_y < player_y) enemy_y += enemy_speed;
    if (enemy_y > player_y) enemy_y -= enemy_speed;
}

//
// Update function
//
function Update() {
    if (!player_dead && !enemy_dead) {
        BearHunt();
    }

    var distance2 = (player_x - enemy_x) * (player_x - enemy_x) +
                    (player_y - enemy_y) * (player_y - enemy_y);
    var distance = Math.sqrt(distance2);

    if (distance < 30) {
        player_dead = true;
    }
}

//
// Player movement
//
function KeyDown(event) {
    if (player_dead) return;

    if (event.key === 'w') player_y -= player_speed;
    if (event.key === 'a') player_x -= player_speed;
    if (event.key === 'd') player_x += player_speed;
    if (event.key === 's') player_y += player_speed;

    Draw();
}

//
// Reset button
//
function reset() {
    player_x = 100;
    player_y = 230;
    player_dead = false;

    enemy_x = 950;
    enemy_y = 240;
    enemy_speed = 3.5;
    enemy_dead = false;

    Draw();
}
