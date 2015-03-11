//This is RUBI's bullet control class
//For now, use the spacebar to switch between bullets
//types of bullets
// intFire - shoots in a straight line towards pointer
// doubleFire - shotgun effect where two bullets are fired with a slower rate.
// stringFire - sends out a slow bullet that explodes after two seconds

// booleanFire - drops a mine-like object that when enemies step on it, explode

// floatFire - sends out a circles of bullets that wraps around you like a shield


var fireRate = 200;
var nextFire =0;

//var  globalVar.gunVar;


//the array for which the different rates of fire are stored
var rateArray = [];
rateArray[0] = 400; //int
rateArray[1] = 600; //double
rateArray[2] = 800; //string
rateArray[3] = 500; //float
rateArray[4] = 500; //boolean

var damageArray = [];
damageArray[0] = 10; //int
damageArray[1] = 20; //double
damageArray[2] = 5; //string
damageArray[3] = 5; //float
damageArray[4] = 30; //boolean



function createBullets(){
// globalVar.gunVar =0;
//int Bullets
functionRUBI.intBullets = functionRUBI.game.add.group();
functionRUBI.intBullets.enableBody = true;
functionRUBI.intBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.intBullets.createMultiple(50, 'intBullet');
functionRUBI.intBullets.setAll(name, 'intBullet');


//double Bullets
functionRUBI.doubleBullets = functionRUBI.game.add.group();
functionRUBI.doubleBullets.enableBody = true;
functionRUBI.doubleBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.doubleBullets.createMultiple(100, 'doubleBullet');

//string Bullets
functionRUBI.stringBullets = functionRUBI.game.add.group();
functionRUBI.stringBullets.enableBody = true;
functionRUBI.stringBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.stringBullets.createMultiple(8, 'stringBullet');
functionRUBI.emitSBullets = functionRUBI.game.add.emitter(0,0,30);
functionRUBI.emitSBullets.makeParticles('stringBullet');


//float Bullets
functionRUBI.floatBullets = functionRUBI.game.add.group();
functionRUBI.floatBullets.enableBody = true;
functionRUBI.floatBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.floatBullets.createMultiple(5, 'floatBullet');

//boolean Bullets
functionRUBI.booleanBullets = functionRUBI.game.add.group();
functionRUBI.booleanBullets.enableBody = true;
functionRUBI.booleanBullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.booleanBullets.createMultiple(5, 'booleanBullet');
functionRUBI.emitBoolean = functionRUBI.game.add.emitter(0,0,500);
functionRUBI.emitBoolean.makeParticles('spark');



functionRUBI.RUBIBullets = functionRUBI.game.add.group();
functionRUBI.RUBIBullets.setAllChildren('checkWorldBounds', true);
functionRUBI.RUBIBullets.setAllChildren('outOfBoundsKill', true);

functionRUBI.RUBIBullets.add(functionRUBI.intBullets);
functionRUBI.RUBIBullets.add(functionRUBI.doubleBullets);
functionRUBI.RUBIBullets.add(functionRUBI.stringBullets);
functionRUBI.RUBIBullets.add(functionRUBI.emitSBullets);
functionRUBI.RUBIBullets.add(functionRUBI.floatBullets);
functionRUBI.RUBIBullets.add(functionRUBI.booleanBullets);

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
function bulletSwitch(check){
	//checks which key is being pressed
	//var num = 0;
	if (check.keyCode==81){
		num = -1;
		globalVar.swap++;
	} else{
		num = 1;
		globalVar.swap++;
	}
	
	
	if (rubiUnlock.level>=1){
	maxGun = rubiUnlock.guns;
	} else{
		maxGun = rubiUnlock.guns;
	}
	
	//console.log("check.keyCode " +check.keyCode);
	//console.log("maxGun"+ maxGun);
	//console.log("num "+num);
//	console.log( globalVar.gunVar);
	
	if(globalVar.swap == 1){
	if( globalVar.gunVar==maxGun){
		if(num==1){
			 globalVar.gunVar = 0;

		} else{
			 globalVar.gunVar = maxGun - 1;

		}
	} else if( globalVar.gunVar==0){
		if(num==1){
			 globalVar.gunVar =  globalVar.gunVar + 1 ;
		//	 console.log('working');
			
		} else{
			 globalVar.gunVar = maxGun;
		}
	} else {
		 globalVar.gunVar =  globalVar.gunVar + num;
	}
	}
//	console.log( globalVar.gunVar);	
	
	
	
	
	//testing
	/*if ( globalVar.gunVar==0){
    		 globalVar.gunVar=1;
    	}else if ( globalVar.gunVar==1){
    		 globalVar.gunVar=2;
    	}else if ( globalVar.gunVar ==2){
    		 globalVar.gunVar=3;
    	}else if( globalVar.gunVar==3){
    		 globalVar.gunVar=4;	    		
    	}else if ( globalVar.gunVar==4){
    		 globalVar.gunVar=0;
    	}
    	*/
}

//adjusts the rates of fire depending on switch bullets are being fired
function adjustRate(index){
	fireRate = (rateArray[index]-rubiUpgrade.rateoffire);
}

//returns the damage that each bullet deals
function getBulletDamage(bullet){
	
	var name = bullet.key;
	var dam;
	
	if (name == 'intBullet'){
		dam = 0;
	} else if (name == "doubleBullet"){
		dam = 1;
	} else if (name == "stringBullet"){
		dam = 2;
	} else if (name == "floatBullet"){
		dam = 3;
	} else if (name == "booleanBullet"){
		dam = 4;	
	}
	
	return damageArray[dam];
}

//returns the enemy rubucks value

function getEnemyValue(enemy){
	var name = enemy.key;
	var val;
	
	if (name == 'slime'){
		val = 50;
	} else if (name == "follower"){
		val = 10;
	} else if (name == "mildew"){
		val = 20;
	} else if (name == "spawner"){
		val = 75;
	} else if (name == "snake"){
		val = 100;	
	}
	
	return val;
}


//intFire - shoots in a straight line towards pointer
function intFire(player) {

    if (functionRUBI.game.time.now > nextFire && functionRUBI.intBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;
		intAudio.play();
        var bullet = functionRUBI.intBullets.getFirstDead();
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
        doubleAudio.play();

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
		bullet1.body.velocity.x = Math.cos(bullet1.rotation+(-95*(Math.PI/180))) * 600;
        bullet1.body.velocity.y = Math.sin(bullet1.rotation+(-95*(Math.PI/180))) * 600;
        
		bullet2.body.velocity.x = Math.cos(bullet2.rotation+(-85*(Math.PI/180))) * 600;
        bullet2.body.velocity.y = Math.sin(bullet2.rotation+(-85*(Math.PI/180))) * 600;

    }	
}

//stringFire - sends out a slow bullet that explodes after two seconds
function stringFire(player){
if (functionRUBI.game.time.now > nextFire && functionRUBI.stringBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;

        var bullet = functionRUBI.stringBullets.getFirstDead();		
		bullet.reset(player.x,player.y);
		bullet.rotation = player.rotation;
		bullet.anchor.setTo(.5, .5);
		bullet.body.setSize(8, 8, 0, 0);
		//functionRUBI.game.time.events.add(Phaser.Timer.SECOND * 1, stringExplosion, this); 
        functionRUBI.game.physics.arcade.moveToPointer(bullet, 200);
  		
    }
	
}

//code for the explosion of stringFire
function stringExplosion(bullet){
//	if(functionRUBI.stringBullets.countLiving()>0){
//	var bullet = functionRUBI.stringBullets.getFirstAlive();

		var bx = bullet.x;
		var by = bullet.y;
		functionRUBI.emitSBullets.x = bx;
		functionRUBI.emitSBullets.y = by;
		functionRUBI.emitSBullets.start(true,1000,null,3);	
	//	bullet.kill();
	//}
}

// floatFire - sends out a circles of bullets that wraps around you like a shield
function floatFire(player) {
    if (functionRUBI.game.time.now > nextFire && functionRUBI.floatBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;
        float1Audio.play();
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
 	bullet.rotation = bullet.rotation+(20* (Math.PI/180));
 	
 } 
 
 //code for the float bullet to follow RUBI
 function floatMove(bullet){
 	bullet.body.velocity.x = 0;
 	bullet.body.velocity.y = 0;

    if (cursors.up.isDown){
        bullet.body.velocity.y = -(300+rubiUpgrade.speed);
    } else if (cursors.down.isDown){
         bullet.body.velocity.y = (300+rubiUpgrade.speed);
    }

    if (cursors.left.isDown){
        bullet.body.velocity.x = -(300+rubiUpgrade.speed);
    }else if (cursors.right.isDown){
         bullet.body.velocity.x = 300+rubiUpgrade.speed;
    }
 }
 
 //boolean fire - drops mines that if they collide with enemies, they'll blow up
 function booleanFire(player){
 	if (functionRUBI.game.time.now > nextFire && functionRUBI.booleanBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;

        var bullet = functionRUBI.booleanBullets.getFirstDead();		
		bullet.reset(player.x,player.y);
		bullet.rotation = player.rotation;
		bullet.anchor.setTo(.5, .5);
		bullet.body.setSize(8, 8, 0, 0);
		bullet.animations.add('mine');	
		bullet.animations.play('mine',.8);
		functionRUBI.game.time.events.add(Phaser.Timer.SECOND * 3, booleanExplosion, this);   		
    }	
 }
 
 function booleanExplosion(bullet){
 	if(functionRUBI.booleanBullets.countLiving()>0){
	var bullet = functionRUBI.booleanBullets.getFirstAlive();
		boolean2Audio.play();
		functionRUBI.emitBoolean.x = bullet.x;
		functionRUBI.emitBoolean.y = bullet.y;
		functionRUBI.emitBoolean.start(true,500,null,20);	
		bullet.kill();
	}
 	
 }
 
 
  
  
