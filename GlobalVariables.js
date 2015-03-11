 //Here are the variables that can be maniulplated throughout the game
 // Contains test variables and RUBI's upgrades
 //
 
 globalVar = {
  	 playerX: 0,
  	 playerY: 0,
  	 test: 0,
  	 gunVar: 0,
  	 swap: 0,
  	 audio: .5,
  	 soundfx: .7,
  	
  };
  
  rubiUpgrade = {
  	speed: 0,
  	rateoffire: 0,
  	damage: 0,
  
  };
  
rubiHealth ={
	rubucks: 10000,
	min: 500,
	dead: false,
};

rubiUnlock ={
	level: 5,
	guns: 4,
};

endLevel = {
	enemyBucks:0,
	levelFin:0,	
	levelGun: 0,
	unlockGun: '',
	unlockLevel: '',
};

checkLevel ={
	level0: false,
	level1: false,
	level2: false,
	level3: false,
	level4: false,
	level5: false, 
};


function rubiHit(type){
	if(type == "follower") {
		if(functionRUBI.floatBullets.countLiving()>0){
  		var floatBullet = functionRUBI.floatBullets.getFirstAlive();
  		floatBullet.kill();
  	} else{
  	enemyHurtAudio.play();
  	rubiHealth.rubucks -=50;
  	}
	}
	
}
