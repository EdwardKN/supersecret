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

var map = {
    stored:{
        x:[],
        y:[]
    },
    x:0
};

var last = {
    randomleft: 0,
    randomright:0
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
        y:135-10,
        direction:0
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
    if(event.code === "KeyD"){
        player.direction = 1;
    }
    if(event.code === "KeyA"){
        player.direction = -1;
    }
});
window.addEventListener("keyup",function(event){
    if(event.code === "KeyD" && player.direction !== -1){
        player.direction = 0;
    }
    if(event.code === "KeyA" && player.direction !== 1){
        player.direction = 0;
    }
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
    walk(player.direction);
};

function mapUpdate(){
    requestAnimationFrame(mapUpdate)
    generateMap();
}

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

function drawMap(x,y,w,h){
    c.fillStyle = "black"
    c.fillRect(x,y,w,h)
}

function generateMap(){
    if(map.stored.x.length === 0){
        generate();
    }else{
        for (let i = 0; i < map.stored.x.length; i++){
                if(map.x == map.stored.x[i]){
                    if(map.stored.x[i] === map.x){
                        for (let g = 0; g < 480; g++){
                            let index = 0;
                            let value = map.stored.y[i][235];
                            for (let g = 235; g < 245; g++) {
                                if (map.stored.y[i][g] > value) {
                                    value = map.stored.y[i][g];
                                }
                            }
                                drawMap(g*game.size.canvasMultiplyer.x, (map.stored.y[i][g]+player.y+20-value)*game.size.canvasMultiplyer.y, game.size.canvasMultiplyer.x, game.size.canvasMultiplyer.y*480);
                        }
                    }                
                }else{
                    continue;
            }
        }
    }
}

function generate(){
    map.stored.x.push(map.x);

    let y = [];
    for (let g = 0; g < 480; g++){
        if(y.length === 0){
            y[g] = 10
        }else{
            y[g] = y[g-1]+random(-1,2)
        }
    }

    map.stored.y.push(y)
    console.log(map.x)
}

function generateLeft(){
    map.stored.x.push(map.x);

    let doOnce = false;
    let leftrandom = random(-1,2);

    for (let i = 0; i < map.stored.x.length; i++){
        if(map.stored.x[i] === map.x+1 && doOnce === false){

            doOnce = true;
            var y = [];

            y = y.concat(map.stored.y[i])

            y.pop();
            y.unshift(y[0]+leftrandom)

            map.stored.y.push(y);
        }
        
    }
}
function generateRight(){
    map.stored.x.push(map.x);

    let doOnce = false;

    for (let i = 0; i < map.stored.x.length; i++){
        if(map.stored.x[i] === map.x-1 && doOnce === false){

            doOnce = true;
            var y = [];

            y = y.concat(map.stored.y[i])

            y.shift();
            y.push(y[478]+random(-1,2))

            map.stored.y.push(y);
        }
        
    }
}
function right(){
    map.x++;
    if(map.stored.x.includes(map.x) === false){
        generateRight();
    }
}
function left(){
    map.x--;
    if(map.stored.x.includes(map.x) === false){
        generateLeft();
    }
}


function walk(direction){
    if(direction === 1){
        right();
    }   
    if(direction === -1){
        left();
    }
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

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
mapUpdate();
