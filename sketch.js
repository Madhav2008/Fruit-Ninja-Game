var sword, swordImage;
var fruit1, fruit2, fruit3, fruit4, fruitGroup, fruit;
var alien, alienGroup, alienImage;
var gameoverImage;
var gameoverSound, knifeSwooshSound,background;

var PLAY = 1;
var END = 0;
var gameState = 1;

var score = 0;


function preload() {
  swordImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alienImage = loadImage("vege.png");
  alienImage1 = loadImage("vege1.png");
  alienImage2 = loadImage("vege2.png");
  alienImage3 = loadImage("vege3.png");
  gameoverImage = loadImage("gameover.png");
  backgroundImage = loadImage("back.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  background = createSprite(40, 200, 20, 20);
  background.addImage(backgroundImage);
  background.scale = 4;

  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.5 ;

  gameover = createSprite(200, 200, 20, 20);
  gameover.addImage(gameoverImage);
  gameover.scale = 1;
  gameover.visible = false;

  fruitGroup = new Group();
  alienGroup = new Group();

  sword.setCollider("circle", 0, 0, 40);

}

function draw() {

  if (gameState === PLAY) {
    sword.y = World.mouseY
    sword.x = World.mouseX

    fruits();
    enemy();

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 1;
    }

    if (sword.isTouching(alienGroup)) {
      gameState = END;
      gameoverSound.play();
    }
  } else if (gameState === END) {
    sword.addImage(gameoverImage);
    sword.x = 300;
    sword.y = 300;
    sword.scale = 2 ;
    alienGroup.destroyEach();
    fruitGroup.destroyEach();
  }
  
  drawSprites();
  textSize(80);
  stroke("red");
  text("Score: " + score, 150,60);
  textSize(25);
  text("CUT FRUITS ONLY",190,100);
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.3;

    x = Math.round(random(1, 4));
    if (x == 1) {
      fruit.addImage(fruit1);
    } else if (x == 2) {
      fruit.addImage(fruit2);
    } else if (x == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    if (position === 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      fruit.x = 0;
      fruit.velocityX = (7 + (score / 4));
    }

    fruit.y = Math.round(random(50, 340));
    fruit.setLifetime = 200;
    fruitGroup.add(fruit);
  }
}

function enemy() {
  if (World.frameCount % 200 === 0) {
    alien = createSprite(600, 200, 20, 20);
    alien.addImage(alienImage);
    alien.addImage(alienImage1);
    alien.addImage(alienImage2);
    alien.addImage(alienImage3);
    alien.y = Math.round(random(50, 350));
    alien.velocityX = -(8 + (score / 10));
    alien.setLifetime = 50;
    alienGroup.add(alien);
    alien.scale = 0.4 ;
  }
}