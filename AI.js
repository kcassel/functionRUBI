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
			this.radius = 500;
			this.fireRate = 1000;
			break;
		case "follower":
			this.type = "follower";
			this.health = 10;
			this.sprite = gameName.game.add.sprite(x, y, 'follower');
			this.radius = 200;
			break;
		case "mildew":
			this.type = "mildew";
			this.fireRate = 1000;
			this.health = 50;
			this.radius = 500;
			this.sprite = gameName.game.add.sprite(x, y, 'mildew');
			break;
	}
	
    this.sprite.anchor.set(0.5);

    this.sprite.name = index.toString();
    gameName.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    if (type == "follower"){
    this.sprite.body.immovable = false;
    } else{
    this.sprite.body.immovable = true;	
    }
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);

	// randomizes the angle that they move in
    this.sprite.angle = gameName.game.rnd.angle();

	// makes enemies move slightly
    gameName.game.physics.arcade.velocityFromRotation(this.sprite.rotation, 0, this.sprite.body.velocity);
};

Enemy.prototype.damage = function() {

    --this.health;
    
    if (this.health <= 0)
    {
        this.alive = false;
        this.sprite.kill();

        return true;
    }

    return false;
};

Enemy.prototype.update = function(player) {
	

    this.sprite.rotation = functionRUBI.game.physics.arcade.angleBetween(this.sprite, player);
	
	// if the player gets within the enemy radius, then each enemy
	// will respond respectively
	// change the 1000 to this.radius;
    if (functionRUBI.game.physics.arcade.distanceBetween(this.sprite, player) < this.radius) {
    	
    	if(this.type == "follower") {
    		// the speed at which the follower moves towards the object, 1000 == 1 second
    		functionRUBI.game.physics.arcade.moveToObject(this.sprite, player, 150);
        	
        	// if the enemy gets too close to the player, explode and deal damage
        	if(functionRUBI.game.physics.arcade.distanceBetween(this.sprite, player) < 10) {
	        	
	        	
	        	if(this.sprite.alive == true){
	        	rubiHit(this.type);
	        	this.sprite.kill();
	        	} 
        	}
        	
        	
        	
    	} else if(this.type == "mildew") {
    		
    		// shoot at the player
    		if (functionRUBI.game.time.now > this.nextFire && this.bullets.countDead() > 0 && this.sprite.alive ==true) {
    			
    			// time to shoot the next bullet, based on the enemy fireRate
	            this.nextFire = functionRUBI.game.time.now + this.fireRate;
				
				// creates the bullets
	            var bullet = this.bullets.getFirstDead();
	            
	            bullet.reset(this.sprite.x, this.sprite.y);
	            
	            // deals with speed of bullet and what its heading towards
	            bullet.rotation = functionRUBI.game.physics.arcade.moveToObject(bullet, player, 500);
	        }
    	} else if(this.type == "slime") {
    		if (functionRUBI.game.time.now > this.nextFire && this.bullets.countDead() > 0 && this.sprite.alive ==true) {
    			
    			// time to shoot the next bullet, based on the enemy fireRate
	            this.nextFire = functionRUBI.game.time.now + this.fireRate;
				
				// creates the bullets, and loads 10 of them into an array
	            var bullet = this.bullets.getFirstDead();
	            var bulletArray = [];
	            
	            bulletArray.push(bullet);
	            bulletArray.push(bullet);
	            bulletArray[0].reset(this.sprite.x, this.sprite.y);
	            bulletArray[1].reset(this.sprite.x, this.sprite.y);
	            
	            // bullet.reset(this.sprite.x, this.sprite.y);
	            
	            // deals with speed of bullet and what its heading towards
	            // bullet.rotation = this.game.physics.arcade.moveToObject(bullet, player, 500);
	            bulletArray[0].rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet, this.x, 0, this.fireRate);
	            bulletArray[1].rotation = functionRUBI.game.physics.arcade.accelerateToXY(bullet, 0, this.y, this.fireRate);
	            // bulletArray[2].rotation = this.game.physics.arcade.accelerateToXY(bullet,this.x, 0, this.fireRate);
	            // bulletArray[3].rotation = this.game.physics.arcade.accelerateToXY(bullet,this.x, 0, this.fireRate);
	            // bulletArray[0].rotation = this.game.physics.arcade.moveToObject(bullet, player, 500);
	        }
    	}
        
    } else {
    	// patrol
    	this.patrol();
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
	
	
	// the two options of patroling
	if(temp == 0) {
		
	} else {
		
	}
	
	
};
