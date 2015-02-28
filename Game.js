var functionRUBI = functionRUBI || {};


functionRUBI.Game = function(){};

functionRUBI.Game.prototype = {
	
 preload: function(){
 	this.load.tilemap('testmap', 'assets/test/tutorialmap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Walls', 'assets/test/Wall.png'); 	
 	
 },
	
	
  create: function() {
  	
 //local variables for enemies
 this.enemies = [];
 this.enemiesAlive = 3;
 this.enemiesTotal = 3;
 
 ///////////// Implementing map stuff///////////// 
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  createBackground();
	this.map = this.game.add.tilemap('testmap'); 
	this.map.addTilesetImage('Walls','Walls');
    this.map.setCollisionBetween(1,4);
     
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld(); 
 
 //particle collision with wall
 this.emitHitWall = functionRUBI.game.add.emitter(0,0,500);
this.emitHitWall.makeParticles('spark');
  	  
 
//adding player to map
  	 this.player = this.game.add.sprite(this.game.world.centerX+64,this.game.world.centerY-128,'player'); 
  	 this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  	 this.player.anchor.setTo(.5,.5);
  	 this.player.body.setSize(45, 50, 0, 0);
  	 this.player.collideWorldBounds = true;
  	 this.player.animations.add('walk');	    
 	 createBullets();
  
  //keyboard and mouse control
 	cursors = this.game.input.keyboard.createCursorKeys();
 	this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.camera.follow(this.player);


///adding enemies to map
this.enemies.push(new Enemy(0, functionRUBI, functionRUBI.enemyBullets, "follower", this.game.world.centerX+500, this.game.world.centerY-128));
this.enemies.push(new Enemy(1, functionRUBI, functionRUBI.enemyBullets, "follower", 1055, 1021));
this.enemies.push(new Enemy(2, functionRUBI, functionRUBI.enemyBullets, "follower", 1100, 1021));
this.enemies.push(new Enemy(3, functionRUBI, functionRUBI.enemyBullets, "follower", 770, 1059));
this.enemies.push(new Enemy(4, functionRUBI, functionRUBI.enemyBullets, "follower", 227, 1029));
this.enemies.push(new Enemy(5, functionRUBI, functionRUBI.enemyBullets, "follower", 247, 1252));
this.enemies.push(new Enemy(6, functionRUBI, functionRUBI.enemyBullets, "follower", 366, 1211));
this.enemies.push(new Enemy(7, functionRUBI, functionRUBI.enemyBullets, "follower", 504, 1211));
this.enemies.push(new Enemy(8, functionRUBI, functionRUBI.enemyBullets, "follower", 427, 1125));
this.enemies.push(new Enemy(9, functionRUBI, functionRUBI.enemyBullets, "mildew", this.game.world.centerX+400, this.game.world.centerY-128));
this.enemies.push(new Enemy(10, functionRUBI, functionRUBI.enemyBullets, "mildew", 633, 1257));
this.enemies.push(new Enemy(11, functionRUBI, functionRUBI.enemyBullets, "mildew", 460, 820));
this.enemies.push(new Enemy(12, functionRUBI, functionRUBI.enemyBullets, "mildew", 199,94));
this.enemies.push(new Enemy(13, functionRUBI, functionRUBI.enemyBullets, "mildew", 212, 835));
this.enemies.push(new Enemy(14, functionRUBI, functionRUBI.enemyBullets, "mildew", 85, 1257));
this.enemies.push(new Enemy(15, functionRUBI, functionRUBI.enemyBullets, "slime", this.game.world.centerX+300, this.game.world.centerY-128));



this.enemyGroup = this.game.add.group();

	for (var i = 0; i < this.enemies.length; i++) {
	var addenemy = this.enemies[i].sprite;
	this.enemyGroup.add(addenemy);
  	}  
	
  },
  update: function() {
  	console.log("HERE");
  	//player/enemy collsion with wall
    this.game.physics.arcade.collide(this.player, this.layer);
     this.game.physics.arcade.collide(this.enemyGroup, this.layer);
    //enemy collision with rubi bullet
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.intBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.doubleBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.floatBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.stringBullets, this.hitEnemy, null, this);
	this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.emitSBullets,  this.hitEnemy, null, this);
     
     //bullet collsion with wall
    this.game.physics.arcade.overlap(functionRUBI.intBullets, this.layer, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.doubleBullets, this.layer, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.floatBullets, this.layer, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.stringBullets, this.layer, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.emitSBullets, this.layer, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.layer, this.killBullet, null, this);

	// enemy bullet collision with player
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.player, this.hitRUBI, null, this);

	//enemy collsion with enemy
	this.game.physics.arcade.collide(this.enemyGroup, this.enemyGroup);


	filterUpdate();
  
  //////////Enemy update function////////////	
  	this.enemiesAlive = 0;

    for (var i = 0; i < this.enemies.length; i++)
    {
        if (this.enemies[i].alive)
        {
            this.enemiesAlive++;
            this.enemies[i].update(this.player);
        }
    }
    /////////////////
  	
  	
  	this.player.rotation = this.game.physics.arcade.angleToPointer(this.player)-((Math.PI/2)+this.game.math.degToRad(-180));
	functionRUBI.floatBullets.forEachAlive(floatMove,this);  
    functionRUBI.floatBullets.forEachAlive(floatRotate,this);
	

//Player movement code///////////    
    this.player.body.velocity.x = 0;
 	this.player.body.velocity.y = 0;
 	

    if (cursors.up.isDown){
    	 this.player.animations.play('walk', 8);
          this.player.body.velocity.y = -(300+rubiUpgrade.speed);
    } else if (cursors.down.isDown){
    	this.player.animations.play('walk', 8);
         this.player.body.velocity.y = (300+rubiUpgrade.speed);
    }

    if (cursors.left.isDown){
    	this.player.animations.play('walk', 8);
              this.player.body.velocity.x = -(300+rubiUpgrade.speed);
    }else if (cursors.right.isDown){
    	this.player.animations.play('walk', 8);
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
  
  ///////kills bullets if it touches a wall//////
  killBullet: function(bullet,wall){
  	
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,250,null,10);	
  	bullet.kill();  	
  },
  
  /////decrements RUBI's health enemy bullet hits her///////
  hitRUBI: function(wall,bullet){
  	rubiHealth.rubucks -=10;
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,250,null,10);	
  	bullet.kill();  	
  },
  
   ///////kills bullets if it touches a wall//////
  hitEnemy: function(enemy,bullet){
  	
  	this.emitHitWall.x = enemy.x;
		this.emitHitWall.y = enemy.y;
		this.emitHitWall.start(true,250,null,10);	
	enemy.alive = false;
  	enemy.kill();  
  	bullet.kill();	
  },
  
  
  //debug functions
render: function(){
	 this.game.debug.text("DEBUGTEXT",100,100);
	 this.game.debug.text("gunVar "+gunVar,100,120);
	 this.game.debug.text("gunrate "+fireRate,100,140 );
	  this.game.debug.text("Px "+this.player.x,100,160);
	   this.game.debug.text("Py "+this.player.y,100,180);
	   this.game.debug.body(this.player);
	 this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),100,200);
	
	},

};

