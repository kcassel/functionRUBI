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
  	 speedButton = new Buttons(this,40,520, 'speed',this.speedClick,this);
  	 rateoffireButton = new Buttons(this,180,520, 'rateoffire',this.rateoffireClick,this);
  	 damageButton = new Buttons(this,380,520, 'damage',this.damageClick,this);
  	 speedButton.deactivate();
  	 rateoffireButton.deactivate();
  	 damageButton.deactivate();
  	 
  	 //upgrade costs
  	 upSpeed = 200;
  	 upFire = 400;
  	 upDamage = 600;
  	 
  	 if (rubiHealth.rubucks >upSpeed){
  	 	 speedButton.activate();
  	 }
	if (rubiHealth.rubucks >upFire){
  	 rateoffireButton.activate();
  	}
  	if (rubiHealth.rubucks >upDamage){
  	 damageButton.activate();
  	}


//level buttons
  	tutorialButton = this.game.add.button(100,100, 'level',this.tutorialClick,this,1,0,1);
  	
  	
  	//stat text
  	speedText = this.game.add.text(665, 50, rubiUpgrade.speed+'%', { font: " 32px Courier", fill: "#2EFE2E" });
  	rateoffireText = this.game.add.text(665, 130, rubiUpgrade.rateoffire+'%',{ font: " 32px Courier", fill: "#2EFE2E" });
  	damageText = this.game.add.text(665, 210, rubiUpgrade.damage+'%',{ font: " 32px Courier", fill: "#2EFE2E" }); 	
  	rubucksText = this.game.add.text(635, 535, rubiHealth.rubucks+'$',{ font: " 32px Courier", fill: "#2EFE2E" });
  	
  	
  	
  },
  
  update: function(){
  	this.filter.update(this.game.input.mousePointer);
  	speedButton.overlap();
  	rateoffireButton.overlap();
  	 damageButton.overlap();
  	

  	speedText.text = rubiUpgrade.speed+'%';
  	rateoffireText.text = rubiUpgrade.rateoffire+'%';
  	damageText.text = rubiUpgrade.damage*4+'%';
  	rubucksText.text = rubiHealth.rubucks+'$';

  },
  
  
  //BUTTON FUNCTIONS
  tutorialClick: function(){
  	this.game.state.start('Game');
  },
  
  
  // a speed upgrade costs 200 rubucks
  speedClick: function(){
  	if(rubiUpgrade.speed <=100 && rubiHealth.rubucks >upSpeed){
  	rubiUpgrade.speed += 20;
  	rubiHealth.rubucks -=200;
  	}else{
  		speedButton.deactivate();
  	}
  	
  },
  
  // rate of fire upgrade costs 400
  rateoffireClick: function(){
  	if(rubiUpgrade.rateoffire <=100 && rubiHealth.rubucks >upFire){
  	rubiUpgrade.rateoffire +=20;
  	  	rubiHealth.rubucks -=400;
  	}else{
  		rateoffireButton.deactivate();
  	}
  },
  
  //damage upgrade costs 600
  damageClick: function(){
  	if(rubiUpgrade.damage <=20 && rubiHealth.rubucks >upDamage){
  	rubiUpgrade.damage +=5;
  	  	rubiHealth.rubucks -=600;
  	}else{
  		damageButton.deactivate();
  	}
  },
  
   //debug functions
render: function(){
	 this.game.debug.text("DEBUGTEXT",500,100);
	 //this.game.debug.text("Rubi's speed "+(300+rubiUpgrade.speed),500,120);
	// this.game.debug.text("Rubi's rate of fire "+(fireRate+rubiUpgrade.rateoffire),500,140);
	// this.game.debug.text("Rubi's damage "+(10+rubiUpgrade.damage),500,160);
	 this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),500,180);
	  this.game.debug.text("Px "+this.game.input.mousePointer.x,500,200);
	   this.game.debug.text("Py "+this.game.input.mousePointer.y,500,220);
},
  
};