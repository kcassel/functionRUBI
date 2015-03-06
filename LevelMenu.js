functionRUBI.LevelMenu = function(){};

functionRUBI.LevelMenu.prototype = {
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
  	
  	this.levelbg = this.game.add.sprite(400,300,'levelMenuUI'); 
  	this.levelbg.anchor.setTo(.5,.5);
  	this.levelbg.width = 800;
  	this.levelbg.height = 600;
  	
	///upgrade buttons
  	 speedButton = new Buttons(this,40,510, 'speed',this.speedClick,this);
  	 rateoffireButton = new Buttons(this,210,510, 'rateoffire',this.rateoffireClick,this);
  	 damageButton = new Buttons(this,380,510, 'damage',this.damageClick,this);
  	 speedButton.deactivate();
  	 rateoffireButton.deactivate();
  	 damageButton.deactivate();
  	 
  	 //level buttons
  	tutorialButton = new Buttons(this,120,100, 'level0',this.tutorialClick,this);
  	level1Button = new Buttons(this,320,100, 'level1',this.level1Click,this);
  	level2Button = new Buttons(this,120,210, 'level2',this.level2Click,this);
  	level3Button = new Buttons(this,320,210, 'level3',this.level3Click,this);
  	level4Button = new Buttons(this,120,320, 'level4',this.level4Click,this);
  	level5Button = new Buttons(this,320,320, 'level5',this.level5Click,this);
  	tutorialButton.activate();
  	level1Button.deactivate();
  	level2Button.deactivate();
  	level3Button.deactivate();
  	level4Button.deactivate();
  	level5Button.deactivate();

	if (rubiUnlock.level >= 1){
		level1Button.activate();
	}
	if(rubiUnlock.level >=2){
		level2Button.activate();
	}
	if(rubiUnlock.level >=3){
		level3Button.activate();
	}
	if(rubiUnlock.level >=4){
		level4Button.activate();
	}
	if(rubiUnlock.level >=5){
		level5Button.activate();
	}
	
  	 
  	 //upgrade costs
  	 upSpeed = 200;
  	 upFire = 400;
  	 upDamage = 600;
  	 
  	if (rubiUnlock.level >= 1){
  	 	if (rubiHealth.rubucks >upSpeed){
  	 		 speedButton.activate();
  		 }
		if (rubiHealth.rubucks >upFire){
  		 rateoffireButton.activate();
  		}
  		if (rubiHealth.rubucks >upDamage){
  		 damageButton.activate();
  		}
  	}

	var textArray = [];
	textArray[0] = 'int\n\n'; 
	textArray[1] = 'string\n\n'; 
	textArray[2] = 'double\n\n'; 
	textArray[3] = 'float\n\n'; 
	textArray[4] = 'boolean\n\n';


	var wText ='';

	for(var i =0; i<=rubiUnlock.guns;i++){
		if(i<=4){
		wText +=textArray[i];
		}
	}
	
  	
  	//stat text
  	speedText = this.game.add.text(665, 50, rubiUpgrade.speed+'%', { font: " 32px Courier", fill: "#2EFE2E" });
  	rateoffireText = this.game.add.text(665, 130, rubiUpgrade.rateoffire+'%',{ font: " 32px Courier", fill: "#2EFE2E" });
  	damageText = this.game.add.text(665, 210, rubiUpgrade.damage+'%',{ font: " 32px Courier", fill: "#2EFE2E" }); 	
  	rubucksText = this.game.add.text(635, 535, rubiHealth.rubucks+'$',{ font: " 32px Courier", fill: "#2EFE2E" });
  	weaponText = this.game.add.text (635,300, wText,{ font: " 18px Courier", fill: "#2EFE2E" });
  	
  },
  
  update: function(){
  	this.filter.update(this.game.input.mousePointer);
  	speedButton.overlap();
  	rateoffireButton.overlap();
  	 damageButton.overlap();
  	tutorialButton.overlap();
  	level1Button.overlap();
  	level2Button.overlap();
  	level3Button.overlap();
  	level4Button.overlap();
  	level5Button.overlap();


  	speedText.text = rubiUpgrade.speed+'%';
  	rateoffireText.text = rubiUpgrade.rateoffire+'%';
  	damageText.text = rubiUpgrade.damage*2+'%';
  	rubucksText.text = rubiHealth.rubucks+'$'; 
  	
  	if (rubiHealth.rubucks <=upSpeed || rubiUpgrade.speed >=100){
  	 	 speedButton.deactivate();
  	 }
	if (rubiHealth.rubucks <=upFire || rubiUpgrade.rateoffire >=100){
  	 rateoffireButton.deactivate();
  	}
  	if (rubiHealth.rubucks <=upDamage || rubiUpgrade.damage >=40){
  	 damageButton.deactivate();
  	}


  },
  
  
  //BUTTON FUNCTIONS
  
  //levels
  tutorialClick: function(){
  	this.game.state.start('level0');
  },
   level1Click: function(){
  	this.game.state.start('level1');
  },
   level2Click: function(){
  	this.game.state.start('level2');
  },
   level3Click: function(){
  	this.game.state.start('level3');
  },
   level4Click: function(){
  	this.game.state.start('level4');
  },
   level5Click: function(){
  	this.game.state.start('level5');
  },
  
  
  
  
  // a speed upgrade costs 200 rubucks
  speedClick: function(){
  	if(rubiUpgrade.speed <=100 && rubiHealth.rubucks >upSpeed){
  	rubiUpgrade.speed += 20;
  	rubiHealth.rubucks -=200;
  	}
  	
  },
  
  // rate of fire upgrade costs 400
  rateoffireClick: function(){
  	if(rubiUpgrade.rateoffire <=100 && rubiHealth.rubucks >upFire){
  	rubiUpgrade.rateoffire +=20;
  	  	rubiHealth.rubucks -=400;
  	}
  },
  
  //damage upgrade costs 600
  damageClick: function(){
  	if(rubiUpgrade.damage <=40 && rubiHealth.rubucks >upDamage){
  	rubiUpgrade.damage +=10;
  	  	rubiHealth.rubucks -=600;
  	}
  },
  
   //debug functions
render: function(){
	 this.game.debug.text("",500,100);
	 //this.game.debug.text("Rubi's speed "+(300+rubiUpgrade.speed),500,120);
	// this.game.debug.text("Rubi's rate of fire "+(fireRate+rubiUpgrade.rateoffire),500,140);
	// this.game.debug.text("Rubi's damage "+(10+rubiUpgrade.damage),500,160);
	// this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),500,180);
	 this.game.debug.text("Px "+this.game.input.mousePointer.x,500,200);
	  this.game.debug.text("Py "+this.game.input.mousePointer.y,500,220);
},
  
};