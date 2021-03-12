var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var chances = 5;
var cashG,diamondsG,jwelleryG,swordGroup,hurdlesGroup;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  hurdlesImg = loadImage("hurdles.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.addAnimation("gameOver",endImg);
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
hurdlesGroup=new Group();
 treasureCollection = 0; 
  chances=5;  
}

function draw() {

  background(0);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  if(gameState===PLAY) {
  boy.x = World.mouseX;
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createHurdles();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) { 
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;
      
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+50;
      
    }else if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
      } else {
        if(hurdlesGroup.isTouching(boy)) {
        hurdlesGroup.destroyEach();
          chances=chances-1; 
        gameState=END;
    }
      }
    
    
    
  }else if (gameState===END) {
   cashG.setLifetimeEach=-1;
   diamondsG.setLifetimeEach=-1
   jwelleryG.setLifetimeEach=-1;
   swordGroup.setLifetimeEach=-1;
   hurdlesGroup.setLifetimeEach=-1;
    boy.scale=0.5;
        boy.changeAnimation("gameOver",endImg);
        boy.x = 200;
        boy.y = 200;
        path.velocityY= 0;
    
    cashG.setVelocityYEach(0);
    cashG.destroyEach();
    
    diamondsG.setVelocityYEach(0);
    diamondsG.destroyEach();
    
    jwelleryG.setVelocityYEach(0);
    jwelleryG.destroyEach();
    
    swordGroup.setVelocityYEach(0);
    swordGroup.destroyEach();
    
    hurdlesGroup.setVelocityYEach(0);
    hurdlesGroup.destroyEach();
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  text("Chances: "+ chances,150,370);
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function createHurdles() {
  if (World.frameCount%120===0) {
    var hurdles = createSprite(Math.round(random(50,350),40,10,10));
    hurdles.addImage(hurdlesImg);
    hurdles.scale=0.25;
    hurdles.velocityY = 3;
    hurdles.lifetime = 150;
    hurdlesGroup.add(hurdles);
  }
}