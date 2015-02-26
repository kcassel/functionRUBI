var functionRUBI = functionRUBI || {};


functionRUBI.Game = function(){};



functionRUBI.Game.prototype = {
 preload: function(){
 	this.load.tilemap('testmap', 'assets/test/tutorialmap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Walls', 'assets/test/Wall.png'); 	
 	
 },
	
	
  create: function() {
  	
 
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  createBackground();
  	  
  
this.map = this.game.add.tilemap('testmap'); 
        this.map.addTilesetImage('Walls','Walls');
         this.map.setCollisionBetween(1,4);
        
         // this.wallsCG = this.game.physics.p2.createCollisionGroup();
      //this.playerCG = this.game.physics.p2.createCollisionGroup();       
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld(); 
       // this.game.physics.enable(this.layer);
       //this.layer.debug = true;
        //this.game.physics.p2.convertTilemap(this.map, this.layer);
 
  	  createBullets();
  	  
  	 this.player = this.game.add.sprite(this.game.world.centerX+64,this.game.world.centerY-128,'player'); 
  	 this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  	 this.player.anchor.setTo(.5,.5);
  	 this.player.body.setSize(45, 50, 0, 0);
  	 this.player.collideWorldBounds = true;
  	    

 	cursors = this.game.input.keyboard.createCursorKeys();
 	this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.camera.follow(this.player);



///
this.emitHitWall = functionRUBI.game.add.emitter(0,0,500);
this.emitHitWall.makeParticles('spark');

  	  
  },
  update: function() {
  	
    this.game.physics.arcade.collide(this.player, this.layer);
     
     //bullet collsion with wall
    this.game.physics.arcade.collide(functionRUBI.intBullets, this.layer, this.killBullet, null, this);
     this.game.physics.arcade.collide(functionRUBI.doubleBullets, this.layer, this.killBullet, null, this);
    this.game.physics.arcade.collide(functionRUBI.floatBullets, this.layer, this.killBullet, null, this);
     this.game.physics.arcade.collide(functionRUBI.stringBullets, this.layer, this.killBullet, null, this);
this.game.physics.arcade.collide(functionRUBI.emitSBullets, this.layer, this.killBullet, null, this);

	filterUpdate();
  	
  	if (globalVar.playerX != this.player.x){
  	globalVar.playerX = this.player.x;
  	}
  	if(globalVar.playerY = this.player.y){
  	globalVar.playerY = this.player.y;
  	}
  	
  	
  	 this.player.rotation = this.game.physics.arcade.angleToPointer(this.player)-((Math.PI/2)+this.game.math.degToRad(-180));
  	//this.player.body.rotation = this.game.physics.arcade.angleToPointer(this.player)-((Math.PI/2)+this.game.math.degToRad(-180));

	functionRUBI.floatBullets.forEachAlive(floatMove,this);  
    functionRUBI.floatBullets.forEachAlive(floatRotate,this);
	
    //this.player.body.setZeroVelocity();
    
    this.player.body.velocity.x = 0;
 	this.player.body.velocity.y = 0;

    if (cursors.up.isDown){
          this.player.body.velocity.y = -(300+rubiUpgrade.speed);
    } else if (cursors.down.isDown){
         this.player.body.velocity.y = (300+rubiUpgrade.speed);
    }

    if (cursors.left.isDown){
              this.player.body.velocity.x = -(300+rubiUpgrade.speed);
    }else if (cursors.right.isDown){
              this.player.body.velocity.x = (300+rubiUpgrade.speed);
    }
    
     
    
    //switches between bullet. bulletSwitch found in Bullet.js
    this.spaceKey.onDown.add(bulletSwitch,this);
    
    //shoots each type of bullet
     if (this.game.input.activePointer.isDown) {
     	adjustRate(gunVar);
     	if (gunVar==0){
    		intFire(this.player);
    	}else if(gunVar==1){
    		stringFire(this.player);
    	} else if (gunVar ==2){
    		doubleFire(this.player);
    	}else if (gunVar ==3){
    		floatFire(this.player);
    	}
        
    } 
    
  }, 
  
  killBullet: function(bullet){
  	
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
	
		this.emitHitWall.start(true,200,null,10);	
  	bullet.kill();  	
  },
  
  //debug functions
render: function(){
	 this.game.debug.text("DEBUGTEXT",100,100);
	 this.game.debug.text("gunVar "+gunVar,100,120);
	 this.game.debug.text("gunrate "+fireRate,100,140 );
//	  this.game.debug.text("Px "+this.player.x,100,160);
	//   this.game.debug.text("Py "+this.player.y,100,180);
	   this.game.debug.body(this.player);
	 this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),100,180);
	
	},

};

