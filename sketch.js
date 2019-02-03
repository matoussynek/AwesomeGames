var h = 850;
var w = 500;
var cliffHeight = 400;
var cliff = [];
var NO_CLIFFS = 2;
var speed = 2;

var player;
var PLAYER_SIZE = 80;
var PLAYER_X = -5;
var PLAYER_Y = h - cliffHeight - PLAYER_SIZE + 5;

var moving = false;

var bg;
var song;

var v = 0;
var stick;
var hasLanded = false;

function prolad(){
  //song = loadSound('graphics/maintune.mp3');
}
function setup() {
  createCanvas(w,h);
  for (let i = 0; i < NO_CLIFFS ; i++){
    cliff[i] = new Cliff(w / NO_CLIFFS*i);
    cliff[i].show();
  }
  player = new Player();
  bg = loadImage('graphics/background.jpg');
  textSize(30);
  stick = new Stick(v);
  //song.play();
}

function draw() {
  background(bg);
  if (moving){
    for (let i = 0; i < NO_CLIFFS ; i++){
      cliff[i].checkForOut();
      cliff[i].update();
      
    }
  }
  for (let i = 0; i < NO_CLIFFS ; i++){
    cliff[i].show();
  }
  if (hasLanded){
    moving = true;
  }
  player.show();
  stick.show();
}

class Cliff {
  constructor(x){
    this.x = x;
    this.y = h - cliffHeight;
    this.wid = random(0.5,1) * 100;
  }
  show(){
    fill(0);
    rect(this.x,this.y,this.wid,cliffHeight);
  }
  update(){
    this.x -= speed;

    if(this.x >= 0 && this.x < speed){
      moving = false;
      stick = new Stick(v);
      hasLanded = false;
      v = 0;
    }
  }
  checkForOut(){
    if(this.x < 0 - this.wid){
      this.wid = random(0.5,1) * 100;
      this.x = w - this.wid;
    }
  }

}
class Player {
  constructor(){
    this.x = PLAYER_X;
    this.y = PLAYER_Y;
    this.size = PLAYER_SIZE;
    this.img = loadImage('graphics/player.png');
    this.score = 0;
  }
  show(){
    //fill(255,0,0);
    //ellipse(this.x,this.y,this.size,this.size);
    image(this.img, this.x, this.y, this.size, this.size );
    fill(210);
    text("Score: " + this.score, 10, 30);
  }
  resetScore(){
    this.score = 0;
  }
  addScore(){
    this.score += 1;
  }


}


window.addEventListener("keypress", keyPress, false);
window.addEventListener("keyup", keyRelease, false);

function keyRelease(key)
{
  if(key.keyCode == 32)
  {
    stick.stopGrowing();
  }
}

function keyPress(key)
{
  if (key.keyCode == 32)
  {
    v += 10;
    //wasPressed = true;
    console.log(v);
  }
}

class Stick
{ 
  constructor(v)
  {
    this.x = 45;
    this.y = h - cliffHeight;
    this.grow = true;
    this.rotation = 0;
   }

   stopGrowing()
   {
     this.grow = false;
   }
     

  show()
  {
    if (hasLanded){
      this.x -= speed;
    }
    fill(0);
    translate(this.x, this.y);
    if(!this.grow)
    {
      this.rotation += (Math.PI / 2) / 100;
      rotate(this.rotation);
      if(this.rotation > Math.PI/2 - 0.02)
      {
        if (!hasLanded){
          correctLanding();
        }
        hasLanded = true;
        this.rotation = Math.PI/2 - 0.02;
      }
    }
    rect(0, 0, -2.25, -v);
  }
}
function correctLanding(){
  let furtherCliff;
  for (let i = 0; i < NO_CLIFFS ; i++){
    if (cliff[i].x > speed){
      furtherCliff = cliff[i];
    }
  }
  if (stick.x + v < furtherCliff.x || stick.x + v > furtherCliff.x + furtherCliff.wid){
    console.log("MISSED");
    player.resetScore();
  }
  else{
    player.addScore();
  }
}