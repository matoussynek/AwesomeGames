class MainMenu{
    constructor(h,w){
        this.hei = h;
        this.wid = w;
        this.isShown = true;
        this.playButton = loadImage('graphics/play-button.png');
        this.playX = this.wid/2-128;
        this.playY = this.hei/2-128;
        this.playSize = 256;
    }
    show(){
        if (this.isShown){
            image(this.playButton, this.playX, this.playY, this.playSize, this.playSize);
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
}