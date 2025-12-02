//
//Global Variables for Innit function
//
var canvas;
var ctx;
var bg_img;
var player;
/*setting player variables*/
var player_x = 300;
var player_y = 300;
var player_speed = 5; //setting speed of player movement
var player_dead = false;

/*setting enemy variables*/
var enemy;

var enemy_x = 500;
var enemy_y = 500;
var enemy_speed = 10; //setting overall speed of enemy ??
var enemy_speed_x = 2;
var enemy_speed_y = 2;
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
    BearHunt();
    
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

function BearHunt() {
  if (enemy_x < player_x) {
    enemy_x += 3; // move right
  }
  if (enemy_x > player_x) {
    enemy_x -= 3; // move left
  }

<<<<<<< HEAD
  if (enemy_y < player_y) {
    enemy_y += 3; // move down
  }
  if (enemy_y > player_y) {
    enemy_y -= 3; // move up
  }
}
=======
     if(Pex.position.y< Player1.position.y){
      Pex.position.y +=3;
    }
    if(Pex.position.y> Player1.position.y){
      Pex.position.y -=3;
    }
  }

  
>>>>>>> 52e97d26cab0063601527fc4afd3e2927eb8f59f
