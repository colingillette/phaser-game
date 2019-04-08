var config = {
    type: Phaser.AUTO,
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

var bombs;
var cusors;
var gameOver = false;
var jumpHeight = -330;
var level = 1;
var levelText;
var platforms;
var player;
var purplePowerUpUsed;
var purplePowerUps;
var score = 0;
var scoreIncrement = 10;
var scoreText;
var speedNeg = -160;
var speedPos = 160;
var stars;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('purple', 'assets/PowerUp1.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    cursors = this.input.keyboard.createCursorKeys();
    
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(24, 24, 4, 24);

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

    this.physics.add.collider(player, platforms);

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function(child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    levelText = this.add.text(626, 16, 'Level: 1', { fontSize: '32px', fill: '#000' });

    purplePowerUps = this.physics.add.group();
    this.physics.add.collider(purplePowerUps, platforms);
    this.physics.add.overlap(player, purplePowerUps, hitPowerUpPurple, null, this);

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
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

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(jumpHeight);
    }

    if (gameOver) {
        gameOverText = this.add.text(200, 260, 'Game Over!', { fontSize: '64px', fill: '#000', fontWeight: 'boldest' });
        resetText = this.add.text(250, 320, 'Press F5 to Restart Game', { fontSize: '20px', fill: '#000' });
    }
}

function collectStar(player, star)
{
    star.disableBody(true, true);

    score += scoreIncrement;
    scoreText.setText('Score: ' + score);
    
    if (stars.countActive(true) === 0) {
        level++;
        levelText.setText('Level: ' + level);

        if (!purplePowerUpUsed) {
            power_up_chance();
        }
        
        stars.children.iterate(function(child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        speedPos += 10;
        speedNeg -= 10;
        jumpHeight -= 5;
        scoreIncrement += 5;

        for (var i = 1; i < level; i++) {
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
}

function hitBomb(player, bomb)
{
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

function power_up_chance()
{   
    if (Math.random(1, 10) * 10 > 7) {
        var x = Phaser.Math.Between(10, 790);
        var purplePowerUp = purplePowerUps.create(x, 16, 'purple');
        purplePowerUp.setBounce(0.25);
        purplePowerUp.setCollideWorldBounds(true);
        purplePowerUp.setVelocity(Phaser.Math.Between(-20, 20), 15);
        
        purplePowerUpUsed = true;
    }
}

function hitPowerUpPurple(player, purplePowerUp)
{
    speedPos += 30;
    speedNeg -= 30;
    jumpHeight -= 15;

    purplePowerUp.destroy();
}