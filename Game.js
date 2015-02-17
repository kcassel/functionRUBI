var functionRUBI = functionRUBI || {};

//title screen
functionRUBI.Game = function(){};

functionRUBI.Game.prototype = {
  create: function() {
  	  this.background = this.game.add.tileSprite(0, 0, 2000, 1333, 'background');
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  
  	  this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
  	  this.game.physics.p2.enable(this.player);
  	  this.player.anchor.set(.5);
 	  this.player.body.allowRotation = false;
 	  
 	  createBullets();
 	  
 	cursors = this.game.input.keyboard.createCursorKeys();
    this.game.camera.follow(this.player);
  	  
  },
  update: function() {
  	
  	this.player.body.rotation = this.game.physics.arcade.angleToPointer(this.player)-((Math.PI/2)+this.game.math.degToRad(-180));

    this.player.body.setZeroVelocity();

    if (cursors.up.isDown){
        this.player.body.moveUp(300);
    } else if (cursors.down.isDown){
        this.player.body.moveDown(300);
    }

    if (cursors.left.isDown){
        this.player.body.velocity.x = -300;
    }else if (cursors.right.isDown){
        this.player.body.moveRight(300);
    }
    
     if (this.game.input.activePointer.isDown) {
        fire(this.player.x,this.player.y);
    }
    
  },
 
 
 
};