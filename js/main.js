var myGame;
var checkJump = true;
var myObstacles;
function gameStart(){
  myGame.stop();
  myGame.start();
  myGame.clear();
  myObstacles = [];
  gameDragon = new component(30, 30, "#444", myGame.canvas.width/2 - 200, myGame.canvas.height-30);
  myObstacles[0] = new component(15,100,"red",myGame.canvas.width-20,myGame.canvas.height-(Math.floor(Math.random()*50)+50));
}
var myGame = {
  canvas: document.createElement("canvas"),
  start: function (){
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = 270;
    this.canvas.style.background = "#ddd";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    this.interval = setInterval(updateGame, 10);
    this.speed = 2;
    this.speedInterval = setInterval(function() {
      this.speed++;
    },5000);
  },
  clear: function() {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  }
}
function component(width,height,color,x,y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update =  function() {
    ctx = myGame.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
  this.newPos = function() {
    if(this.jump  < this.y) this.y-=2;
    if(this.jump >= this.y) this.jump = myGame.canvas.height -30;
    if(this.jump > this.y) this.y+=2;
    if(this.y == myGame.canvas.height -30) checkJump = true;
    else checkJump = false;
  }
  this.gameOver = function(otherObj) {
    var result = false;
    if(this.x + this.width > otherObj.x && this.x < otherObj.x + otherObj.width) {
      if (this.y + this.height > otherObj.y) {
        result = true;
      }
    }
    return result;
  }
}
function updateGame() {
  console.log(myGame.speed);
  myGame.clear();
  var len = myObstacles.length;
  if (myObstacles[len-1].x <= myGame.canvas.width/2){
    myObstacles.push(new component(15,100,"red",myGame.canvas.width-20,myGame.canvas.height-(Math.floor(Math.random()*50)+50)));
  }
  for (i = 0; i < len; i++) {
    if (gameDragon.gameOver(myObstacles[i])) {
      myGame.stop();
    }
    myObstacles[i].x -= myGame.speed;
    myObstacles[i].update();
  }
  gameDragon.newPos();
  gameDragon.update();
}
function jump() {
  if (checkJump == true) gameDragon.jump = gameDragon.y - 120;
}
function newGame() {
  gameStart();
}
