let coinImg;
let backgroundImg;
let gnomeImg;
let ghostImg;
let gnome;
const PLAY = 1;
const END = 0;
let gameState = PLAY;
let platform;
let score;
let ghostGroup;

function preload(){
  coinImg = loadImage("./images/coin.png");
  backgroundImg = loadImage("./images/platform.png");
  gnomeImg = loadImage("./images/gnome.png");
  ghostImg = loadImage("./images/ghost.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  ghostGroup = new Group();

  gnome = createSprite(width/2, height-305);
  gnome.addImage("gnome", gnomeImg);

  platform = createSprite(width/2, height);
  platform.addImage("background", backgroundImg);
  platform.scale = 5;

  score = 0;

}

function draw() {
  background(0);
  drawSprites();

  if(gameState === PLAY){
    runControls();
    spawnGhosts();

    textSize(20);

    text("Score: "+score, 50, 50);

  if(ghostGroup.isTouching(gnome)){
      gameState = END;
      gameOver();
    }
  }else if(gameState === END){
    gameOver();
  }
}

function runControls(){
  if(keyIsDown(LEFT_ARROW)){
    gnome.x -= 10;
  }
  if(keyIsDown(RIGHT_ARROW)){
    gnome.x += 10;
  }

  if(gnome.y<height-305){
    gnome.velocityY += 1;
  }else{
    gnome.velocityY = 0;
    if(keyIsDown(UP_ARROW)){
      gnome.velocityY = -18;
    }
  }
}

function spawnGhosts(){
  if(frameCount%60===0){
    let randomNum = Math.round(random(1, 2))
    let xPosition = 0;
    if(randomNum === 1){
      xPosition = width;
    }else{
      xPosition = 0;
    }
    let ghost = createSprite(xPosition, height-310);
    ghost.addImage("ghost", ghostImg);
    if(randomNum === 1){
      ghost.velocityX = -5;
    }else{
      ghost.velocityX = 5;
    }

    ghostGroup.add(ghost);

    ghost.lifetime = 400;

    score += 10;
  }
}

function gameOver(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing, your score was: " + score + "!!",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
  ghostGroup.destroyEach();

  gnome.velocityY = 0;
}