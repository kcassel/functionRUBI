 //Here are the variables that can be maniulplated throughout the game
 // Contains test variables and RUBI's upgrades
 //
 
 globalVar = {
  	 playerX: 0,
  	 playerY: 0,
  	 test: 0,
  	 gunVar:0,
  	
  };
  
  rubiUpgrade = {
  	speed: 0,
  	rateoffire: 0,
  	damage: 0,
  
  };
  
rubiHealth ={
	rubucks: 500,
	min: 500,
	dead: false,
};

rubiUnlock ={
	level: 4,
	guns: 5,
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
	rubiHealth.rubucks -=50;
	
	}
	
}
