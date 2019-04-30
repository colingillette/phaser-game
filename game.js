// Game Config Object

var config = {
    type: Phaser.AUTO,
    parent: 'gamespace',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// Initialize game object and global varaibles

var anvils;
var bombs;
var cursors;
var gameOver = false;
var feathers;
var invincible = false;
var jumpHeight = -330;
var level = 1;
var levelText;
var platforms;
var player;
var purplePowerUpUsed;
var purplePowerUps;
var redPowerUpUsed;
var redPowerUps;
var score = 0;
var scoreIncrement = 10;
var scoreText;
var speedNeg = -160;
var speedPos = 160;
var stars;

var game = new Phaser.Game(config);


// Preload Phaser function: Loads assets for later use

function preload()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('purple', 'assets/PowerUp1.png');
    this.load.image('red', 'assets/PowerUp2.png');
    this.load.image('feather', 'assets/feather.png');
    this.load.image('anvil', 'assets/anvil.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}


// Create Phaser function: Used to initialize all important game objects and do any processes that need to happen before start

function create()
{
    // Accepts keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    
    // Create background
    this.add.image(400, 300, 'sky');

    // Create the platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Create the player
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(24, 24, 4, 24);

    // Create the Group Objects
    purplePowerUps = this.physics.add.group();
    redPowerUps = this.physics.add.group();
    feathers = this.physics.add.group();
    anvils = this.physics.add.group();
    bombs = this.physics.add.group();
    stars = this.physics.add.group();

    // Create the first star
    createStar();

    // Create player movement animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Create colliders
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(purplePowerUps, platforms);
    this.physics.add.overlap(player, purplePowerUps, hitPowerUpPurple, null, this);
    this.physics.add.collider(redPowerUps, platforms);
    this.physics.add.overlap(player, redPowerUps, hitPowerUpRed, null, this);
    this.physics.add.collider(feathers, platforms);
    this.physics.add.overlap(player, feathers, hitFeather, null, this);
    this.physics.add.collider(anvils, platforms);
    this.physics.add.overlap(player, anvils, hitAnvil, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // Create initial text elements
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    levelText = this.add.text(626, 16, 'Level: 1', { fontSize: '32px', fill: '#000' });    
}


// Update Phaser function: Phaser attempts this call ~60 times per second. Used mostly to run event handlers and animations.

function update ()
{
    // Play movement animations
    if (cursors.left.isDown) {
        player.setVelocityX(speedNeg);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(speedPos);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    // Allower player to jump
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(jumpHeight);
    }

    // If game over is detected we will give restart instructions and kill the game
    if (gameOver) {
        gameOverText = this.add.text(200, 260, 'Game Over!', { fontSize: '64px', fill: '#000', fontWeight: 'boldest' });
        resetText = this.add.text(250, 320, 'Press F5 to Restart Game', { fontSize: '20px', fill: '#000' });
        game.destroy();
    }
}


// collectStar Helper Function: Handles events that occur when the player collides with a star

function collectStar(player, star)
{
    // Remove the star from play
    star.disableBody(true, true);

    // Increment the score
    score += scoreIncrement;
    scoreText.setText('Score: ' + score);
    document.getElementById('score').value = score;
    
    // This executes when this is the last star of the level
    if (stars.countActive(true) === 0) {
        
        // Increment the level and show the player
        level++;
        levelText.setText('Level: ' + level);
        
        // Handle powerup drops
        if (!purplePowerUpUsed) {
            powerUpChance("purple");
        }

        if (!redPowerUpUsed) {
            powerUpChance("red");
        }

        powerUpChance("gravity");

        // Slightly boost the player stats and score per star to compensate for increased difficulty
        speedPos += 10;
        speedNeg -= 10;
        jumpHeight -= 5;
        scoreIncrement += 5;

        // Distribute a new round of stars. Dropping one star per level through level 10. Stars will max at 10 per level.
        if (level <= 10) {
            for (var i = 0; i < level; i++) {
                createStar();
            }
        }
        else {
            for (var i = 0; i < 10; i++) {
                createStar();
            }
        }

        // Create bombs based on what level it is. Currently adding a bomb every other level through level 10.
        if (level % 2 == 0 && level <= 10) {
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }

        // Reset the power up distribution chance every 8 levels
        if (level % 8 == 0) {
            purplePowerUpUsed = false;
            redPowerUpUsed = false;
        }
    }
}


// hitBomb Helper Function: Handles events that occur when a player collides with a bomb

function hitBomb(player, bomb)
{
    if (!invincible)
    {
        // Stop the game state, set the player to basic pose, make its tint red, and set gameOver to true for update function
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
    }
}


// powerUpChance Helper Function: Called every new level, handles distribution of powerups

function powerUpChance(powerUp)
{   
    if (powerUp === "purple")
    {
        // Handles the purple powerup drop chance and distribution
        if (Math.random(1, 10) * 10 > 4) {
            var x = Phaser.Math.Between(10, 790);
            var purplePowerUp = purplePowerUps.create(x, 16, 'purple');
            purplePowerUp.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
            purplePowerUp.setCollideWorldBounds(true);
            purplePowerUp.setVelocity(Phaser.Math.Between(-20, 20), 15);      
            purplePowerUpUsed = true;
        }
    }
    else if (powerUp === "red")
    {
        // Handles the red powerup drop chance and distribution
        if (Math.random(1, 10) * 10 > 6) {
            var x = Phaser.Math.Between(10, 790);
            var redPowerUp = redPowerUps.create(x, 16, 'red');
            redPowerUp.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
            redPowerUp.setCollideWorldBounds(true);
            redPowerUp.setVelocity(Phaser.Math.Between(-20, 20), 15);      
            redPowerUpUsed = true;
        }
    }
    else if (powerUp === "gravity")
    {
        // Handles the feather and anvil distribution
        if (Math.random(1, 10) * 10 > 8) {
            var x = Phaser.Math.Between(10, 790);
            // Randomly decide between an anvil and a feather
            if (Math.random(1, 10) * 10 > 5) {
                var feather = feathers.create(x, 16, 'feather');
                feather.setBounce(Phaser.Math.FloatBetween(0.6, 0.9));
                feather.setCollideWorldBounds(true);
                feather.setVelocity(Phaser.Math.Between(-20, 20), 10);
            }
            else {
                var anvil = anvils.create(x, 16, 'anvil');
                anvil.setBounce(Phaser.Math.FloatBetween(0.1, 0.2));
                anvil.setCollideWorldBounds(true);
                anvil.setVelocity(Phaser.Math.Between(-20, 20), 30);
            }
        }
    }
}


// hitPowerUpPurple Helper Function: Called by physics event between player and purple

function hitPowerUpPurple(player, purplePowerUp)
{
    // Use the powerup to significantly increase player stats
    speedPos += 30;
    speedNeg -= 30;
    jumpHeight -= 15;

    // Remove the powerup from the field
    purplePowerUp.destroy();
}

// hitPowerUpRed Helper Function: Called by physics event between player and red

function hitPowerUpRed(player, redPowerUp)
{
    // Set Invincibility to true for 15 seconds
    invincible = true;
    player.setTint(0x0000ff);
    setTimeout(nulifyInvincibility, 10000);

    // Remove the powerup from the field
    redPowerUp.destroy();
}


// nulifyInvincibility Helper Function: Called after 15 seconds of invincibility

function nulifyInvincibility()
{
    // Set Invincibility to false
    invincible = false;
    player.setTint(0xffffff);
}


// createStar Helper Function: block of code that creates a single star

function createStar() 
{
    var x = Phaser.Math.Between(10, 790);
    var star = stars.create(x, 16, 'star');
    star.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    star.setCollideWorldBounds(true);
}


// hitFeather Helper Function: Executes when the player hits a feather. Significantly raises jump height temporarily.

function hitFeather(player, feather)
{
    var currentHeight = jumpHeight;
    jumpHeight = -550;
    setTimeout(function() {
        jumpHeight = currentHeight;
    }, 4000);
    feather.destroy();
}


// hitAnvil Helper Function: Executes when the player hits a feather. Significantly lowers jump height temporarily.

function hitAnvil(player, anvil)
{
    var currentHeight = jumpHeight;
    jumpHeight = -150;
    setTimeout(function() {
        jumpHeight = currentHeight
    }, 4000);
    anvil.destroy();
}