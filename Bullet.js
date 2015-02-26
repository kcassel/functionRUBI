//This is RUBI's bullet control class
//For now, use the spacebar to switch between bullets
//types of bullets
// intFire - shoots in a straight line towards pointer
// doubleFire - shotgun effect where two bullets are fired with a slower rate.
// stringFire - sends out a slow bullet that explodes after two seconds

// booleanFire - drops a mine-like object that when enemies step on it, explode
// charFire - sends out a mini shooter that shoots enemies for you

// floatFire - sends out a circles of bullets that wraps around you like a shield
// longFire - BADASS WEAPON. SUPER STRONG. PROBABLY DOES SOMETHING BADASS

var fireRate = 200;
var nextFire =0;

var gunVar =0;


//the array for which the different rates of fire are stored
var rateArray = [];
rateArray[0] = 200; //int
rateArray[1] = 600; //double
rateArray[2] = 450; //string
rateArray[3] = 500; //float

function createBullets(){
	
//int Bullets
functionRUBI.intBullets = functionRUBI.game.add.group();
functionRUBI.intBullets.enableBody = true;
functionRUBI.intBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.intBullets.setAll('checkWorldBounds', true);
functionRUBI.intBullets.setAll('outOfBoundsKill', true);
functionRUBI.intBullets.createMultiple(50, 'intBullet');

//double Bullets
functionRUBI.doubleBullets = functionRUBI.game.add.group();
functionRUBI.doubleBullets.enableBody = true;
functionRUBI.doubleBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.doubleBullets.setAll('checkWorldBounds', true);
functionRUBI.doubleBullets.setAll('outOfBoundsKill', true);
functionRUBI.doubleBullets.createMultiple(100, 'doubleBullet');

//string Bullets
functionRUBI.stringBullets = functionRUBI.game.add.group();
functionRUBI.stringBullets.enableBody = true;
functionRUBI.stringBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.stringBullets.setAll('checkWorldBounds', true);
functionRUBI.stringBullets.setAll('outOfBoundsKill', true);
functionRUBI.stringBullets.createMultiple(10, 'stringBullet');
functionRUBI.emitSBullets = functionRUBI.game.add.emitter(0,0,30);
functionRUBI.emitSBullets.makeParticles('stringBullet');

//float Bullets
functionRUBI.floatBullets = functionRUBI.game.add.group();
functionRUBI.floatBullets.enableBody = true;
functionRUBI.floatBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.floatBullets.setAll('checkWorldBounds', true);
functionRUBI.floatBullets.setAll('outOfBoundsKill', true);
functionRUBI.floatBullets.createMultiple(5, 'booleanBullet'); //CHANGE THIS TO FLOAT SOON

functionRUBI.RUBIBullets = functionRUBI.game.add.group();
/*functionRUBI.RUBIBullets.enableBody = true;
functionRUBI.RUBIBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.RUBIBullets.setAll('checkWorldBounds', true);
functionRUBI.RUBIBullets.setAll('outOfBoundsKill', true);*/


functionRUBI.RUBIBullets.add(functionRUBI.intBullets);
functionRUBI.RUBIBullets.add(functionRUBI.doubleBullets);
functionRUBI.RUBIBullets.add(functionRUBI.stringBullets);
functionRUBI.RUBIBullets.add(functionRUBI.emitSBullets);
functionRUBI.RUBIBullets.add(functionRUBI.floatBullets);


/////////////ENEMY BULLETS////////////
functionRUBI.enemyBullets = functionRUBI.game.add.group();
    functionRUBI.enemyBullets.enableBody = true;
    functionRUBI.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    functionRUBI.enemyBullets.createMultiple(100, 'mildewBullets');
    
    functionRUBI.enemyBullets.setAll('anchor.x', 0.5);
    functionRUBI.enemyBullets.setAll('anchor.y', 0.5);
    functionRUBI.enemyBullets.setAll('outOfBoundsKill', true);
    functionRUBI.enemyBullets.setAll('checkWorldBounds', true);




}

//Controls which bullets to be fire
function bulletSwitch(){
	if (gunVar==0){
    		gunVar=1;
    	}else if (gunVar==1){
    		gunVar=2;
    	}else if (gunVar ==2){
    		gunVar=3;
    	}else if(gunVar==3){
    		gunVar=0;	    		
    }
}

//adjusts the rates of fire depending on switch bullets are being fired
function adjustRate(index){
	fireRate = (rateArray[index]-rubiUpgrade.rateoffire);
}


//intFire - shoots in a straight line towards pointer
function intFire(player) {

    if (functionRUBI.game.time.now > nextFire && functionRUBI.intBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;

        var bullet = functionRUBI.intBullets.getFirstDead();
       // functionRUBI.RUBIBullets.add(bullet);		
		bullet.reset(player.x,player.y);
		bullet.rotation = player.rotation;
		bullet.anchor.setTo(.5, .5);
		bullet.body.setSize(8, 8, 0, 0);
        functionRUBI.game.physics.arcade.moveToPointer(bullet, 1000);
        return bullet;
    }
    return null;
  }
 
//doubleFire - shotgun effect where two bullets are fired with a slower rate.  
function doubleFire(player){
	 if (functionRUBI.game.time.now > nextFire && functionRUBI.intBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;

		//get two dead bullets, reset to face pointer
        var bullet1 = functionRUBI.doubleBullets.getFirstDead();
        bullet1.reset(player.x, player.y);
        var bullet2 = functionRUBI.doubleBullets.getFirstDead();
		bullet2.reset(player.x,player.y);
		bullet1.rotation = player.rotation;
		bullet2.rotation = player.rotation;
		bullet1.anchor.setTo(.5, .5);
		bullet2.anchor.setTo(.5, .5);
		bullet1.body.setSize(8, 8, 0, 0);
		bullet2.body.setSize(8, 8, 0, 0);
		
		//move both bullets in angle to each other		
		bullet1.body.velocity.x = Math.cos(bullet1.rotation+(-110*(Math.PI/180))) * 600;
        bullet1.body.velocity.y = Math.sin(bullet1.rotation+(-110*(Math.PI/180))) * 600;
        
		bullet2.body.velocity.x = Math.cos(bullet2.rotation+(-70*(Math.PI/180))) * 600;
        bullet2.body.velocity.y = Math.sin(bullet2.rotation+(-70*(Math.PI/180))) * 600;

    }	
}

//stringFire - sends out a slow bullet that explodes after two seconds
function stringFire(player){
if (functionRUBI.game.time.now > nextFire && functionRUBI.stringBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;

        var bullet = functionRUBI.stringBullets.getFirstDead();		
		bullet.reset(player.x,player.y);
		bullet.rotation = player.rotation;
		//bullet.anchor.setTo(.5, .5);
		//bullet.body.setSize(8, 8, 0, 0);
		functionRUBI.game.time.events.add(Phaser.Timer.SECOND * 1, stringExplosion, this); 
        functionRUBI.game.physics.arcade.moveToPointer(bullet, 100);
  		
    }
	
}

//code for the explosion of stringFire
function stringExplosion(){
	if(functionRUBI.stringBullets.countLiving()>0){
	var bullet = functionRUBI.stringBullets.getFirstAlive();
		var bx = bullet.x;
		var by = bullet.y;
		functionRUBI.emitSBullets.x = bx;
		functionRUBI.emitSBullets.y = by;
		functionRUBI.emitSBullets.start(true,1000,null,10);	
		bullet.kill();
	}
}

// floatFire - sends out a circles of bullets that wraps around you like a shield
function floatFire(player) {
    if (functionRUBI.game.time.now > nextFire && functionRUBI.floatBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;
        var bullet = functionRUBI.floatBullets.getFirstDead();
    //    bullet.position.set(0, 0);
    //   bullet.pivot.set(0,0);
        bullet.reset(player.x,player.y);
        bullet.anchor.setTo(0, 2);	
       //player.addChild(bullet);	
       
		
    }
  }
 
//code to rotate the float bullets 
 function floatRotate(bullet){
 	//bullet.x = globalVar.playerX;
 	//bullet.y = globalVar.playerY;
 	globalVar.test =bullet.rotation;
 	//bullet.rotation += .1;
 	bullet.rotation = bullet.rotation+(5* (Math.PI/180));
 	
 } 
 
 function floatMove(bullet){
 	bullet.body.velocity.x = 0;
 	bullet.body.velocity.y = 0;

    if (cursors.up.isDown){
        bullet.body.velocity.y = -300;
    } else if (cursors.down.isDown){
         bullet.body.velocity.y = 300;
    }

    if (cursors.left.isDown){
        bullet.body.velocity.x = -300;
    }else if (cursors.right.isDown){
         bullet.body.velocity.x = 300;
    }
 }
  
  
