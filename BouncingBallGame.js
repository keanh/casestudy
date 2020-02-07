let canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

function Ball(x,y,radius,bar) {
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.speedX=2;
    this.speedY=2;
    this.bar=bar;
    this.point = 0;

    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle= "blue";
        ctx.fill();
    };

    this.moveBall = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.theWayOfTheBall();
    };

    this.checkBall = function () {
        let poiX = this.x + this.radius;
        let poiY = this.y + this.radius;
        if (poiX <= 0 && poiY <= 0){
            return "GOC";
        }else if (poiX <= 0 && poiY >= canvas.width){
            return "GOC";
        }else if (poiX >= canvas.width && poiY >= canvas.height){
            return "GOC";
        }else if (poiX >= canvas.width && poiY <= 0){
            return "GOC";
        }else if (this.x - this.radius <= 0){
            return "Left";
        }else if (this.y - this.radius <= 0){
            return "Up";
        }else if (poiX >= canvas.width){
            return "Right";
        }else if (poiY >= canvas.height){
            return "Down";
        }else if (poiX >= bar.x && poiY >= bar.y && poiX <= bar.x + bar.width && poiY <= bar.y + bar.height){
            return "KickTheBar";
        }
    };

    this.theWayOfTheBall = function () {
        if(this.checkBall() === "GOC"){
            let temp = this.speedX;
            this.speedX = - this.speedY;
            this.speedY = - temp;
        }else if (this.checkBall() === "Left" || this.checkBall() === "Right"){
            this.speedX = - this.speedX;
        }else if (this.checkBall() === "Up"){
            this.speedY = - this.speedY;
        }else if (this.checkBall() === "Down"){
            this.gameOver();
        }else if (this.checkBall() === "KickTheBar"){
            this.getPoint();
            this.speedY = - this.speedY;
        }
    };

    this.gameOver = function () {
        endGame();
    };

    this.getPoint = function () {
        this.point++;
        document.getElementById("point").innerHTML="Point: " + this.point;
    };
}

function Bar(x,y,width,height) {
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.speed=15;

    this.drawBar = function () {
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();
    };

    this.moveRight = function () {
        this.x += this.speed;
        this.checkBar();
    };

    this.moveLeft = function () {
        this.x -= this.speed;
        this.checkBar();
    };

    this.keyBoard = function () {
        let temp = this;
        document.addEventListener("keydown",function (a) {
            if(a.keyCode === 37){
                temp.moveLeft();
            }else if (a.keyCode === 39){
                temp.moveRight();
            }
        });
    };

    this.checkBar = function () {
        if (this.x + this.width >= canvas.width){
            this.x = canvas.width - this.width;
        }else if (this.x <= 0){
            this.x = 0;
        }
    };

}


var bar = new Bar(250,370,80,10);
var ball = new Ball(30,20,10,bar);
ball.drawBall();
bar.drawBar();
bar.keyBoard();

let refresh = setInterval(function () {
    clear();
    ball.drawBall();
    ball.moveBall();
    bar.drawBar();
},10);

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function endGame() {
    clearInterval(refresh);
    alert("Game Over!!!");
    window.location.reload();
}