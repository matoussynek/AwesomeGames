var h = 900 - 20;
var w = 500;
var cliffHeight = 300;
var cliff = [];
var NO_CLIFFS = 2;
var speed = 4;

var player;
var PLAYER_SIZE = 90;
var PLAYER_X = -5;
var PLAYER_Y;

var moving = false;

var bg;
var bgX = 0;

var v = 0;
var stick;
var hasLanded = false;
var hasMissed = false;

var menu;
//var song;

function preload(){
  //song = loadSound('graphics/maintune.mp3');
}
function setup() {
  createCanvas((windowWidth > w) ? w : windowWidth, (windowHeight > h) ? h : windowHeight - 20);
  h = height;
  w = width;
  PLAYER_Y = h - cliffHeight - PLAYER_SIZE;
  for (let i = 0; i < NO_CLIFFS ; i++){
    cliff[i] = new Cliff(w / NO_CLIFFS*i);
    cliff[i].show();
  }
  player = new Player();
  bg = loadImage('graphics/treeline.svg');
  textSize(30);
  stick = new Stick(v);
  menu = new MainMenu(h, w);
}
function draw() {
  /*
  if (!song.isPlaying()){
    song.play();
  }*/
  image(bg,bgX,0,2700,850);
  /*if (menu.isOn()){
    menu.show();
    if (mouseX >= menu.playX && mouseX <= menu.playX + menu.playSize && mouseY >= menu.playY && mouseY <= menu.playY + menu.playSize){
        menu.hoverOn();
    }
    else{
      menu.hoverOff();
    }
    
  }
  else{*/
    if (mouseIsPressed && stick.grow){
      stick.hasStarted = true;
      v += 5;
    }
    if (!mouseIsPressed && stick.hasStarted){
      stick.stopGrowing();
    }
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
  //}
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
      stick.hasStarted = false;
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
    this.imgMove = loadImage('graphics/playerMove.gif');
    this.imgFall = loadImage('graphics/playerFall.png');
    this.imgStick = loadImage('graphics/playerStick.png');
    this.score = 0;
    this.falling = false;
  }
  show(){
    image((!moving) ? (stick.hasStarted) ? this.imgStick : this.imgStill : ((this.falling) ? this.imgFall : this.imgMove), this.x, this.y, 50, this.size );

    if (this.falling){
      this.y += speed*3;
      if (!moving){
        this.y = PLAYER_Y;
        this.falling = false;
        menu.turnOn();
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

/*
window.addEventListener("keypress", keyPress, false);
window.addEventListener("keyup", keyRelease, false);

function keyReleased()
{
  if(keyCode == 32 && !menu.isOn())
  {
    stick.stopGrowing();
  }
}


function keyPressed()
{
  if (keyCode == 32 && stick.grow  && !menu.isOn())
  {
    stick.hasStarted = true;
    v += 10;
  }
}*/
/*
function touchStarted(){
  if (stick.grow  && !menu.isOn())
  {
    stick.hasStarted = true;
    v += 10;
  }
}
function touchEnded(){
    stick.stopGrowing();
    console.log("touch ended");
}
*/

class Stick
{ 
  constructor(v)
  {
    this.x = 50;
    this.y = h - cliffHeight;
    this.grow = true;
    this.rotation = 0;
    this.hasStarted = false;
   }

   stopGrowing()
   {
     this.grow = false;
   }
     

  show()
  {
    console.log("gothere " + v);
    if (hasLanded){
      this.x -= speed;
    }
    fill(0);
    translate(this.x, this.y);
    if(!this.grow)
    {
      this.rotation += (Math.PI / 2) / 65;
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
    fill(0);
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
/*
function mousePressed(){
  if (menu.isOn){
    if (mouseX >= menu.playX && mouseX <= menu.playX + menu.playSize && mouseY >= menu.playY && mouseY <= menu.playY + menu.playSize){
      menu.turnOff();
    }
  }
  else{
      if (stick.grow){
        stick.hasStarted = true;
        v += 10;
        console.log(v);
      }
  }
  
}
function mouseReleased(){
  if (!menu.isOn){
    stick.stopGrowing();
    console.log("touch ended");
  }  
}
*/
class MainMenu{
  constructor(h,w){
      this.hei = h;
      this.wid = w;
      this.isShown = true;
      this.playButton = loadImage('graphics/play-button.png');
      this.playButtonHover = loadImage('graphics/play-buttonHOVER.png');
      this.playX = this.wid/2-128;
      this.playY = this.hei/2-128;
      this.playSize = 256;
      this.hover = false;
  }
  show(){
      if (this.isShown){
          image((this.hover) ? this.playButtonHover : this.playButton, this.playX, this.playY, this.playSize, this.playSize);
      }
  }
  turnOff(){
      this.isShown = false;
  }
  turnOn(){
      this.isShown = true;
  }
  isOn(){
      return this.isShown;
  }
  hoverOn(){
    this.hover = true;
  }
  hoverOff(){
    this.hover = false;
  }
}