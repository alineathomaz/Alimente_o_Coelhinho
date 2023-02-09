const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;

function preload()
{
  bubble_img = loadImage("./assets/bubble.png")
  bg_img = loadImage('./assets/background.png');
  food = loadImage('./assets/melon.png');
  rabbit = loadImage('./assets/Rabbit-01.png');

  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png" , "./assets/eat_1.png","./assets/eat_2.png","./assets/eat_3.png","./assets/eat_4.png");
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png","./assets/sad_3.png");
  star_img = loadImage('./assets/star.png');
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  var fruit_options = {
    restitution: 0.8
  }
  
  ground = new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;
  
  // sprite de coelho
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  higherground =new Ground(300,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:60,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  //botão 1
  button = createImg('./assets/cut_btn.png');
  button.position(200,300);
  button.size(50,50);
  button.mouseClicked(drop);

  //botão2
  button2 = createImg('./assets/cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);

  image(bg_img,0,0,width,height);

  Engine.update(engine);
  
  push();
  imageMode(CENTER);

  if(fruit != null)
  {
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,80) == true)
  {
    bunny.changeAnimation('eating');
    remove_rope();
    World.remove(engine.world,fruit);
    bubble.visible = false;   
    fruit = null;
  }

  if(collide(fruit,bubble,40) == true)
  {
    engine.world.gravity.y = -1;
    bubble.position.x = fruit.position.x;
    bubble.position.y = fruit.position.y;
  }

  drawSprites();
}

function drop()
{
  rope.break();
  con.dettach();
  con = null; 
}

function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function remove_rope()
{
  rope.break();
}

function collide(body,sprite,x)
{
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=x)
    {
      return true; 
    }
    else
    {
      return false;
    }
  }
}

