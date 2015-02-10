var game = new Phaser.Game(800, 600, Phaser.AUTO, 'function RUBI()', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('background','assets/background.jpg');
    game.load.image('player','assets/rubi.png');
    game.load.image('player1','assets/rubi.png');
    game.load.image('bullet','assets/bullet.png');

}

var player;
var cursors;
var fireRate = 100;
var nextFire =0;

function create() {

    game.add.tileSprite(0, 0, 2000, 1333, 'background');

    game.world.setBounds(0, 0, 2000, 1333);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    //player1 = game.add.sprite(game.world.centerX,game.world.centerY,'player1');
    game.physics.p2.enable(player);
   // game.physics.arcade.enable(player);
    
    player.anchor.set(.5);
  // player.body.allowRotation = false;

	bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
       bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
	
    
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player);

}

function update() {
	
	player.body.rotation = game.physics.arcade.angleToPointer(player) - Math.PI

    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }
    
 

    if (game.input.activePointer.isDown)
    {
        fire();
    }

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

		var angles = game.physics.arcade.angleToPointer(player) - Math.PI;
        bullet.reset((player.x+1*Math.cos(-angles)), (player.y+1*Math.sin(-angles)));
		//bullet.reset(player.x, player.y);
		
        game.physics.arcade.moveToPointer(bullet, 500);
    }

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}