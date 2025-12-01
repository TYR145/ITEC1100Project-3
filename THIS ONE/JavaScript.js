let scoreElement = document.getElementById('Score')
let highScoreElement = document.getElementById('High-Score')
let gameContainer = document.querySelector('Game-Container')
let basket = document.getElementById('Basket')
let action = document.getElementById('Actions')

let Score = 0
let gameMode = 'Play'

let highScore = localStorage.getItem('High-Score') || 0 //come back//
highScoreElement.innerText = `High-Score : ${highScore}`

function createFallingObject(){
    let object = document.createElement('div')
    object.classList.add('falling-object')
    let random = Math.floor(Math.random() * (3-0+1) + 0)
    if (random == 3) {
        basket.classList.add ('apple') } //come back
        let random = Math.floor(Math.random() * (3-0+1) + 0)
    if (random == 3) {
        basket.classList.add ('perfect apple') }
        let random = Math.floor(Math.random() * (3-0+1) + 0)
    if (random == 3) {
        basket.classList.add ('pear') }
        let random = Math.floor(Math.random() * (3-0+1) + 0)

    let backgrounds = ["Images/apple.webp", "Images/perfect apple.webp", "Images/pear.webp"]

    object.style.background = `url("${background[random]}")`
    object.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px'
    object.style.top = '0px'
    object.style.backgroundPosition = 'center' 
    object.style.backgroundRepeat = 'no-repeat'
    object.style.backgroundSize = 'cover'
    gameContainer.appendChild('object')

    let fallInterval = setInterval(()=>{
        let objectTop = parseInt(window.getComputedStyle('object').getPropertyValue('top'))
    
    if (gameMode == "Play"){
        if (Score >= 100) {
            object.style.top += objectTop + 15 + 'px'
        }
        else if (Score >= 50) {
             object.style.top += objectTop + 10 + 'px'
        }
        else if (Score <= 50) {
             object.style.top += objectTop + 5 + 'px'
        }
    }

    if (objectTop >= gameContainer.clientHeight - basket.offsetHeight - object.offsetHeight){
        let objectLeft = object.offsetLeft
        let objectRight = objectLeft + object.offsetWidth
        let basketLeft = basket.offsetLeft
        let basketRight = basketLeft + basket.offsetWidth

        if (objectLeft < basketRight && objectRight > basketLeft) {
            if(object.classList.contains('apple')) {
                if(Score == 0) {
                    Score = Score
                }
                else{
                    Score--
                }
            }
            else{
                Score++
            }
            scoreElement.textContent = `Score : ${Score}`
            if (Score >= highScore) {
                highScore = Score 
                localStorage.setItem('High-Score', highScore)
                highScoreElement.innerText = `High-Score : ${highScore}`
            }
            object.remove()
            clearInterval(fallInterval)
        }
        else if(objectTop >= gameContainer.clientHeight - object.offsetHeight){
            object.remove()
            clearInterval(fallInterval)
        }
    }
    },30)
    }
setInterval(createFallingObject, 1000)


var canvas;
    var ctx;

    var totalImages = 1; //counts images present
    var loadedImages = 0; //tracks # of events so far
    const basket_speed = 15; //using const for movement speed bc unchanging
      //CONST SETS SPEED --> change to match falling apples


    var basket; //change to "basket" later
    var x1 = 30;
    var y1 = 500;


// NEW FUNCTION: The Gatekeeper Logic --> has images load
    function imageLoaded() {
        loadedImages++; // Counts the image as finished
        
        // When the count equals the total (1 === 1 (images)) the game is ready.
        if (loadedImages === totalImages) {
           setInterval (Draw, 30); // START the drawing only now.
        }
    }


    function Init() {
      canvas = document.getElementById("myCanvas") //ID we set at the start in <canvas> tag
      ctx = canvas.getContext("2d");

      basket = new Image();
      basket.onload = imageLoaded; //calls draw function ONLY when loaded
      basket.src = "Images/basket.webp";
    }


    function Draw() {
      //drawImage (image, draw x, draw y, drawWidth, dawHeight etc.)
      ctx.clearRect(0,0,canvas.width,canvas.height); //LEAVES NO TRAIL BEHIND

      ctx.drawImage(basket, x1, y1, 175, 100); //adjusts image W & H
    }


    window.addEventListener('keydown', detectRight) //only applies for 1 action
    window.addEventListener('keydown', detectLeft)

    function detectRight(event) 
    {
      if (event.key == 'd') //detects Move Right key (must be lowercase)
      {
        moveRight() //call function moveRight (literally just name it that)
      }
      function moveRight() 
      {
        x1+= basket_speed; //allows us to move Right
        basket.src = "Images/basket.webp";
        Draw () //call draw function to update the canvas
      }
    }

    function detectLeft(event)
    {
      if (event.key == 'a') //deteces Move Left key
      {
        moveLeft()
      }
      function moveLeft() 
      {
        x1-= basket_speed; //allows us to move Left (-1 to move opposite direction)
        basket.src = "Images/basket.webp";
        Draw () //call draw function again
      }
    }