var h = 850;
var w = 500;
var cliffHeight = 400;
var cliff = [];
var NO_CLIFFS = 2;
var speed = 4;

var player;
var PLAYER_SIZE = 80;
var PLAYER_X = -5;
var PLAYER_Y = h - cliffHeight - PLAYER_SIZE;

var moving = false;

var bg;
var bgX = 0;
var song;

var v = 0;
var stick;
var hasLanded = false;
var hasMissed = false;

function setup() {
  createCanvas(w,h);
  for (let i = 0; i < NO_CLIFFS ; i++){
    cliff[i] = new Cliff(w / NO_CLIFFS*i);
    cliff[i].show();
  }
  player = new Player();
  bg = loadImage('graphics/treeline.svg');
  textSize(30);
  stick = new Stick(v);
  song = loadSound('graphics/maintune.mp3', loaded);
}
function loaded(){
  song.loop();
}
function draw() {
  //background(bg);
  image(bg,bgX,0,2700,850);
  if (moving){
    for (let i = 0; i < NO_CLIFFS ; i++){
      bgX = (bgX-speed/16)%2200;
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
    this.img = loadImage('graphics/cliff.png');
  }
  show(){
    /*
    fill(85);
    stroke(55);
    rect(this.x,this.y,this.wid,cliffHeight);
    */
   image(this.img,this.x,this.y,this.wid,cliffHeight);
  }
  update(){
    this.x -= speed;

    if(this.x >= 0 && this.x < speed){
      moving = false;
      stick = new Stick(v);
      hasLanded = false;
      hasMissed = false;
      v = 0;
    }
  }
  checkForOut(){
    if(this.x < 0 - this.wid){
      this.wid = random(0.5,1) * 100;
      let furtherCliff;
      for (let i = 0; i < NO_CLIFFS ; i++){
        if (cliff[i].x > speed){
          furtherCliff = cliff[i];
        }
      }
      this.x = furtherCliff.x + random(0.5,1) * w - this.wid;
    }
  }

}
class Player {
  constructor(){
    this.x = PLAYER_X;
    this.y = PLAYER_Y;
    this.size = PLAYER_SIZE;
    this.imgStill = loadImage('graphics/playerStill.png');
    this.imgMove = loadImage('graphics/playerMove.png');
    this.imgFall = loadImage('graphics/playerFall.png');
    this.score = 0;
    this.falling = false;
  }
  show(){
    image((!moving) ? this.imgStill : ((this.falling) ? this.imgFall : this.imgMove), this.x, this.y, this.size, this.size );

    if (this.falling){
      this.y += speed*3;
      if (!moving){
        this.y = PLAYER_Y;
        this.falling = false;
      }
    }
    fill(210);
    noStroke();
    text("Score: " + this.score, 10, 30);
  }
  resetScore(){
    this.score = 0;
  }
  addScore(){
    this.score += 1;
  }
  fall(){
    this.falling = true;
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
  if (key.keyCode == 32 && stick.grow)
  {
    v += 10;
  }
}

class Stick
{ 
  constructor(v)
  {
    this.x = 50;
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
        if (!hasMissed){
          this.rotation = Math.PI/2 - 0.02;
        }   
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
    player.fall();
    hasMissed = true;
  }
  else{
    player.addScore();
  }
}