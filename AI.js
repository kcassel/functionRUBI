// The enemy class that allows for the 
// creation of enemies.
// In game.js, add each enemy type to the game.add.group()

// enemy objects



Enemy = function (index, gameName, bullets, type, x, y) {
	
	this.x = x;
	this.y = y;
	
    this.gameName = gameName;

    this.bullets = bullets;
    this.fireRate = 0; // change this based on each enemy
    this.nextFire = 0;
    this.alive = true;
	
	// changes the enemyType based on what was inputted
	switch(type) {
		case "slime":
			this.type = "slime";
			this.health = 30;
			this.sprite = gameName.game.add.sprite(x, y, 'slime');
			this.radius = 300;
			this.fireRate = 1000;
			this.speed = 0; // change 
			this.sprite.health = 30;
			break;
		case "follower":
			this.type = "follower";
			this.health = 10;
			this.sprite = gameName.game.add.sprite(x, y, 'follower');
			this.radius = 400;
			this.speed = 150; // change
			this.sprite.health = 10;
			this.emit = functionRUBI.game.add.emitter(0,0,250);
			this.emit.makeParticles('spark');
			break;
		case "mildew":
			this.type = "mildew";
			this.fireRate = 1000;
			this.health = 50;
			this.radius = 500;
			this.sprite = gameName.game.add.sprite(x, y, 'mildew');
			this.speed = 100; // change
				this.sprite.health = 40;
			break;
		case "spawner":
			this.type = "spawner";
			this.fireRate = 800;
			this.health = 100;
			this.radius = 500;
			this.sprite = gameName.game.add.sprite(x, y, 'spawner');
			this.speed = 0; // doesn't move
			this.maxSpawned = 50; // the maximum number of followers that can be spawned
			this.currSpawned = 0;
			this.followerArray = [];
				this.sprite.health = 150;
			this.trueSpawn = false;
			break;
		case "serpent":
			this.type = "serpent";
			this.fireRate = 1000;
			this.health = 200;
			this.radius = 400;
			this.sprite = gameName.game.add.sprite(x, y, 'serpent');
			this.speed = 100;
			this.parts = 0;
			this.partsArr = [];
			this.maxParts = 5;
			break;
			
	}
	
    this.sprite.anchor.set(0.5);

    this.sprite.name = index.toString();
    gameName.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    // only the follower will be moving. the rest won't
    if (type == "follower" || type == "slime" ) {
    	this.sprite.body.immovable = false;
    } else {
    	this.sprite.body.immovable = true;	
    }
	
	  
    //Animation Control
    if(type=="mildew"){
    	this.sprite.animations.add('shoot');
    }
    if(type =="follower"){
    	this.sprite.animations.add('walk',[0,1]);
    	this.sprite.animations.add('death',[2,3,4]);
    }
    if(type =="slime"){
    	this.sprite.animations.add('shoot');
    }
    if(type=="spawner"){
    	this.sprite.animations.add('spawn');
    }
    if(type =="serpent"){
    	this.sprite.animations.add('walk');
    }
   this.sprite.animations.killOnComplete = true;
    
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);

	// randomizes the angle that they move in
    this.sprite.angle = gameName.game.rnd.angle();

	// makes enemies move around randomly sort of
    gameName.game.physics.arcade.velocityFromRotation(this.sprite.rotation, 0, this.sprite.body.velocity);
};


Enemy.prototype.update = function(player) {
	

    this.sprite.rotation = functionRUBI.game.physics.arcade.angleBetween(this.sprite, player)-((Math.PI/2)+functionRUBI.game.math.degToRad(-180));
	
	// if the player gets within the enemy radius, then each enemy
	// will respond respectively
	// change the 1000 to this.radius;
    if (functionRUBI.game.physics.arcade.distanceBetween(this.sprite, player) < this.radius) {
    	
    	if(this.type == "follower") {
			this.sprite.animations.play('walk', 16);
    		// the speed at which the follower moves towards the object, 1000 == 1 second
    		functionRUBI.game.physics.arcade.moveToObject(this.sprite, player, this.speed);
        	
        	// if the enemy gets too close to the player, explode and deal damage
        	if(functionRUBI.game.physics.arcade.distanceBetween(this.sprite, player) < 20) {
	        	
	        	if(this.sprite.alive == true){
	        		
		        	rubiHit(this.type);
		        	
		        	this.emit.x = player.x;
					this.emit.y = player.y;
					this.emit.start(true,500,null,10);
					
		        	
		        	this.sprite.kill();
	        	} 
        	}
        	
        	
        	
    	} else if(this.type == "mildew") {
    		
    		// shoot at the player
    		if (functionRUBI.game.time.now > this.nextFire && this.bullets.countDead() > 0 && this.sprite.alive == true) {
    				this.sprite.animations.play('shoot', 16);
    			// time to shoot the next bullet, based on the enemy fireRate
	            this.nextFire = functionRUBI.game.time.now + this.fireRate;
				
				// creates the bullets
	            var bullet = this.bullets.getFirstDead();
	            
	            bullet.reset(this.sprite.x, this.sprite.y);
	            
	            // deals with speed of bullet and what its heading towards
	            bullet.rotation = functionRUBI.game.physics.arcade.moveToObject(bullet, player, 500);
	        }
    	} else if(this.type == "slime") {
    		if (functionRUBI.game.time.now > this.nextFire && this.bullets.countDead() > 0 && this.sprite.alive == true) {
    			this.sprite.animations.play('shoot', 16);
    			// time to shoot the next bullet, based on the enemy fireRate
	            this.nextFire = functionRUBI.game.time.now + this.fireRate;
				
				
				
				// creates the bullets, and loads 10 of them into an array
	            var bullet1 = functionRUBI.enemyBullets.getFirstDead();
	            bullet1.reset(this.sprite.x, this.sprite.y);
	            var bullet2 = functionRUBI.enemyBullets.getFirstDead();
	            bullet2.reset(this.sprite.x, this.sprite.y);
				var bullet3 = functionRUBI.enemyBullets.getFirstDead();
				bullet3.reset(this.sprite.x, this.sprite.y);
	            var bullet4 = functionRUBI.enemyBullets.getFirstDead();
	            bullet4.reset(this.sprite.x, this.sprite.y);
	            var bullet5 = functionRUBI.enemyBullets.getFirstDead();
	            bullet5.reset(this.sprite.x, this.sprite.y);
	            var bullet6 = functionRUBI.enemyBullets.getFirstDead();
	            bullet6.reset(this.sprite.x, this.sprite.y);
	            var bullet7 = functionRUBI.enemyBullets.getFirstDead();
	            bullet7.reset(this.sprite.x, this.sprite.y);
	            var bullet8 = functionRUBI.enemyBullets.getFirstDead();
	         	bullet8.reset(this.sprite.x, this.sprite.y);
	            
	            // deals with speed of bullet and what its heading towards
	            bullet1.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet1, this.x, 0, this.fireRate); // up
	            bullet2.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet2, 0, this.y, this.fireRate); // down
	            bullet3.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet3, 8000, this.y, this.fireRate); // right
	            bullet4.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet4, this.x, 6000, this.fireRate); // down
	            bullet5.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet5, this.x + this.radius, 
	            	this.y + this.radius, this.fireRate);
	            bullet6.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet6, this.x - this.radius, 
	            	this.y - this.radius , this.fireRate);
	            bullet7.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet7, this.x - this.radius,
	            	 this.y + this.radius, this.fireRate);
	            bullet8.rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet8, this.x + this.radius,
	            	this.y - this.radius, this.fireRate);
	       }
    	} else if(this.type == "spawner") {
    		if (functionRUBI.game.time.now > this.nextFire && this.bullets.countDead() > 0 && 
    			this.sprite.alive == true && this.maxSpawned > this.currSpawned) {
    				this.sprite.animations.play('spawn', 8);
    			
    			this.trueSpawn = true;
		    	// time to shoot the next follower, based on the enemy fireRate
			    this.nextFire = functionRUBI.game.time.now + this.fireRate;
			        console.log("BITCHIN");
			    // creates a new enemy
		        this.followerArray[this.currSpawned] = new Enemy(this.currSpawned+20, functionRUBI, functionRUBI.enemyBullets, "follower", this.x, this.y + 10);
				this.currSpawned++;
				
				console.log(this.currSpawned);
    		}
    		
    	} else if(this.type == "serpent") {
    		if (functionRUBI.game.time.now > this.nextFire && this.bullets.countDead() > 0 && 
    			this.sprite.alive == true && this.maxParts > this.parts) {
    			
		    	// time to shoot the next follower, based on the enemy fireRate
			    this.nextFire = functionRUBI.game.time.now + this.fireRate;
			        
			    
    		}
    	}
        
    } else {
    	// patrol
    	//this.patrol();
    }
   
};

Enemy.prototype.createBullets = function() {
	
	//mildew Bullets
	functionRUBI.mildewBullets = functionRUBI.game.add.group();
	functionRUBI.mildewBullets.enableBody = true;
	functionRUBI.mildewBullets.physicsBodyType = Phaser.Physics.ARCADE;
	functionRUBI.mildewBullets.setAll('checkWorldBounds', true);
	functionRUBI.mildewBullets.setAll('outOfBoundsKill', true);
	functionRUBI.mildewBullets.createMultiple(50, 'mildewBullets');
};

Enemy.prototype.patrol = function() {
	// move in linear directions,
		// if about to hit a wall, go the other direction
		// else keep moving
	var temp = Math.floor(Math.random()*11) % 2;


	// functionRUBI.game.physics.arcade.moveToObject(this.sprite, player, this.speed);
	// the two options of patroling
		// either move the radius moving horizontally
			// or vertically.
	if(temp == 0) {
		functionRUBI.game.physics.arcade.accelerateToXY(this.sprite, this.x+this.radius, this.y, 20);
	} else {
		functionRUBI.game.physics.arcade.accelerateToXY(this.sprite, this.x, this.y+this.radius, 20);
	}
	
	
};
