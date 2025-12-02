//
//Global Variables for Innit function
//
var canvas;
var ctx;
var bg_img;
var player;
/*setting player variables*/
var player_x = 200;
var player_y = 300;
var player_speed = 4; //setting speed of player movement
var player_dead = false;

/*setting enemy variables*/
var enemy;

var enemy_x = 200;
var enemy_y = 200;
var enemy_speed = 10; //setting overall speed of enemy ??
var enemy_speed_x = 4;
var enemy_speed_y = 4;
var enemy_dead = false;

let frame = 0;

//
//Drawing canvas
//
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

    // enemy image
    enemy_img = new Image();
    enemy_img.src = "images/Down-bear.png"; // make sure path is correct
    enemy_img.onload = function () {
        ctx.drawImage(enemy_img, enemy_x, enemy_y, 165, 200);
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
    Draw()
}
function Draw() {
    // Always draw the background first
    ctx.drawImage(bg_img, 0, 0, canvas.width, canvas.height);
    //Draw player only if alive
    if (!player_dead) { //use != to check the value
        ctx.drawImage(player_img, player_x, player_y, 100, 70);
    } 
    else {
        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER!", 200, 300);
    }

    if (!enemy_dead) {
        ctx.drawImage(enemy_img, enemy_x, enemy_y, 165, 200);
    }
}
function Update() {
    //move enemy
    //we can do this only if enemy_dead is false
    enemy_x += enemy_speed_x;
    if (enemy_x > 600)
        enemy_speed_x *= -1;
    if (enemy_x < 0)
        enemy_speed_x *= -1;
    enemy_y += enemy_speed_y;
    if (enemy_y > 600)
        enemy_speed_y *= -1;
    if (enemy_y < 0)
        enemy_speed_y *= -1;

    //detect collision
    //we can do this only if enemy_dead is false
    var distance2 = (player_x - enemy_x) * (player_x - enemy_x) + (player_y - enemy_y) * (player_y - enemy_y);
    var distance = Math.sqrt(distance2);
    if (distance < 10) {
        ; //"GAME OVER IMAGE"???
        player_dead = true;
    }
}

//moving player
function KeyDown(event) {
    if (event.key == 'w') {
        player_y -= player_speed; //-= because we're going up, so "y" lowered
    }
    if (event.key == 'a') {
        player_x -= player_speed;
    }
    if (event.key == "d") {
        player_x += player_speed;
    }
    if (event.key == "s") {
        player_y += player_speed;
    }
    Draw();
}

setInterval(PeexleHunt, 100);
  function PeexleHunt(){
    
    if(Pex.position.x< Player1.position.x){
      Pex.position.x +=3;
    }
    if(Pex.position.x> Player1.position.x){
      Pex.position.x -=3;
    }

     if(Pex.position.y< Player1.position.y){
      Pex.position.y +=3;
    }
    if(Pex.position.y> Player1.position.y){
      Pex.position.y -=3;
    }
  }

function ReplayGame() {
    // Reset player
    player_x = 200;
    player_y = 300;
    player_dead = false;

    // Reset enemy
    enemy_x = 200;
    enemy_y = 200;
    enemy_dead = false;
    enemy_speed_x = 4;
    enemy_speed_y = 4;

    // Hide the replay button
    document.getElementById("replay-btn").style.display = "none";

    // Restart loop
    clearInterval(gameInterval);
    gameInterval = setInterval(MainLoop, 50);

    Draw();
}