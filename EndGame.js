functionRUBI.EndGame = function(){};

functionRUBI.EndGame.prototype = {
  create: function() {
    menuFilter();
    
    this.bg = this.game.add.sprite(0,0,'endscreen'); 
    
  

      	MenuButton = new Buttons(this,300,525, 'menubutton',this.menuClick,this);
      	MenuButton.activate();
    
  
    this.textArray1 = [];
	this.textArray1[0] = 'int'; 
	this.textArray1[1] = 'string'; 
	this.textArray1[2] = 'double'; 
	this.textArray1[3] = 'float'; 
	this.textArray1[4] = 'boolean';
    
    if (rubiHealth.dead==true){
    	this.levelDeath();
    }else{
    	endLevel.unlockLevel = 'RUBI.UNLOCK(level): NULL';
    	endLevel.unlockGun = 'RUBI.UNLOCK(datatype): NULL';
    	if(checkLevel.level0 ==true){
    		rubiUnlock.level =1;
    		rubiUnlock.guns = 1;
    		if(checkLevel.level1==false && endLevel.levelFin ==0){
    			endLevel.unlockLevel = 'RUBI.UNLOCK(level): 1';
    			endLevel.unlockGun = 'RUBI.UNLOCK(datatype): NULL';
    		}
    	}
    	if(checkLevel.level1 ==true){
    		rubiUnlock.level =2;
    		rubiUnlock.guns = 2;
    		if(checkLevel.level2==false && endLevel.levelFin ==1){
    			endLevel.unlockLevel = 'RUBI.UNLOCK(level): 2';
    			endLevel.unlockGun = 'RUBI.UNLOCK(datatype): double';
    		}
    	}
    	if(checkLevel.level2 ==true){
    		rubiUnlock.level =3;
    		rubiUnlock.guns = 3;
    		if(checkLevel.level3==false && endLevel.levelFin ==2){
    			endLevel.unlockLevel = 'RUBI.UNLOCK(level): 3';
    			endLevel.unlockGun = 'RUBI.UNLOCK(datatype): float';
    		}
    	}
    	if(checkLevel.level3 ==true){
    		rubiUnlock.level =4;
    		rubiUnlock.guns = 4;
    		if(checkLevel.level4==false && endLevel.levelFin ==3){
    			endLevel.unlockLevel = 'RUBI.UNLOCK(level): 4';
    			endLevel.unlockGun = 'RUBI.UNLOCK(datatype): boolean';
    		}
    	}
    	if(checkLevel.level4 ==true) {
    		rubiUnlock.level =5;
    		rubiUnlock.guns = 4;
    		if(checkLevel.level5==false && endLevel.levelFin ==4){
    			endLevel.unlockLevel = 'RUBI.UNLOCK(level): 5';
    			endLevel.unlockGun = 'RUBI.UNLOCK(datatype): NONE';
    		}
    	}
    	if(checkLevel.level5 ==true){	
    			endLevel.unlockLevel = 'RUBI.UNLOCK(level): COMPLETE';
    			endLevel.unlockGun = 'RUBI.UNLOCK(datatype): COMPLETE';
    	}
    	
    	//LEVEL UNLOCK
    	/*
    	if(rubiUnlock.level == endLevel.levelFin){
    		if (rubiUnlock.level < 5){
    		rubiUnlock.level++;
    		console.log("HERE!");
    		//if (rubiUnlock.level < 5){
    		 endLevel.unlockLevel= 'RUBI.UNLOCK(level): level '+rubiUnlock.level;
    		} else{
    		endLevel.unlockLevel= 'RUBI.UNLOCK(level): COMPLETE';
    		}
   		}else{
    	endLevel.unlockLevel= 'RUBI.UNLOCK(level): NONE';
    	}
    	
    	//GUN UNLOCK
    	if(rubiUnlock.guns == endLevel.levelGun){
    		if (rubiUnlock.guns < 4){
    			rubiUnlock.guns++;
    			if (rubiUnlock.guns < 4){
    			 endLevel.unlockGun= 'RUBI.UNLOCK(datatype): '+this.textArray1[rubiUnlock.guns];
    			}else{
    		endLevel.unlockGun= 'RUBI.UNLOCK(datatype): COMPLETE';
    		}
    		} else{
    		endLevel.unlockGun= 'RUBI.UNLOCK(datatype): COMPLETE';
    		}
   		}else{
   
    	endLevel.unlockGun= 'RUBI.UNLOCK(datatype): NONE ';
    	}
    	*/
    	this.levelComplete();
    }
   
   
  },
  update: function() {
     filterUpdate();
     MenuButton.overlap();
 
   
  },
  
  levelComplete: function(){
  	if(rubiUnlock.level>0){
		var levelup =1;  		
  	}else{
  		var levelup =0;
  	}
  	
  	rubiHealth.rubucks += endLevel.enemyBucks + rubiHealth.min*levelup;
  	
  	this.text1 = this.game.add.text(400, 200, "RUBI.MISSION: SUCCESS", { font: " 32px Courier", fill: "#2EFE2E" });
  	 this.text1.anchor.set(0.5);
  this.text2 = this.game.add.text(200, 250, "RUBUCKS ENEMY BONUS: "+endLevel.enemyBucks, { font: " 20px Courier", fill: "#2EFE2E" });
  this.text3 = this.game.add.text(200, 275, "RUBUCKS LEVEL BONUS: "+rubiHealth.min*levelup, { font: " 20px Courier", fill: "#2EFE2E" });
  this.text4 = this.game.add.text(200, 325, "RUBUCKS TOTAL: "+rubiHealth.rubucks, { font: " 20px Courier", fill: "#FFFFFF" });
   this.text5 = this.game.add.text(200, 350, endLevel.unlockLevel, { font: " 20px Courier", fill: "#FFFFFF" });
  this.text6 = this.game.add.text(200, 375,  endLevel.unlockGun, { font: " 20px Courier", fill: "#FFFFFF" });
  
  this.text7 = this.game.add.text(200, 425, "RUBI.RESPONSE: SUCCESS!", { font: " 20px Courier", fill: "#2EFE2E" });
  this.text8 = this.game.add.text(200, 450, "RUBI.UPGRADE(RESET) = COMPLETE", { font: " 20px Courier", fill: "#2EFE2E" });
  
   
  	
  },
  
   levelDeath: function(){
   	
   	    rubiHealth.rubucks = endLevel.enemyBucks + rubiHealth.min;
  	   	    
   	this.text1 = this.game.add.text(400, 200, "RUBI.MISSION: FAILURE", { font: " 32px Courier", fill: "#2EFE2E" });
   	this.text2 = this.game.add.text(200, 250, "CRITICAL ERROR: DAMAGE OVERFLOW", { font: " 20px Courier", fill: "#2EFE2E" });
   this.text3 = this.game.add.text(200, 275, "RUBI.REBOOT = TRUE ", { font: " 20px Courier", fill: "#2EFE2E" });
    this.text4 = this.game.add.text(200, 300, "RUBUCKS RESET: 500", { font: " 20px Courier", fill: "#2EFE2E" });
    this.text5 = this.game.add.text(200, 325, "RUBUCKS ENEMY BONUS: "+endLevel.enemyBucks, { font: " 20px Courier", fill: "#2EFE2E" });
     this.text6 = this.game.add.text(200, 350, "RUBUCKS TOTAL: "+rubiHealth.rubucks, { font: " 20px Courier", fill: "#FFFFFF" });
   this.text7 = this.game.add.text(200, 375, "RUBI.RESPONSE: READY TO GO, SIR!", { font: " 20px Courier", fill: "#2EFE2E" });
    this.text1.anchor.set(0.5);

    
  },

	reset: function(){
		rubiHealth.dead = false;
		endLevel.enemyBucks = 0;
		endLevel.levelFin = 0;
  		endLevel.levelGun = 0;
  		 endLevel.unlockGun = '';
  		endLevel.unlockLevel = '';
		rubiUpgrade.speed = 0;
		rubiUpgrade.rateoffire = 0;
  		rubiUpgrade.damage =  0;
  		 globalVar.gunVar =0;
  
		
	},
  
  //BUTTON FUNCTIONS
  menuClick: function(){
  	this.reset();
  	downAudio.play();
  	this.game.state.start('LevelMenu');
  },
  
  render: function(){
	this.game.debug.text("",100,100);
	 
	// this.game.debug.text(rubiUnlock.level ,100,200);
	// this.game.debug.text(rubiUnlock.guns,100,220);
	
	},
  
};