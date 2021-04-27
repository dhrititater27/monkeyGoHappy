  //CREATING VARIABLES AND GAME STATES
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var foodGroup, obstacleGroup
  // var score

  
  function preload(){
  
  //LOADING ANIMATIONS AND IMAGES
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png",
                               "sprite_2.png","sprite_3.png",
                               "sprite_4.png","sprite_5.png",
                               "sprite_6.png","sprite_7.png",
                               "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  }


  function setup() {
    
  //CREATING CANVAS
  createCanvas(400, 400);

  //CREATING MONKEY
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
    
  //CREATING GROUND
  ground = createSprite(600,400,400,20);
  ground.x = ground.width /2;
  
  //MAKING GROUPS
  foodGroup = new Group();
  obstacleGroup = new Group();

  //SETTING COLLIDER
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
    
  //SCORE
  score = 0;
  }


  function draw() {
  
  //CREATING BACKGROUND
  background("cyan");
  
  //GAME STATE PLAY
  if(gameState === PLAY){
  ground.velocityX = -(4 + score/100)
    
  //TEXT SURVIVAL TIME
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ score, 200,30);
  score = score + Math.round(frameCount/90);
  
  //MOVING GROUND
  if (ground.x < 0){
  ground.x = ground.width/2;
  }
    
  //JUMP WHEN SPACE PRESSED
  if(keyDown("space")&& monkey.y >= 320) {
  monkey.velocityY = -12;
  }
    
  //GRAVITY
  monkey.velocityY = monkey.velocityY + 0.8;    
    
  //CALLING OBSTACLES 
  Food();
  Obstacle();
    
  //END IF OBSTACLE TOUCHES MONKEY
  if(obstacleGroup.isTouching(monkey)){
  gameState = END;
  }
  }
    
  //GAME STATE END
  else if (gameState === END) {

  ground.velocityX = 0;
  monkey.velocityY = 0;
     
  obstacleGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
    
  obstacleGroup.setVelocityEach(0);
  foodGroup.setVelocityEach(0);    
     
  score = 0;
  }
  
  //MONKEY COLLIDES WITH GROUND
  monkey.collide(ground);
  
  //MAKING OBJECTS VISIBLE
  drawSprites();
  }


  function Obstacle(){
  if (frameCount % 200 === 0){
  obstacle = createSprite(400,380,10,40);
  obstacle.velocityX = -6;
    
  obstacle.addImage(obstacleImage);
   
  //SCLAE AND LIFETIME          
  obstacle.scale = 0.15;
  obstacle.lifetime = 300;
   
  //ADDING OBSTACLE TO OBSTACLE GROUP
  obstacleGroup.add(obstacle);
  }
  }

  function Food() {
  if (frameCount % 60 === 0) {
  banana = createSprite(600,30,40,10);
  banana.y = Math.round(random(220,280));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -3;
    
  //LIFETIME
  banana.lifetime = 200;
    
  //DEPTH
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
    
  //ADDING BANANA TO FOOD GROUP
  foodGroup.add(banana);
  }
  }