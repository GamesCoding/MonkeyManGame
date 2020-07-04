//Global Variables

var monkeyMan,jungle;

var bananasGroup,bananaImage;

var obstaclesGroup,obstacleImage;

var score = 0;

var gameState = "play";

function preload() {
  
  jungleImage = loadImage("jungle.jpg");
  
  monkeyManImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyManImageEnd = loadImage("Monkey_01.png");
  
  bananaImage = loadImage("Banana.png");
  
  obstaclesImage = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  jungle = createSprite(300,150,600,300);
  jungle.addImage("jungle",jungleImage);
  jungle.x = jungle.width/2;
  jungle.velocityX = -5;
  
  monkeyMan = createSprite(100,250,50,50);
  monkeyMan.addAnimation("monkey",monkeyManImage);
  monkeyMan.scale = 0.15;
  
  //monkeyMan.debug = true;

  monkeyMan.setCollider("rectangle",100,0,400,600);

  ground = createSprite(300,295,600,5);
  ground.visible = false;
  
  bananasGroup = new Group();
  
  obstaclesGroup = new Group();
}


function draw(){
 background(255); 
  
  if (jungle.x<100) {
  
    jungle.x = jungle.width/2;
  }
  
  monkeyMan.collide(ground)
  
  if(gameState === "play") {
  
  if (keyDown("space") && monkeyMan.y>217) {
  
    monkeyMan.velocityY = -13;
  }
  
  monkeyMan.velocityY = monkeyMan.velocityY+0.9
  
  if (monkeyMan.isTouching(bananasGroup)) {
  
   score = score+2;
   bananasGroup.destroyEach();
    

    switch(score) {
    
      case 6 : monkeyMan.scale = 0.17;
        break;
      case 12: monkeyMan.scale = 0.19;
        break;
      case 18: monkeyMan.scale = 0.21;
        break;
      case 24: monkeyMan.scale = 0.23;
        break;
      case 30: monkeyMan.scale = 0.25;
        break;
    }
  }
  
  
  if(monkeyMan.isTouching(obstaclesGroup)) {
  
    monkeyMan.scale =0.15;
    
    obstaclesGroup.destroyEach();
  }
  
  if(monkeyMan.isTouching(obstaclesGroup)) {
  
    gameState = "end";
  }
    
  if(gameState == "end"){
  
    bananasGroup.destroyEach();
    obstaclesGroup.destroyEach();
    
    score = 0;
    
    monkeyMan.scale =0.15;
  }
    spawnObstacles();
    spawnBananas();
} 
 
 drawSprites();
  
  stroke("white");
  textSize(21);
  fill("white");
  text("Score: " + score,500,50);
}


function spawnBananas() {
  
  if (frameCount%80 === 0) {
    
     var banana = createSprite(600,175,20,20);
     banana.addImage(bananaImage);
     
     banana.y = Math.round(random(150,175));
     banana.velocityX = -10;
     banana.scale = 0.05;
     
     banana.lifetime = 100;
     
     //banana.debug = true;
     
     banana.setCollider("circle",0,0,500);
     
     banana.addToGroup(bananasGroup);
  }
}


function spawnObstacles() {
  
  if (frameCount%300 === 0) {
    
     var obstacles = createSprite(600,270,20,20);
     obstacles.addImage(obstaclesImage);
     
     obstacles.velocityX = -10;
     obstacles.scale = 0.15;
     
     obstacles.lifetime = 100;
     
     //obstacles.debug = true;
     
     obstacles.setCollider("circle",30,0,150);
     
     obstaclesGroup.add(obstacles);
  }
}