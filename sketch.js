var h = 850;
var w = 500;
var cliffHeight = 400;
var cliff = [];
var speed = 1.5;

function setup() {
  createCanvas(w,h);
  for (let i = 0; i < 3 ; i++){
    cliff[i] = new Cliff(w/3*i);
  }
}

function draw() {
  background(175);
  for (let i = 0; i < 3 ; i++){
    cliff[i].update();
    cliff[i].show();
  }
}

class Cliff {
  constructor(x){
    this.x = x;
    this.y = h - cliffHeight;
    this.wid = random(0.1,1) * 100;
    console.log("ahoj ted jsem skonil konstruktor");
  }
  show(){
    fill(0);
    rect(this.x,this.y,this.wid,cliffHeight);
  }
  update(){
    this.x -= speed;
    if(this.x < 0){
      this.wid = random(0.1,1) * 100;
      this.x = w - this.wid;
    }
  }

}