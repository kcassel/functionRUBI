functionRUBI.EndGame = function(){};

functionRUBI.EndGame.prototype = {
  create: function() {
    
     // filter from http://glslsandbox.com/e#18578.0
    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "float noise(vec2 pos) {",
            "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
        "}",

        "void main( void ) {",

            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
            "float pos = (gl_FragCoord.y / resolution.y);",
            "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
            "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

            "pos -= (distortion * distortion) * 0.1;",

            "float c = sin(pos * 400.0) * 0.4 + 0.4;",
            "c = pow(c, 0.2);",
            "c *= 0.2;",

            "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

            "c += distortion * 0.08;",
            "// noise",
            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


            "gl_FragColor = vec4( 0.0, c, 0.0, 1.0 );",
        "}"
    ];

    this.filter = new Phaser.Filter(this.game, null, fragmentSrc);
    this.filter.setResolution(800, 600);

    this.sprite = this.game.add.sprite();
   this.sprite.width = 800;
    this.sprite.height = 600;
    
    this.sprite.filters = [ this.filter ];
    
    
    this.bg = this.game.add.sprite(0,0,'endscreen'); 
    
  
    
    MenuButton = this.game.add.button(300,450, 'start',this.menuClick,this,1,0,1);
    
  
    this.textArray1 = [];
	this.textArray1[0] = 'int'; 
	this.textArray1[1] = 'string'; 
	this.textArray1[2] = 'double'; 
	this.textArray1[3] = 'float'; 
	this.textArray1[4] = 'boolean';
    
    if (rubiHealth.dead==true){
    	this.levelDeath();
    }else{
    	//LEVEL UNLOCK
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
    	
    	this.levelComplete();
    }
   
   
  },
  update: function() {
   this.filter.update(functionRUBI.game.input.mousePointer);
 
   
  },
  
  levelComplete: function(){
  	rubiHealth.rubucks += endLevel.enemyBucks + rubiHealth.min*endLevel.levelFin;
  	
  	this.text1 = this.game.add.text(400, 200, "RUBI.MISSION: SUCCESS", { font: " 32px Courier", fill: "#2EFE2E" });
  	 this.text1.anchor.set(0.5);
  this.text2 = this.game.add.text(200, 250, "RUBUCKS ENEMY BONUS: "+endLevel.enemyBucks, { font: " 20px Courier", fill: "#2EFE2E" });
  this.text3 = this.game.add.text(200, 275, "RUBUCKS LEVEL BONUS: "+rubiHealth.min*endLevel.levelFin, { font: " 20px Courier", fill: "#2EFE2E" });
  this.text4 = this.game.add.text(200, 300, "RUBUCKS TOTAL: "+rubiHealth.rubucks, { font: " 20px Courier", fill: "#2EFE2E" });
   this.text5 = this.game.add.text(200, 325, endLevel.unlockLevel, { font: " 20px Courier", fill: "#2EFE2E" });
  this.text6 = this.game.add.text(200, 350,  endLevel.unlockGun, { font: " 20px Courier", fill: "#2EFE2E" });
  
  this.text7 = this.game.add.text(200, 375, "RUBI.RESPONSE: SUCCESS!", { font: " 20px Courier", fill: "#2EFE2E" });
  this.text8 = this.game.add.text(200, 400, "RUBI.UPGRADE(RESET) = COMPLETE", { font: " 20px Courier", fill: "#2EFE2E" });
  
   
  	
  },
  
   levelDeath: function(){
   	
   	    rubiHealth.rubucks = endLevel.enemyBucks + rubiHealth.min;
  	   	    
   	this.text1 = this.game.add.text(400, 200, "RUBI.MISSION: FAILURE", { font: " 32px Courier", fill: "#2EFE2E" });
   	this.text2 = this.game.add.text(200, 250, "CRITICAL ERROR: DAMAGE OVERFLOW", { font: " 20px Courier", fill: "#2EFE2E" });
   this.text3 = this.game.add.text(200, 275, "RUBI.REBOOT = TRUE ", { font: " 20px Courier", fill: "#2EFE2E" });
    this.text4 = this.game.add.text(200, 300, "RUBUCKS RESET: 500", { font: " 20px Courier", fill: "#2EFE2E" });
    this.text5 = this.game.add.text(200, 325, "RUBUCKS ENEMY BONUS: "+endLevel.enemyBucks, { font: " 20px Courier", fill: "#2EFE2E" });
     this.text6 = this.game.add.text(200, 350, "RUBUCKS TOTAL: "+rubiHealth.rubucks, { font: " 20px Courier", fill: "#2EFE2E" });
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
  
		
	},
  
  //BUTTON FUNCTIONS
  menuClick: function(){
  	this.reset();
  	this.game.state.start('LevelMenu');
  },
  
  render: function(){
	this.game.debug.text("DEBUGTEXT",100,100);
	 
	// this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),100,200);
	
	},
  
};