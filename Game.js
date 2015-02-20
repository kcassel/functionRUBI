var functionRUBI = functionRUBI || {};


functionRUBI.Game = function(){};



functionRUBI.Game.prototype = {
 preload: function(){
 	this.load.tilemap('testmap', 'assets/test/tutorialmap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Walls', 'assets/test/Wall.png'); 	
 	
 },
	
	
  create: function() {
 	
  	  this.background = this.game.add.tileSprite(0, 0, 2000, 1333, 'background');
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  
  
this.map = this.game.add.tilemap('testmap'); 
        this.map.addTilesetImage('Walls','Walls');
        
         // this.wallsCG = this.game.physics.p2.createCollisionGroup();
      //this.playerCG = this.game.physics.p2.createCollisionGroup();       
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld(); 
        this.map.setCollision(1);
        this.game.physics.p2.convertTilemap(this.map, this.layer);
    
      
 
  	  
  	  
  	 this.player = this.game.add.sprite(this.game.world.centerX+64,this.game.world.centerY-128,'player');
  	// this.player.image = this.game.add.sprite(0,0,'player');
  	  //this.player.image.anchor.setTo(.5);
  	  //this.player.addChild(this.player.image);
	  this.game.physics.p2.enable(this.player);
 	  this.player.body.allowRotation = false;
 	  
 	  this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
 	  
 	  
 	  
 	  createBullets();
 	  
 	cursors = this.game.input.keyboard.createCursorKeys();
 	this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.camera.follow(this.player);
  	  
  },
  update: function() {

  	
  	if (globalVar.playerX != this.player.x){
  	globalVar.playerX = this.player.x;
  	}
  	if(globalVar.playerY = this.player.y){
  	globalVar.playerY = this.player.y;
  	}
  	
  	this.player.body.rotation = this.game.physics.arcade.angleToPointer(this.player)-((Math.PI/2)+this.game.math.degToRad(-180));

	functionRUBI.floatBullets.forEachAlive(floatMove,this);  
    functionRUBI.floatBullets.forEachAlive(floatRotate,this);
	
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
    	}else if (gunVar ==3){
    		floatFire(this.player);
    	}
        
    }
    
  }, 
  

  
  //debug functions
render: function(){
	 this.game.debug.text("DEBUGTEXT",100,100);
	 this.game.debug.text("gunVar "+gunVar,100,120);
	 this.game.debug.text("gunrate "+rateArray[gunVar],100,140 );
	  this.game.debug.text("Px "+this.player.x,100,160);
	   this.game.debug.text("Py "+this.player.y,100,180);
	 //this.game.debug.spriteBounds(this.player);
	 this.game.debug.text("bullet "+globalVar.test,100,200);
},



 
};