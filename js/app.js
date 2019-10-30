const scoreNum = document.querySelector('.score');
let scoreCount = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Set the enemy's initial location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Updates enemy's location and handles collision with the Player
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -10;
    }
  this.checkCollisions();
};

/* Checks for collisions based on the gaps between the objects (player & enemies), there is no collision if a gap is found
however, if no gap is found, a collision is detected (Axis-Aligned Bounding Box theorem) */
Enemy.prototype.checkCollisions = function() {
    if ((player.x < this.x + 75) && (player.x + 75 > this.x) && (player.y < this.y + 55) && (55 + player.y > this.y)) {
       player.reset();
 }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
  //Set player's initial location
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
  // This class requires an update(), render() and
  // a handleInput() method.

Player.prototype.update = function(dt) {
    this.handleInput(dt);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  /*  - Move player according to input
          left key --> move player to left
          right key --> move player to right
          up key --> move player up
          down key --> move player down
      - Check & handle: player cannot move off screen
      - If player reaches water, reset game by moving player back to initial location */
    if (key == 'left' && this.x > 1) {
        this.x -= 50;
    }
    else if (key == 'right' && this.x < 401) {
        this.x += 50;
    }
    else if (key == 'up' && this.y > 0) {
        this.y -= 50;
    }
    else if (key == 'down' && this.y < 401) {
        this.y += 50;
    }
    if (this.y < -20) {
      /*Increments the score if the player reaches the water successfully
      & moves the player back to the original position */
      score();
      this.reset();
  }
};

Player.prototype.reset = function() {
      //Move player back to initial location
      this.x = 201;
      this.y = 401;
};

function score() {
  //Increment the score
      scoreCount++;
      scoreNum.innerHTML = `Score: ${scoreCount}`;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Enemy objects are created at different positions and with different speeds.
const allEnemies = [
  new Enemy(0, 60, Math.random() * 100 + 90),
  new Enemy(-2, 140, Math.random() * 100 + 50),
  new Enemy(0, 220, Math.random() * 100 + 70),
  new Enemy(-6, 90, Math.random() * 100 + 20),
  new Enemy(-5, 200, Math.random() * 100 + 30)
];



//A player object is created at the initial position
const player = new Player(201, 401);

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
