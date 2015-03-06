var functionRUBI = functionRUBI || {};


functionRUBI.level1 = function(){};

functionRUBI.level1.prototype = {
	
	//load this level's specific map
 preload: function(){
 	this.load.tilemap('level1', 'assets/world/level1/Lvl1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Wall', 'assets/world/level1/walledges.png'); 	
 	
 },
	
	
  create: function() {
gunVar = 0;

 //local variables for enemies
 this.enemies = [];
 this.enemiesAlive;
 this.enemiesTotal;
 

 
 ///////////// Implementing map stuff///////////// 
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  createBackground();
  	  
 /////////////////////////////////////////////////////////////////////////////////////////////////////CHANGE 	  
	this.map = this.game.add.tilemap('level1'); 
	this.map.addTilesetImage('Wall','Wall');
    this.map.setCollisionBetween(1,9);
     
        this.wall = this.map.createLayer('Tile Layer 1');
        this.wall.resizeWorld(); 
 


 //Endgame goal
 this.goal = this.game.add.sprite(425,335,'goal'); 
 this.goal.animations.add('squiggly');
  this.game.physics.enable(this.goal, Phaser.Physics.ARCADE);
  this.goal.body.setSize(64, 64, 0, 0);
  this.goal.anchor.setTo(.5,.5);
  this.goal.body.immovable = true;

 
 //
 
 
 //adding player to map
 createBullets();
  	 this.player = this.game.add.sprite(520,619,'player'); 
  	 this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  	 this.player.anchor.setTo(.5,.5);
  	 this.player.body.setSize(45, 50, 0, 0);
  	 this.player.collideWorldBounds = true;
  	 this.player.animations.add('walk');	    
 	 this.game.camera.follow(this.player);
 	 
 	 
 //particle collision with wall
 this.emitHitWall = functionRUBI.game.add.emitter(0,0,500);
this.emitHitWall.makeParticles('spark');
  	  
 //implementing GUI////
 this.gui = this.game.add.sprite(0,0,'GUI'); 
 this.gui.anchor.setTo(.5,.5);
 this.player.addChild(this.gui);
 
 this.healthText = this.game.add.text(-34, 34, 'rubucks:'+rubiHealth.rubucks, { font: " 16px Courier", fill: "#2EFE2E" });
this.player.addChild(this.healthText);

this.textArray1 = [];
	this.textArray1[0] = 'int'; 
	this.textArray1[1] = 'string'; 
	this.textArray1[2] = 'double'; 
	this.textArray1[3] = 'float'; 
	this.textArray1[4] = 'boolean';

this.dataTypeText = this.game.add.text(-34, 44, 'dataType: '+this.textArray1[gunVar], { font: " 14px Courier", fill: "#2EFE2E" });
this.player.addChild(this.dataTypeText);
 
 /////////////////////////////
 
 

  
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
this.enemies.push(new Enemy(16, functionRUBI, functionRUBI.enemyBullets, "spawner", 600,619));



this.enemyGroup = this.game.add.group();

	for (var i = 0; i < this.enemies.length; i++) {
	var addenemy = this.enemies[i].sprite;
	this.enemyGroup.add(addenemy);
  	}  
  	
//	this.background = this.game.add.sprite(this.player.x,this.player.y,'screenOverlay');
	//this.background.width =800;
	//this.background.height =600;
  },
  update: function() {
  //	this.background.x = this.game.camera.x;
  //	this.background.y = this.game.camera.y;
  	 
  	 
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
      this.EKey.onDown.add(bulletSwitch,this);
    
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
    	else if(gunVar ==4){
    		booleanFire(this.player);
    	}
        
    }
    
    
    ///Switching of frames of the glowing thing around RUBI & the text
    this.healthText.text = 'rubucks:'+rubiHealth.rubucks;
     this.dataTypeText.text= 'dataType: '+this.textArray1[gunVar];
     this.gui.frame= gunVar;
    
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
  	
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,500,null,10);	
 	 bullet.kill();  	
  },
  
  /////decrements RUBI's health when enemy bullet hits her///////
  hitRUBI: function(wall,bullet){
  	rubiHealth.rubucks -=10;
  	
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
	
	console.log(enemy.health);
	
	if (enemy.health <= 0)
    {
    	endLevel.enemyBucks += getEnemyValue(enemy);
    	this.emitHitWall.x = enemy.x;
		this.emitHitWall.y = enemy.y;
		this.emitHitWall.start(true,500,null,10);
        enemy.alive = false;
        enemy.kill();
        
    }

  	bullet.kill();		
  },
  
  
  /////////endgame/////////////////
  endGame: function(){
  	endLevel.levelFin = 1;
  	endLevel.levelGun = 1;

  	functionRUBI.RUBIBullets.destroy(true);
  	this.enemyGroup.destroy(true);
  	this.game.state.start('EndGame');
  },
  
  
  
  //debug functions
render: function(){
	 this.game.debug.text("DEBUGTEXT",100,100);
	 this.game.debug.text("gunVar "+gunVar,100,120);
	 this.game.debug.text("gunrate "+fireRate,100,140 );
	  this.game.debug.text("Px "+this.player.x,100,160);
	   this.game.debug.text("Py "+this.player.y,100,180);
	 //  this.game.debug.body(this.player);
	 this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),100,200);
	
	},

};

