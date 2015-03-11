var functionRUBI = functionRUBI || {};


functionRUBI.level2 = function(){};

functionRUBI.level2.prototype = {
	
	//load this level's specific map
 preload: function(){
 	this.load.tilemap('level2', 'assets/world/level2/lvl2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Wall', 'assets/world/level2/walledges.png'); 	
 	
 },
	
	
  create: function() {
  	
 //local variables for enemies
 this.enemies = [];
 this.enemiesAlive;
 this.enemiesTotal;
 

 
 ///////////// Implementing map stuff///////////// 
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  createBackgroundBlue();
  	  
 /////////////////////////////////////////////////////////////////////////////////////////////////////CHANGE 	  
	this.map = this.game.add.tilemap('level2'); 
	this.map.addTilesetImage('Wall','Wall');
    this.map.setCollisionBetween(1,9);
     
        this.wall = this.map.createLayer('Tile Layer 1');
        this.wall.resizeWorld(); 
 


 //Endgame goal
 this.goal = this.game.add.sprite(352,416,'goal'); 
 this.goal.animations.add('squiggly');
  this.game.physics.enable(this.goal, Phaser.Physics.ARCADE);
  this.goal.body.setSize(64, 64, 0, 0);
  this.goal.anchor.setTo(.5,.5);
  this.goal.body.immovable = true;

 
 //
 
 
 //adding player to map
 createBullets();
  	 this.player = this.game.add.sprite(1952,1248,'player'); 
  	 this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  	 this.player.anchor.setTo(.5,.5);
  	 this.player.body.setSize(60, 60, 0, 0);
  	 this.player.collideWorldBounds = true;
  	 this.player.animations.add('walk');	    
 	 this.game.camera.follow(this.player);
 	 
 	 

 

  
  //keyboard and mouse control
 	cursors = {
                up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
                down:this.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
 	this.QKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
this.EKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
 	
    


///adding enemies to map

this.enemies.push(new Enemy(0, functionRUBI, functionRUBI.enemyBullets, "follower", 1952,608));
this.enemies.push(new Enemy(1, functionRUBI, functionRUBI.enemyBullets, "follower", 1600, 288));
this.enemies.push(new Enemy(2, functionRUBI, functionRUBI.enemyBullets, "follower", 1792, 64));
this.enemies.push(new Enemy(3, functionRUBI, functionRUBI.enemyBullets, "follower", 1408, 64));
this.enemies.push(new Enemy(4, functionRUBI, functionRUBI.enemyBullets, "follower", 960, 864));
this.enemies.push(new Enemy(5, functionRUBI, functionRUBI.enemyBullets, "follower", 960, 1184));
this.enemies.push(new Enemy(6, functionRUBI, functionRUBI.enemyBullets, "follower", 640, 64));
this.enemies.push(new Enemy(7, functionRUBI, functionRUBI.enemyBullets, "follower", 224, 64));
this.enemies.push(new Enemy(8, functionRUBI, functionRUBI.enemyBullets, "follower", 448, 224));
this.enemies.push(new Enemy(9, functionRUBI, functionRUBI.enemyBullets, "follower", 64, 416));
this.enemies.push(new Enemy(10, functionRUBI, functionRUBI.enemyBullets, "follower", 544, 672));
this.enemies.push(new Enemy(11, functionRUBI, functionRUBI.enemyBullets, "follower", 288, 1120));


this.enemies.push(new Enemy(12, functionRUBI, functionRUBI.enemyBullets, "mildew", 1386, 1107 ));
this.enemies.push(new Enemy(13, functionRUBI, functionRUBI.enemyBullets, "mildew", 1217, 844 ));
this.enemies.push(new Enemy(14, functionRUBI, functionRUBI.enemyBullets, "mildew", 1382, 944 ));
this.enemies.push(new Enemy(15, functionRUBI, functionRUBI.enemyBullets, "mildew", 675, 1176 ));
this.enemies.push(new Enemy(16, functionRUBI, functionRUBI.enemyBullets, "mildew", 110, 1186 ));
this.enemies.push(new Enemy(17, functionRUBI, functionRUBI.enemyBullets, "mildew", 735, 917));
this.enemies.push(new Enemy(18, functionRUBI, functionRUBI.enemyBullets, "mildew", 92,781 ));
this.enemies.push(new Enemy(19, functionRUBI, functionRUBI.enemyBullets, "mildew", 720,492 ));
this.enemies.push(new Enemy(20, functionRUBI, functionRUBI.enemyBullets, "mildew", 1216, 671 ));
this.enemies.push(new Enemy(21, functionRUBI, functionRUBI.enemyBullets, "mildew", 1552,524 ));
this.enemies.push(new Enemy(22, functionRUBI, functionRUBI.enemyBullets, "mildew", 1532,1080 ));
this.enemies.push(new Enemy(23, functionRUBI, functionRUBI.enemyBullets, "mildew", 1052,87 ));


this.enemyGroup = this.game.add.group();

	for (var i = 0; i < this.enemies.length; i++) {
	var addenemy = this.enemies[i].sprite;
	this.enemyGroup.add(addenemy);
  	}  
  	
  	 //particle collision with wall
 this.emitHitWall = functionRUBI.game.add.emitter(0,0,500);
this.emitHitWall.makeParticles('spark');
  	
  	
//implementing GUI////
	this.background = this.game.add.sprite(0,0,'screenOverlay');
	this.background.width =800;
	this.background.height =600;
	this.background.fixedToCamera = true;
   this.background.cameraOffset.setTo(0, 0);
   
    
 this.gui = this.game.add.sprite(0,0,'GUI'); 
 this.gui.anchor.setTo(.5,.5);
 this.player.addChild(this.gui);
 
 this.textArray1 = [];
	this.textArray1[0] = 'int'; 
	this.textArray1[1] = 'string'; 
	this.textArray1[2] = 'double'; 
	this.textArray1[3] = 'float'; 
	this.textArray1[4] = 'boolean';
 
 this.healthText = this.game.add.text(0, 0, '{rubucks:'+rubiHealth.rubucks+'}', { font: " 18px Courier", fill: "#2EFE2E" });
   this.healthText.fixedToCamera = true;
  

this.dataTypeText = this.game.add.text(0, 0, '{dataType: '+this.textArray1[ globalVar.gunVar]+'}', { font: " 18px Courier", fill: "#2EFE2E" });
this.dataTypeText.fixedToCamera = true;
  
   
   this.enemyText = this.game.add.text(0, 0, '{enemyHealth: NULL}', { font: " 18px Courier", fill: "#2EFE2E" });
this.enemyText.fixedToCamera = true;

 this.healthText.cameraOffset.setTo(320, 17);
 this.enemyText.cameraOffset.setTo(70, 17);
   this.dataTypeText.cameraOffset.setTo(530, 17);


  },
  update: function() {
  	updateMusic();
  	
  		if (rubiHealth.rubucks <= 0) {
  		rubiHealth.dead = true;
  		this.endGame();
  	}
  	

  	 
  	//////////////////// //COLLISION//////////////////////////////////////////
  	//player/enemy collsion with wall
    this.game.physics.arcade.collide(this.player, this.wall);
     this.game.physics.arcade.collide(this.enemyGroup, this.wall);
     this.game.physics.arcade.collide(this.enemyGroup, this.goal);
     
     //player collsion with goal
     this.game.physics.arcade.overlap(this.player,this.goal, this.endGame, null, this);
     
    //enemy collision with rubi bullet
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.intBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.doubleBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.floatBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.stringBullets, this.hitEnemy, null, this);
	this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.emitSBullets,  this.hitEnemy, null, this);
	this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.booleanBullets, this.hitEnemy, null, this);
     
     //bullet collsion with wall
    this.game.physics.arcade.overlap(functionRUBI.intBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.doubleBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.floatBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.stringBullets, this.wall, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.emitSBullets, this.wall, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.wall, this.killBullet, null, this);


	// enemy bullet collision with player
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.player, this.hitRUBI, null, this);

	//enemy collsion with enemy
	this.game.physics.arcade.collide(this.enemyGroup, this.enemyGroup);


	filterUpdate();
  
  //////////Enemy update function////////////	
  this.enemiesAlive = 0;

	for(var z = 0; z < this.enemies.length; z++)
	{
		if(this.enemies[z].type == 'spawner')
		{

			if(this.enemies[z].trueSpawn == true) {
				
				this.enemies.push(new Enemy(this.enemies.length, functionRUBI, functionRUBI.enemyBullets, "follower", this.enemies[z].x, this.enemies[z].y));
				var addenemy = this.enemies[this.enemies.length-1].sprite;
				this.enemyGroup.add(addenemy);
				//this.enemies[z].currSpawn++;
				this.enemies[z].trueSpawn = false;
				this.enemies[z].sprite.bringToTop();
			}
			
		}
	}
    for (var i = 0; i < this.enemies.length; i++)
    {
        if (this.enemies[i].alive)
        {
            this.enemiesAlive++;
            this.enemies[i].update(this.player);
            
            
          console.log("array: "+ this.enemies.length);
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
       this.QKey.onDown.add(bulletSwitch,this);
     globalVar.swap = 0;
    this.EKey.onDown.add(bulletSwitch,this);
     globalVar.swap = 0;
    
    
    //shoots each type of bullet
     if (this.game.input.activePointer.isDown) {
     	adjustRate( globalVar.gunVar);
     	if ( globalVar.gunVar==0){
    		intFire(this.player);
    	}else if( globalVar.gunVar==1){
    		stringFire(this.player);
    	} else if ( globalVar.gunVar ==2){
    		doubleFire(this.player);
    	}else if ( globalVar.gunVar ==3){
    		floatFire(this.player);
    	}
    	else if( globalVar.gunVar ==4){
    		booleanFire(this.player);
    	}
        
    }
    
   ///Switching of frames of the glowing thing around RUBI & the text
    this.healthText.text = '{rubucks: '+rubiHealth.rubucks+'}';
    if(rubiHealth.rubucks>100){
    	this.healthText.fill = "#2EFE2E"; 
    } else {
    	this.healthText.fill = "#FF7F7F"; 
    }
    
     this.dataTypeText.text= '{dataType: '+this.textArray1[ globalVar.gunVar]+'}';
     this.gui.frame=  globalVar.gunVar;
    
    //fades away bullet explosions & other animation details
     this.emitHitWall.forEachAlive(function(p){
		p.alpha= p.lifespan / 500;
	});
	 functionRUBI.emitSBullets.forEachAlive(function(p){
		p.alpha= p.lifespan / 1000;
	});
	functionRUBI.emitBoolean.forEachAlive(function(p){
		p.alpha= p.lifespan / 500;
	});
	this.goal.animations.play('squiggly',6);
	
  },
  

  ///////kills bullets if it touches a wall//////
  killBullet: function(bullet,wall){
  	wallAudio.play();
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,500,null,10);	
 	 bullet.kill();  	
  },
  
  /////decrements RUBI's health when enemy bullet hits her///////
  hitRUBI: function(wall,bullet){
  		if(functionRUBI.floatBullets.countLiving()>0){
  		var floatBullet = functionRUBI.floatBullets.getFirstAlive();
  		floatBullet.kill();
  		float2Audio.play();
  	} else{
  		hurtAudio.play();
  	rubiHealth.rubucks -=40;
  	}
  	
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,500,null,10);	
  	bullet.kill();  	
  	if (rubiHealth.rubucks <= 0) {
  		rubiHealth.dead = true;
  		this.endGame();
  	}
  },
  
 ///////kills enemy if bullet hit enemy//////
  hitEnemy: function(enemy,bullet){
		
	bulletDamage = getBulletDamage(bullet);	
	
	enemy.health -= bulletDamage+rubiUpgrade.damage;
	
	if(enemy.health<=0){
		enemyHurtAudio.play();
		enemy.health =0;
	} else{
		followerHurtAudio.play();
		
	}

	this.enemyText.text = '{enemyHealth: '+enemy.health+'}';
	
	if(bullet.key == 'stringBullet'){
		stringExplosion(bullet);
	}
	
	if (enemy.health <= 0)
    {
    	endLevel.enemyBucks += getEnemyValue(enemy);
        enemy.alive = false;
        enemy.kill();
        
    }
	
	this.emitHitWall.x = enemy.x;
		this.emitHitWall.y = enemy.y;
		this.emitHitWall.start(true,500,null,10);
  	bullet.kill();		
  },
  
  /////////endgame/////////////////
  endGame: function(){
  	fadeoutMus(easylevelMusic);
  	checkLevel.level2 = true;
  	endLevel.levelFin = 2;
  	functionRUBI.RUBIBullets.destroy(true);
  	this.enemyGroup.destroy(true);
  	this.game.state.start('EndGame');
  },
  
  
  
  //debug functions
render: function(){
		this.game.debug.text('',100,100);
/*	 this.game.debug.text("DEBUGTEXT",100,100);
	 this.game.debug.text(" globalVar.gunVar "+ globalVar.gunVar,100,120);
	 this.game.debug.text("gunrate "+fireRate,100,140 );
	  this.game.debug.text("Px "+this.player.x,100,160);
	   this.game.debug.text("Py "+this.player.y,100,180);
	 //  this.game.debug.body(this.player);
	 this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),100,200);
	*/
	
	},

};

