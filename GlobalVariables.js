 //Here are the variables that can be maniulplated throughout the game
 // Contains test variables and RUBI's upgrades
 //
 
 globalVar = {
  	 playerX: 0,
  	 playerY: 0,
  	 test: 0,
  	
  };
  
  rubiUpgrade = {
  	speed: 0,
  	rateoffire: 0,
  	damage: 0,
  
  };
  
rubiHealth ={
	rubucks: 500,
	min: 500,
	levelEarn:0,
};

rubiUnlock ={
	level: 0,
	guns: 0,
};

function rubiHit(type){
	if(type == "follower") {
	rubiHealth.rubucks -=50;
	}
	
}
