$(document).ready(function(){
var ctx = document.getElementById("canvas").getContext("2d"),
    lastShot = Date.now(),
    fireRate = 300,
    bullets = [],
    points = 0;
    enemies = [],
    enemySpeed = 1.5,
    spawningRate = 300,
    enterPressed = true;
    bulletSpeed = 10,
    superMode = false,
    player = {
        x: 600,
        y: 250,
        leftPressed: false,
        rightPressed: false,
        upPressed: false,
        downPressed: false,
        spacePressed: false,
        speed: 5
    };


var playerImage = new Image();
playerImage.src = "https://3.bp.blogspot.com/-jGC08Dy0zg8/U405cNq1-MI/AAAAAAAABqU/38d5rmV1S8Y/s1600/redfighter0006.png";
var enemyImage = new Image();
enemyImage.src = "https://a.fsdn.com/con/app/proj/partartspace/screenshots/Spaceship14.png/1";
var bulletImage = new Image();
bulletImage.src = "https://chrismalnu.files.wordpress.com/2016/02/clash2.png?w=680";

$("#menu").click(function(){
     $("#menu").fadeOut();
     update();
     setInterval(spawnEnemies, 500);
     enterPressed=false;
});



function drawEnemies() {
    enemies.forEach(function(enemy){
        ctx.drawImage(enemyImage, enemy.x, enemy.y, 100,100);
        enemy.y += enemySpeed;
        ctx.fillStyle = "red";
        ctx.fillRect(enemy.x,enemy.y,enemy.health * 10,5);
    });
    enemySpeed +=.0001;
}

function spawnEnemies() {
    enemies.push({
        x:Math.floor(Math.random() * 1250) + 1,
        y:-100,
        health: 10
    });
}


function drawBullets() {
    bullets.forEach(function(bullet){
        ctx.drawImage(bulletImage, bullet.x-3, bullet.y, 10, 40);
        ctx.fillStyle = "red";
        ctx.fill();
        bullet.y -= bullet.dy;
        bullet.x +=bullet.dx;
    });
}

function collisionDetection() {

     if (player.x+100 > canvas.width) {
          player.x -= player.speed;
     }
     if (player.x < 0) {
          player.x += player.speed;
     }
     if (player.y + 100 > canvas.height) {
          player.y -= player.speed;
     }

    for (var enemy = 0; enemy < enemies.length; enemy ++){
        if(player.x < enemies[enemy].x + 80 &&
           player.x + 80 > enemies[enemy].x &&
           player.y < enemies[enemy].y + 65 &&
           player.y + 100  > enemies[enemy].y)
        {
               document.location.reload();
        }

        if (enemies[enemy].y > canvas.height){
                enemies.splice(enemy,1);
                break;
            }

        for (var bullet = 0; bullet < bullets.length; bullet ++) {
            if(bullets[bullet].y < enemies[enemy].y + 70 &&
               bullets[bullet].y > enemies[enemy].y &&
               bullets[bullet].x < enemies[enemy].x + 100 &&
               bullets[bullet].x > enemies[enemy].x)
            {
                  bullets.splice(bullet, 1);
                 if (enemies[enemy].health > 0) {
                      enemies[enemy].health --;
                 }
                 else {
                     enemies.splice(enemy, 1);
                     points++;
                     break;
                }
                break;
            }

            if(bullets[bullet].y < -10){
                bullets.splice(bullet,1);
                break;
            }
        }
    }
}
$(document).keydown(function(e) {
    if(e.which == 13 && enterPressed) {
         $("#menu").fadeOut();
        update();
        setInterval(spawnEnemies, 500);
        enterPressed=false;
    }
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerImage, player.x,player.y, 100, 100);
    drawEnemies();
    drawBullets();
    collisionDetection();

    if(points > 1) {
         fireRate = 50;
         superMode = true;
    }


    if (player.leftPressed) {
        player.x -= player.speed;
    }
    if (player.rightPressed) {
        player.x += player.speed;
    }
    if (player.upPressed) {
        player.y -= player.speed;
    }
    if (player.downPressed) {
        player.y += player.speed;
    }
    if (player.spacePressed && Date.now() - lastShot > fireRate) {
        bullets.push({
            x: player.x+50,
            y: player.y,
            dx:0,
            dy:10
        });
        if(superMode) {
             bullets.push({
                 x: player.x+30,
                 y: player.y,
                 dx:-2,
                 dy:10
             });
             bullets.push({
                 x: player.x+70,
                 y: player.y,
                 dx:2,
                 dy:10
             });
             bullets.push({
                 x: player.x+90,
                 y: player.y,
                 dx:4,
                 dy:10
             });
             bullets.push({
                 x: player.x+10,
                 y: player.y,
                 dx:-4,
                 dy:10
             });
        }
        lastShot = Date.now();
    }

    ctx.font="40px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText("Points: " + points, 0,40);

    requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
    if (e.keyCode === 37) {
        player.leftPressed = true;
    }
    else if (e.keyCode === 39) {
        player.rightPressed = true;
    }
    else if (e.keyCode === 38) {
        player.upPressed = true;
    }
    else if (e.keyCode === 40) {
        player.downPressed = true;
    }
    else if (e.keyCode === 32) {
        player.spacePressed = true;
    }
});
document.body.addEventListener("keyup", function(e) {
    if (e.keyCode === 37) {
        player.leftPressed = false;
    }
    else if (e.keyCode === 39) {
        player.rightPressed = false;
    }
    else if (e.keyCode === 38) {
        player.upPressed = false;
    }
    else if (e.keyCode === 40) {
        player.downPressed = false;
    }
    else if (e.keyCode === 32) {
        player.spacePressed = false;
    }
});

});
