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
var rope,fruit,ground;
var candy_con;
var candy_con_2;
var candy_con_3;
var rope3;

var bg_img;
var food;


var button,button2,button3;
var bunny;
var rana,comer,comiendo,triste;
var mute_btn;

var fr;

var game_song;
var cut_rope
var cortar_sound;
var triste_sound;
var comiendo_sound;

function preload()
{
  bg_img = loadImage('background.png');
  comida = loadImage('candy.png');
  rana = loadImage('rana.png');
  
  game_song = loadSound('cut_rope.mp3');
  triste_sound = loadSound("triste.mp3")
  cortar_sound = loadSound('cortar.mp3');
  comiendo_sound = loadSound('comiendo.mp3');
  

  rana = loadAnimation("rana.png","om3.png","om1.png");
  comer = loadAnimation("eat_0.png" , "eat_1.png");
  triste = loadAnimation("triste1.png","triste2.png");
  feliz = loadAnimation("ranafeliz.png","ranafeliz1.png","ranasaludo.png");


  rana.playing = true;
  comer.playing = true;
  triste.playing = true;
  triste.looping= false;
  triste.looping = false; 
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  game_song.play();
  game_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   
   button2 = createImg('cut_btn.png');
   button2.position(390,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:200,y:90});
   rope2 = new Rope(7,{x:400,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
  rana.frameDelay = 20;
  comer.frameDelay = 20;

  rana = createSprite(120,620,100,100);
  rana.scale = 0.2;

  rana.addAnimation('ranita',rana);
  rana.addAnimation('comiendo',comer);
  rana.addAnimation('llorando',triste);
  rana.changeAnimation('ranita');

  
  candy = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,candy);

  candy_con = new Link(rope,candy);
  candy_con_2 = new Link(rope2,candy);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(candy!=null){
    image(comida,candy.position.x,candy.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(candy,rana)==true)
  {
    World.remove(engine.world,fruit);
    candy = null;
    rana.changeAnimation('comiendo');
    comiendo_sound.play();
  }

  if(candy!=null && candy.position.y>=650)
  {
    rana.changeAnimation('llorando');
    game_song.stop();
    triste_sound.play();
    candy=null;
   }
  
}

function drop()
{
  cortar_sound.play();
  rope.break();
  candy_con.dettach();
  candy_con = null; 
}

function drop2()
{
  cortar_sound.play();
  rope2.break();
  candy_con_2.dettach();
  candy_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(game_song.isPlaying())
     {
      game_song.stop();
     }
     else{
      game_song.play();
     }
}

