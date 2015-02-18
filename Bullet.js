//This is RUBI's bullet control class
//For now, use the spacebar to switch between bullets

var fireRate = 200;
var nextFire =0;

//game variables
//var gunArray = [];
//gunArray[0] = 0; //int
//gunArray[1] = 1; //double

var gunVar =0;


//the array for which the different rates of fire are stored
var rateArray = [];
rateArray[0] = 200; //int
rateArray[1] = 450; //double
rateArray[2] = 800; //string

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
functionRUBI.stringBullets.createMultiple(5, 'stringBullet');
functionRUBI.emitBullets = functionRUBI.game.add.emitter(0,0,30);
functionRUBI.emitBullets.makeParticles('stringBullet');

}

//Controls which bullets to be fire
function bulletSwitch(){
	if (gunVar==0){
    		gunVar=1;
    	}else if (gunVar==1){
    		gunVar=2;
    	}else if (gunVar ==2){
    		gunVar=0;    		
    }
}

//adjusts the rates of fire depending on switch bullets are being fired
function adjustRate(index){
	fireRate = rateArray[index];
}


//intFire - shoots in a straight line towards pointer
function intFire(player) {

    if (functionRUBI.game.time.now > nextFire && functionRUBI.intBullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;

        var bullet = functionRUBI.intBullets.getFirstDead();		
		bullet.reset(player.x,player.y);
		bullet.rotation = player.rotation;
		bullet.anchor.setTo(0, 2);
        functionRUBI.game.physics.arcade.moveToPointer(bullet, 1000);
    }
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
		bullet1.anchor.setTo(0, 2);
		bullet2.anchor.setTo(0, 2);
		
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
		bullet.anchor.setTo(0, 2);
		functionRUBI.game.time.events.add(Phaser.Timer.SECOND * 2, stringExplosion, this); 
        functionRUBI.game.physics.arcade.moveToPointer(bullet, 100);
  		
    }
	
}

//code for the explosion of stringFire
function stringExplosion(){
	var bullet = functionRUBI.stringBullets.getFirstAlive();	
		functionRUBI.emitBullets.x = bullet.x;
		functionRUBI.emitBullets.y = bullet.y;
		functionRUBI.emitBullets.start(true,1000,null,10);	
		bullet.kill();
}
