var h = 850;
var w = 500;
var cliffHeight = 400;
var cliff = [];
var NO_CLIFFS = 2;
var speed = 1;

var player;
var PLAYER_SIZE = 80;
var PLAYER_X = -5;
var PLAYER_Y = h - cliffHeight - PLAYER_SIZE + 5;

var moving = false;

var bg;


function setup() {
  createCanvas(w,h);
  for (let i = 0; i < NO_CLIFFS ; i++){
    cliff[i] = new Cliff(w / NO_CLIFFS*i);
    cliff[i].show();
  }
  player = new Player();
  bg = loadImage('graphics/background.jpg');
  textSize(30);
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
  player.show();
}
function keyPressed(){
  moving = true;
  for (let i = 0; i < NO_CLIFFS ; i++){
    cliff[i].x -= speed;
  }
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

    if(this.x < 0 && this. x > -1.5){
      moving = false;
      player.addScore();
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