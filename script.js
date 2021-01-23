var canvas = document.getElementById('game');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var game = {
    size:{
        x:480,
        y:270,
        canvasMultiplyer:{
            x:canvas.width/480,
            y:canvas.height/270
        }
    }
};

var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;

var mouse = {
    x:0,
    y:0
};

var player;

var playerImg1 = new Image();

function init(){
    player = {
        x:240-7,
        y:135-10   
    }
};

window.addEventListener("mousemove",function(event){
    mouse = {
        x:event.x,
        y:event.y
    }
});

window.addEventListener("click", function(){
    canvas.requestFullscreen();
});

window.addEventListener("keydown", function(event){
    console.log(event)
});
window.addEventListener("keyup",function(event){

})



window.addEventListener("resize",function(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    c.imageSmoothingEnabled = false;

    game = {
        size:{
            x:480,
            y:270,
            canvasMultiplyer:{
                x:canvas.width/480,
                y:canvas.height/270
            }
        }
    };
});




function update(){
    requestAnimationFrame(update)
    c.clearRect(0,0,canvas.width,canvas.height)   
    
    c.fillStyle = "white"
    c.fillRect(0,0,canvas.width,canvas.height)   

    animatePlayer();

};

function animatePlayer(){

    if(playerImg1.complete) {
        c.drawImage(playerImg1, Math.floor(player.x*game.size.canvasMultiplyer.x), Math.floor(player.y*game.size.canvasMultiplyer.y), 15*game.size.canvasMultiplyer.x, 20*game.size.canvasMultiplyer.y);
        playerImg1.src = 'Images/Player/body/standing.png';
    }

    let point = findNewPoint(player.x*game.size.canvasMultiplyer.x+(15*game.size.canvasMultiplyer.x)/2, player.y*game.size.canvasMultiplyer.y+(20*game.size.canvasMultiplyer.y)/2, angle(player.x*game.size.canvasMultiplyer.x+(15*game.size.canvasMultiplyer.x)/2, player.y*game.size.canvasMultiplyer.y+(20*game.size.canvasMultiplyer.y)/2,mouse.x, mouse.y), 7*game.size.canvasMultiplyer.x)

    c.beginPath();
    c.moveTo(player.x*game.size.canvasMultiplyer.x+(15*game.size.canvasMultiplyer.x)/2, player.y*game.size.canvasMultiplyer.y+(20*game.size.canvasMultiplyer.y)/2);
    if(mouse.x < point.x && mouse.x > player.x*game.size.canvasMultiplyer.x+(15*game.size.canvasMultiplyer.x)/2){
        c.lineTo(mouse.x, mouse.y);
    }else if(mouse.x > point.x && mouse.x < player.x*game.size.canvasMultiplyer.x+(15*game.size.canvasMultiplyer.x)/2){
        c.lineTo(mouse.x, mouse.y);
    }else{
        c.lineTo(point.x, point.y);
    }
    c.lineWidth = game.size.canvasMultiplyer.x;
    c.stroke();

};

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
}
function findNewPoint(x, y, angle, distance) {
    var result = {};

    result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
    result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);

    return result;
}

init();

update();