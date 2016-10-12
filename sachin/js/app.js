// Enemies our player must avoid
var Enemy = function(i) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random()*100 + 50;
    this.x = -60;
    this.yPos = [60, 140, 220];
    this.y = this.yPos[i];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500){
        this.x = -30;
        this.speed = Math.random()*300 + 50;
    }
    
    //enemy area
    this.area = {
        'x': this.x + 10,
        'y': this.y + 75,
        'xWidth': 80,
        'yHeight': 70
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.movementY = 80;
    this.movementX = 100;
    this.winning = false;
}

Player.prototype.update = function(){
    var thisPlayer = this;
    //update method
    if (this.y === -20 && this.winning === false){
        this.winning = true;
//        setTimeout(function(){
//            thisPlayer.win();
//        },700);
        setTimeout(this.win.bind(this),700);
    }
    
    //define area
    this.area = {
        'x': this.x + 23,
        'y': this.y + 85,
        'xWidth': 55,
        'yHeight': 60
    }
}

Player.prototype.win = function(){
    this.x = 200;
    this.y = 380;
    score += 100;
    updateData(score,lives);
    this.winning = false;
}

Player.prototype.render = function(){
    //render method
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    //handleInput method
    if(key === 'up' && this.y != -20){
        this.y -= this.movementY;
    }

    if(key === 'down' && this.y != 380){
        this.y += this.movementY;
    }

    if(key === 'left' && this.x != 0){
        this.x -= this.movementX;
    }

    if(key === 'right' && this.x != 400){
        this.x += this.movementX;
    }
//    console.log("X: " + this.x + " - Y:" + this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//loop to add two enemies per row
for (var i = 0; i < 3 ; i++){
    for (var j = 0; j < 1; j++){
        var enemy = new Enemy(i);
        allEnemies.push(enemy);    
    }
}

var player = new Player();


var test = function(){
    console.log("blueGem.collected = " + blueGem.collected);
    console.log("greenGem.collected = " + greenGem.collected);
    
}

    window.addEventListener('click', test);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Check for collisions function
var checkCollisions = function(){
    var playerCollision = function(){
        player.y = 380;
        player.x = 200;
        lives -= 1;
        livesList.innerHTML = "";
        for(var i = 0; i<lives; i++){
            livesList.innerHTML += listItem;
        }
        updateData(score,lives);
    }
    var playerArea = player.area;
    for (var i = 0; i < allEnemies.length; i++){
        var enemyArea = allEnemies[i].area;
        if (enemyArea.x + enemyArea.xWidth > playerArea.x && 
           enemyArea.x < playerArea.x + playerArea.xWidth &&
           enemyArea.y + enemyArea.yHeight > playerArea.y &&
           enemyArea.y < playerArea.y + playerArea.yHeight){
            playerCollision();
        }
    }
}

// Set scores and lives counters
var score = 0,
    lives = 5,
    scoresCounter = document.getElementById("scores"),
    livesCounter = document.getElementById("lives");

var livesList = document.getElementById("livesList");
var live = livesList.firstChild;
var listItem = "<li class='live'></li>"

// Update lives and score data, it is called when player gets to the other side or when it collides with an enemy
var updateData = function(score,lives){
    if(lives === 0){
        alert("Game Over. Your score was " + score + " points.");
        document.location.reload(); 
    } else {
        livesCounter.innerHTML = 'Lives ' + lives;
        scoresCounter.innerHTML = 'Score ' + score; 
    }
}

var gemArea = {
        'x': this.x + 23,
        'y': this.y + 85,
        'xWidth': 55,
        'yHeight': 60
    }
// create collectible constructor
var Gem = function(x,y,area){
    this.x = x;
    this.y = y;
    //define area
    this.area = area;
    this.collected = false;
    this.visible = true;
}

// create a collectible subclass
var GreenGem = function(x,y,area){
    Gem.call(this, x, y, area);
    this.sprite = 'images/GemGreen.png';
}
GreenGem.prototype = new Gem();

// create a collectible subclass
var BlueGem = function(x,y,area){
    Gem.call(this, x, y, area);
    this.sprite = 'images/GemBlue.png';
}
BlueGem.prototype = new Gem();

var yPosGem = Math.floor(Math.random() * 3);
var xPosGem = Math.floor(Math.random() * 5);

var yPosPointGem = Math.floor(Math.random() * 3);
var xPosPointGem = Math.floor(Math.random() * 5);

Gem.prototype.update = function(x,y){
    this.yPos = [60, 140, 220];
    this.xPos = [0,100,200,300,400];
    this.x = this.xPos[x];
    this.y = this.yPos[y];
    //define area
    this.area = {
        'x': this.x + 23,
        'y': this.y + 85,
        'xWidth': 55,
        'yHeight': 60
    }
    this.collected = false;
}

Gem.prototype.hide = function(){
    this.x = -100;
    this.y = -100;
    this.area.x = -100;
    this.area.y = -100;
    this.area.xWidth = -100;
    this.area.yHeight = -100;
    this.visible = false;
}

Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

BlueGem.prototype.collect = function(){
    console.log("blueGem collect");
    lives += 1;
    livesList.innerHTML += listItem;
}

GreenGem.prototype.collect = function(){
    score += 300;
}

GreenGem.prototype.update = function(x,y){
    this.yPos = [60, 140, 220];
    this.xPos = [0,100,200,300,400];
    this.x = this.xPos[x];
    this.y = this.yPos[y];
    //define area
    this.area = {
        'x': this.x + 23,
        'y': this.y + 85,
        'xWidth': 55,
        'yHeight': 60
    }
    this.collected = false;
}

//var yPosGem = Math.floor(Math.random() * 3);
//var xPosGem = Math.floor(Math.random() * 5);
var blueGem = new BlueGem(-200,-200,gemArea);
var greenGem = new GreenGem(-200,-200,gemArea);
    
//Check for gem collect function
var checkGemCollect = function(gem){
    var playerArea = player.area;
    var area = gem.area;
    if (area.x + area.xWidth > playerArea.x && 
       area.x < playerArea.x + playerArea.xWidth &&
       area.y + area.yHeight > playerArea.y &&
       area.y < playerArea.y + playerArea.yHeight && gem.collected === false){
        gem.collect();
        gem.hide();
        gem.collected = true;
        updateData(score,lives);
    }
}