var functionRUBI = functionRUBI || {};


functionRUBI.Game = function(){};



functionRUBI.Game.prototype = {
  create: function() {
     this.background = this.game.add.tileSprite(0, 0, 2000, 1333, 'background');
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  
  	  this.player = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,null);
  	 this.player.image = this.game.add.sprite(0,0,'player');
  	  this.player.image.anchor.setTo(.5);
  	  this.player.addChild(this.player.image);
  	  
  	  
  	  this.game.physics.p2.enable(this.player);
 	  this.player.body.allowRotation = false;
 	  
 	  createBullets();
 	  
 	cursors = this.game.input.keyboard.createCursorKeys();
 	this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
    
    //switches between bullet. bulletSwitch found in Bullet.js
    this.spaceKey.onDown.add(bulletSwitch,this);
    
    //shoots each type of bullet
     if (this.game.input.activePointer.isDown) {
     	adjustRate(gunVar);
     	if (gunVar==0){
    		intFire(this.player);
    	}else if(gunVar==1){
    		doubleFire(this.player);
    	} else if (gunVar ==2){
    		stringFire(this.player);
    	}
        
    }
    
  }, 
  //debug functions
render: function(){
	 this.game.debug.text("DEBUGTEXT",100,100);
	 this.game.debug.text("gunVar "+gunVar,100,120);
	 this.game.debug.text("gunrate "+rateArray[gunVar],100,140 )
	this.game.debug.text(this.player);
},



 
};