var backImage,backgr;
var player, player_running;
var ground,ground_img,bananaImage,obstacleImage;
var FoodGroup,obstacleGroup
var END =0;
var PLAY =1;
var gameState = PLAY,score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  FoodGroup=new Group();
  obstacleGroup=new Group();
}

function draw() { 
  
  
  if(gameState===PLAY){

    
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
   
    if (player.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+2;
      player.scale+=+0.1
    }
    spawnfood();
    spawnobstacles();
  }
  if(obstacleGroup.isTouching(player)){
    gameState=END;
  }
  drawSprites();
  if (gameState===END){
    backgr.velocityX = 0;
    player.visible=false;
   
   FoodGroup.destroyEach(); 
   obstacleGroup.destroyEach();
     
     textSize(30);
     fill(255);
     text("GAME OVER!",300,220)
  }
  
  fill("white");
  textSize(20);
  text("score: "+ score,500,50);
  
}
function spawnfood(){
  if (frameCount %80 === 0){
 var food=createSprite(600,250,10,10);
 food.velocityX =- (8+2/10)
 food.addImage(bananaImage);
 food.lifetime=120;
 food.scale=0.05;
 FoodGroup.add(food);
 return food;
  }
}
function spawnobstacles(){
  if (frameCount %80===0){
   var obstacle = createSprite(Math.round(random(800,700)),330,10,40);
  obstacle.velocityX =- (8 +2/10)
  obstacle.addImage(obstacleImage);
  obstacle.lifetime=120;
  obstacle.scale=0.1;
  obstacleGroup.add(obstacle);
  return obstacle;
  }
}